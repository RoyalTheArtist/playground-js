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

class Graphic {
  anchor: Position
}

class Layer {
  constructor() {}
}

async function main() {
  const { engine, window } = setup('game')

  const background = await loadSprite("guitar-game/assets/background-night.png")


  function gameLoop(timeStamp: number) {
    window.ctx.clearRect(0, 0, Surface.canvas.width, Surface.canvas.height)
    Surface.clear()
    Surface.ctx.drawImage(background, 0, 0)
    engine.update(timeStamp)
    engine.draw(window.ctx)

    requestAnimationFrame(gameLoop)
  }

  requestAnimationFrame(gameLoop)
}

main()

