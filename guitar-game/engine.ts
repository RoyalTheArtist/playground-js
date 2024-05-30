import { ECS } from "./ecs"
import Surface from "./surface"

class Engine {
  constructor(public ecs: ECS) {
   
  }

  update(delta: number) {
    this.ecs.update(delta)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0,0, Surface.canvas.width, Surface.canvas.height)

    //this.surface.ctx.strokeRect(this.x, this.y, 25, 25)
    
    Surface.draw(ctx)
    Surface.clear()
  }
}

export {
  Engine
}