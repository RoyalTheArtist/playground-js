import { ECS } from "./ecs"
import { Stage } from "./graphics/graphics"
import Surface from "./graphics/surface"






class Engine {
  private prevTimeStamp: number = 0
  public stage: Stage 
  constructor(public ecs: ECS, stage: Stage) {
    this.stage = stage
  }

  update(timeStamp: number) {
    const delta = (timeStamp - this.prevTimeStamp) / 1000
    const max_delta = Math.min(delta, 0.1)
    this.prevTimeStamp = timeStamp

    this.ecs.update(max_delta)

    // debug

  }

  draw(ctx: CanvasRenderingContext2D) {
    this.stage.render(ctx)
  }
}

export {
  Engine
}