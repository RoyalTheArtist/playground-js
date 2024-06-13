import { ECS } from "./ecs"
import { Stage } from "./graphics/graphics"
import { EventQueue } from "./setup"

class PlayerStats {
  score = 0
  lives = 3
  updateScore(amount: number) {
      this.score += amount
  }
}

class Engine {
  private prevTimeStamp: number = 0
  public stage: Stage 
  public events: EventQueue
  public playerStats: PlayerStats
  constructor(public ecs: ECS, stage: Stage, events: EventQueue) {
    this.stage = stage
    this.events = events
    this.playerStats = new PlayerStats()
    this.setup()
  }

  setup() {
    this.events.on("collectRose", (args) => {
      this.playerStats.updateScore(1)
  })
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