import { ECS } from "./ecs"
import { Engine } from "./engine"
import { Player, PlayerInput } from "./input"
import Surface from "./graphics/surface"
import { Position, Physics } from "./systems"
import { Sprite, Appearance, AppearanceRenderer } from "./systems/appearance"

export const GAME_SETTINGS = {
    width: 180,
    height: 350
  }
  
export function setup(el: string) {
    new Surface(GAME_SETTINGS.width, GAME_SETTINGS.height)
  
    const ecs = new ECS()
  
    const background = ecs.addEntity()
    ecs.addComponent(background, new Position(0, 0))
    ecs.addComponent(background, new Sprite("~/guitar-game/assets/background-night.png"))
  
  
    const entity = ecs.addEntity()
    ecs.addComponent(entity, new Position(50, 50,))
    ecs.addComponent(entity, new Player())
    ecs.addComponent(entity, new Appearance("green", 60, 80))
    
    const entityTwo = ecs.addEntity()
    ecs.addComponent(entityTwo, new Position(100, 100))
    ecs.addComponent(entityTwo, new Appearance("red", 25, 25))
  
    ecs.addSystem(new PlayerInput())
    ecs.addSystem(new Physics())
    //ecs.addSystem(new DrawPositions())
    ecs.addSystem(new AppearanceRenderer())
    const engine = new Engine(ecs)
  
    const canvas = document.getElementById(el) as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  
    canvas.width = 360
    canvas.height = 760
    ctx.imageSmoothingEnabled = false
  
    return {
      engine,
      window: {
        canvas,
        ctx
      }
    }
  }