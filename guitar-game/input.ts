import { System, Entity, Aspect, Component } from "./ecs"
import { Velocity } from "./systems"



export class Player extends Component { }

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

    if (Input.isActionPressed("MoveLeft")) {
      velocity = {...velocity, x: -1}
    }
    if (Input.isActionPressed("MoveRight")) {
      velocity = {...velocity, x: 1}
    }
    entities.forEach((_, entity) => {
      this.ecs.addComponent(entity, new Velocity(velocity.x, velocity.y, 200))
    })
  }

  constructor() {
    super()
    new Input()
  }
}

export {
  PlayerInput
}