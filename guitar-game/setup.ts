import { Aspect, Component, ECS, Entity, System } from "./ecs"
import { Engine } from "./engine"
import { Player, PlayerInput } from "./input"
import Surface from "./graphics/surface"
import { Position, Physics, Velocity } from "./systems"
import { Sprite, SpriteRenderer,  } from "./systems/appearance"
import { GraphicObject, RectangleGraphic, Stage } from "./graphics/graphics"
import { Collision, CollisionDetector, PlayerCollisions } from "./systems/collisions"
import { Rose } from "./components"

export const GAME_SETTINGS = {
    width: 180,
    height: 350
  }
  

class Spawner extends Component {
    timer: number = 0
    constructor(public spawnTime: number,public spawnFn: Function) { super() }

    spawn(x: number, y: number, ecs: ECS) {
        this.spawnFn(x, y, ecs)
        this.timer = 0
    }

    tick(delta: number) {
        this.timer += delta * 1000
    }
}

class SpawnSystem extends System {
    timer = 0
    public componentsRequired = new Set<Function>([Spawner, Position]);
    
    update(entities: Map<Entity, Aspect>, delta: number): void {
        entities.forEach((_, entity) => {
            const spawner = this.ecs.getComponents(entity).get(Spawner)
            const position = this.ecs.getComponents(entity).get(Position)
            spawner.tick(delta)
            if (spawner.timer > spawner.spawnTime) {
                spawner.spawn(position.x, position.y, this.ecs)
            }
        })
    }
        
}

export class EventQueue {
    events: Map<string, Function[]>
    onceQueue: Map<string, Function[]>
    constructor() {
        this.events = new Map()
        this.onceQueue = new Map()
    }

    on(event: string, callback: Function) {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }

        this.events.get(event)?.push(callback)
    }

    public once(event: string, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }

        this.events.get(event)?.push(callback)
    }

    public emit(event: string, ...args) {
        if(this.onceQueue.has(event)) {
            this.onceQueue.get(event)?.forEach(callback => {
                callback(...args)
            })
            this.onceQueue.delete(event)
        }

        if (this.events.has(event)) {
            this.events.get(event)?.forEach(callback => {
                callback(...args)
            })
        }
    }
}



export function setup(el: string) {
    new Surface(GAME_SETTINGS.width, GAME_SETTINGS.height)

    const events = new EventQueue()
   
    const stage = new Stage(GAME_SETTINGS.width, GAME_SETTINGS.height)
    const ecs = new ECS()
  
    const background = ecs.addEntity()
    ecs.addComponent(background, new Position(0, 0))
    ecs.addComponent(background, new Sprite("guitar-game/assets/background-night.png", true))
  
  
    const entity = ecs.addEntity()
    ecs.addComponent(entity, new Position(90, 275))
    ecs.addComponent(entity, new Player())
    ecs.addComponent(entity, new Sprite("guitar-game/assets/guitarist.png"))
    ecs.addComponent(entity, new Collision(40, 80))
    
    const roseSpawn = ecs.addEntity()
    ecs.addComponent(roseSpawn, new Spawner(8000, (x, y, ecs: ECS) => {
        console.debug("Rose spawned")
        const rose = ecs.addEntity()
        ecs.addComponent(rose, new  Rose())
        ecs.addComponent(rose, new Position(x, y))
        ecs.addComponent(rose, new Sprite("guitar-game/assets/rose.png"))
        ecs.addComponent(rose, new Velocity(0, 1, 50))
        ecs.addComponent(rose, new Collision(32, 32))
    }))
    ecs.addComponent(roseSpawn, new Position(100, 115))
  

    ecs.addSystem(new PlayerInput())
    ecs.addSystem(new SpawnSystem())
    ecs.addSystem(new Physics())
    ecs.addSystem(new CollisionDetector())
    ecs.addSystem(new PlayerCollisions(events))
    


    ecs.addSystem(new SpriteRenderer(stage))
    //ecs.addSystem(new DrawCollisions(stage))
    //ecs.addSystem(new DrawPosition(stage))

  

    
    const engine = new Engine(ecs, stage, events)
  
    const canvas = document.getElementById(el) as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  
    canvas.width = 360
    canvas.height = 760
    ctx.imageSmoothingEnabled = false
  
    return {
      engine,
      viewport: {
        canvas,
        ctx
      }
    }
  }