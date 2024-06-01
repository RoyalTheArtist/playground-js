import { ECS } from "./ecs"
import { Engine } from "./engine"
import { Player, PlayerInput } from "./input"
import Surface from "./graphics/surface"
import { Position, Physics } from "./systems"
import { Sprite, SpriteRenderer,  } from "./systems/appearance"
import { Stage } from "./graphics/graphics"

export const GAME_SETTINGS = {
    width: 180,
    height: 350
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
    
  
    ecs.addSystem(new PlayerInput())
    ecs.addSystem(new Physics())


    ecs.addSystem(new SpriteRenderer(stage))
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