import { Aspect, Component, ECS, Entity, System } from "./ecs"
import { Engine } from "./engine"
import { Player, PlayerInput } from "./input"
import Surface from "./graphics/surface"
import { Position, Physics, Velocity } from "./systems"
import { Sprite, SpriteRenderer,  } from "./systems/appearance"
import { GraphicObject, RectangleGraphic, Stage } from "./graphics/graphics"

export const GAME_SETTINGS = {
    width: 180,
    height: 350
  }
  
class IsRose extends Component {
    
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

class Collision extends Component {
    width: number
    height: number
    constructor(width: number, height: number) {
        super()
        this.width = width
        this.height = height
    }
}

class CollisionsAspect extends Aspect {
    public graphic: RectangleGraphic
    constructor() {
        super()
    }
}

class DrawCollisions extends System {
    public componentsRequired = new Set<Function>([Position, Collision]);
    constructor(public stage: Stage) { super() }

    public makeAspect(): Aspect {
        return new CollisionsAspect()
    }
    public onAdd(aspect: CollisionsAspect): void {
        const position = aspect.get(Position)
        const collision = aspect.get(Collision)
        const sprite = new RectangleGraphic(collision.width, collision.height, 'red', position.p.x, position.p.y)
        aspect.graphic = sprite
        this.stage.add(sprite)
    }
    update(entities: Map<Entity, CollisionsAspect>): void {
        entities.forEach((aspect, entity) => {
            const position = this.ecs.getComponents(entity).get(Position)
            
            aspect.graphic.x = position.p.x
            aspect.graphic.y = position.p.y
        })
    }
}

class CollisionDetector extends System {
    public componentsRequired = new Set<Function>([Position, Collision]);
    update(entities: Map<Entity, Aspect>): void {
        for (const entity of entities.keys()) {
            const pos1 = this.ecs.getComponents(entity).get(Position)
            const col1 = this.ecs.getComponents(entity).get(Collision)

            for (const entity2 of entities.keys()) {
                if (entity === entity2) {
                    continue
                }
                const pos2 = this.ecs.getComponents(entity2).get(Position)
                const col2 = this.ecs.getComponents(entity2).get(Collision)

                if (
                    pos1.p.x + col1.width > pos2.p.x &&
                    pos1.p.x < pos2.p.x + col2.width &&
                    pos1.p.y + col1.height > pos2.p.y &&
                    pos1.p.y < pos2.p.y + col2.height
                ) {
                    //console.log(`Collision detected between ${entity} and ${entity2}`)
                }
            }
        }
    }
}


export function setup(el: string) {
    new Surface(GAME_SETTINGS.width, GAME_SETTINGS.height)
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
    


    ecs.addSystem(new SpriteRenderer(stage))
    //ecs.addSystem(new DrawCollisions(stage))
    //ecs.addSystem(new DrawPosition(stage))

    
    const engine = new Engine(ecs, stage)
  
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