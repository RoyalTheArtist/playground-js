"use strict";
import Surface from "./graphics/surface"
import { setup } from "./setup";
import { Position } from "./systems";

async function loadSprite(path: string) {
  const sprite = new Image()
  sprite.src = path
  const promise = new Promise<HTMLImageElement>((resolve) => {
    sprite.onload = () => resolve(sprite)
  })

  return promise
}


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


async function main() {
  const { engine, viewport } = setup('game')

  const debug = new FPS_DEBUG()
  const background = await loadSprite("guitar-game/assets/background-night.png")


  function gameLoop(timeStamp: number) {
    viewport.ctx.clearRect(0, 0, viewport.canvas.width, viewport.canvas.height)

    Surface.clear()
    engine.update(timeStamp)
    debug.update(timeStamp)
    engine.draw(Surface.ctx)
    Surface.draw(viewport.ctx)
    debug.draw(viewport.ctx)
    requestAnimationFrame(gameLoop)
  }

  requestAnimationFrame(gameLoop)
}

main()

