"use strict";
import { ECS, Entity, Component, System, Aspect } from "./ecs"
import { Engine } from './engine'
import Surface from "./surface"
import { Physics, Position, Velocity, DrawPositions } from "./systems"

type KeyStates = "down" | "up"

enum ActionStates {
  Released = 0,
  Pressed,
  Held
}

class Keyboard {
  static keyState: Map<string, KeyStates> = new Map()
  constructor() {
      window.addEventListener("keydown", Keyboard.keyDown)
      window.addEventListener("keyup", Keyboard.keyUp)
  }

  static setup() {
    this.keyState.set("ArrowLeft", "up")
    this.keyState.set("ArrowRight", "up")
    this.keyState.set("ArrowUp", "up")
    this.keyState.set("ArrowDown", "up")
  }

  private static keySupported(key: string) {
    return this.keyState.has(key)
  }

  private static keyDown(event: KeyboardEvent) {
    if (Keyboard.keySupported(event.key)) {
      Keyboard.keyState.set(event.key, "down")
    }
  }

  private static keyUp(event: KeyboardEvent) {
    if (Keyboard.keySupported(event.key)) {
      Keyboard.keyState.set(event.key, "up")
    }
  }
}

const KeyboardMap = {
  MoveLeft: "ArrowLeft",
  MoveRight: "ArrowRight",
  MoveUp: "ArrowUp",
  MoveDown: "ArrowDown"
}

class KeyboardTransformer {
  static transform(keyboardState: Map<string, KeyStates>, playerKeyMappings: Record<string, string>): Map<string, ActionStates> {
    const actions = new Map<string, ActionStates>()
    Object.keys(playerKeyMappings).forEach((key) => {
      const inputKey = playerKeyMappings[key]

      if (keyboardState.has(inputKey)) {
        const keyState = keyboardState.get(inputKey)
        if (keyState === "down") {
          actions.set(key, ActionStates.Pressed)
        } else if (keyState === "up") {
          actions.set(key, ActionStates.Released)
        }
      }
    })
    return actions
  }
}

class Input {
  inputStates: Map<string, string> = new Map()
  constructor() {
    new Keyboard()
    Keyboard.setup()
  }

  static isActionPressed(action: string): boolean {
    const actions = KeyboardTransformer.transform(Keyboard.keyState, KeyboardMap)
    return actions.get(action) === ActionStates.Pressed
  }
}


class PlayerInput extends System {
  public componentsRequired = new Set<Function>([Player])

  update(entities: Map<Entity, Aspect>): void {
    let velocity = {x: 0, y: 0}
    if (Input.isActionPressed("MoveUp")) {
      velocity = {...velocity, y: -1}
    }
    if (Input.isActionPressed("MoveDown")) {
      velocity = {...velocity, y: 1}
    }
    if (Input.isActionPressed("MoveLeft")) {
      velocity = {...velocity, x: -1}
    }
    if (Input.isActionPressed("MoveRight")) {
      velocity = {...velocity, x: 1}
    }
    entities.forEach((_, entity) => {
      this.ecs.addComponent(entity, new Velocity(velocity.x, velocity.y))
    })
  }

  constructor() {
    super()
    new Input()
  }
}

class Player extends Component { }

function setup(el: string) {
  new Surface(360, 760)

  const ecs = new ECS()
  const entity = ecs.addEntity()
  ecs.addComponent(entity, new Position(50, 50))
  ecs.addComponent(entity, new Player())
  ecs.addSystem(new PlayerInput())
  ecs.addSystem(new Physics())
  ecs.addSystem(new DrawPositions())
  const engine = new Engine(ecs)

  const canvas = document.getElementById(el) as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = 360
  canvas.height = 760

  return {
    engine,
    canvas,
    ctx
  }
}


const oldTimeStamp = 0

function main() {
  const { engine, ctx } = setup('game')

  function gameLoop(timeStamp: number) {
    const delta = (timeStamp - oldTimeStamp) / 1000
    engine.update(delta)
    engine.draw(ctx)
  
    requestAnimationFrame(gameLoop)
  }

  requestAnimationFrame(gameLoop)
}

main()

