import { ECS } from "./ecs"
import Surface from "./graphics/surface"

class FPS_DEBUG {
  tickTime = 0
  fps = 0

  constructor() { }

  update(delta: number) {
    this.tickTime += delta * 1000

    if (this.tickTime > 1000) {
      this.tickTime = 0 
      this.fps = Math.round(1 / delta)
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = '12px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText(`FPS: ${this.fps}`, 10, 12)
  }
}

class Engine {
  debug: FPS_DEBUG = new FPS_DEBUG()
  private prevTimeStamp: number = 0

  constructor(public ecs: ECS) {
   
  }

  update(timeStamp: number) {
    const delta = (timeStamp - this.prevTimeStamp) / 1000
    const max_delta = Math.min(delta, 0.1)
    this.prevTimeStamp = timeStamp

    this.ecs.update(max_delta)

    // debug
    this.debug.update(delta)
  }

  draw(ctx: CanvasRenderingContext2D) {
    //this.surface.ctx.strokeRect(this.x, this.y, 25, 25)
    
    //Surface.ctx.drawImage(background, 0, 0)
    Surface.draw(ctx)
    this.debug.draw(ctx)
  }
}

export {
  Engine
}