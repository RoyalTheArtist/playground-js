import { ECS } from "./ecs"
import { Stage } from "./graphics/graphics"

class Engine {
  private prevTimeStamp: number = 0
  public stage: Stage 
  constructor(public ecs: ECS, stage: Stage) {
    this.stage = stage
  }

  update(delta: number) {

    this.ecs.update(delta)

  }

  draw(ctx: CanvasRenderingContext2D) {
    this.stage.render(ctx)
  }
}

export {
  Engine
}