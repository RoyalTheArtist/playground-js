"use strict";

class Surface {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  x: number = 0
  y: number = 0

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.canvas.width = width
    this.canvas.height = height
  }

  draw(ctx: CanvasRenderingContext2D) {
    
    ctx.drawImage(this.canvas, this.x, this.y)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

class GameObject {
  x: number
  y: number
  velocity: [number, number] = [0,0]
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  update(_delta: number): void {}
  draw(_ctx: CanvasRenderingContext2D): void {}
}

class Square extends GameObject {
  movementSpeed: number = 5
  constructor(
    public x: number, 
    public y: number, 
    public width: number, 
    public height: number,
    velocity?: [number, number]) {
      super(x, y)
      if (velocity) this.velocity = velocity
    }

    update(delta: number) {
      const [vel_x, vel_y] = this.velocity 
      this.x += vel_x * delta * this.movementSpeed
      this.y += vel_y * delta * this.movementSpeed
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.strokeStyle = "blue"
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

}

class Engine {
  x: number = 0
  y: number = 0
  gameObjects: GameObject[]
  constructor(public surface: Surface) {
    this.gameObjects = [
      new Square(0,0,25,25, [1, 0])
    ]
  }

  update(delta: number) {
    this.gameObjects.forEach((obj) => obj.update(delta))
  }

  draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0,0, this.surface.canvas.width, this.surface.canvas.height)

      //this.surface.ctx.strokeRect(this.x, this.y, 25, 25)
      
      this.surface.clear()
      this.gameObjects.forEach((obj) => obj.draw(this.surface.ctx))
      this.surface.draw(ctx)
  }
}

function setup(el: string) {
  const surface = new Surface(360, 760)
  const engine = new Engine(surface)

  const canvas = document.getElementById(el) as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = 360
  canvas.height = 760

  return {
    engine,
    canvas,
    ctx
  }
}


const oldTimeStamp = 0

function main() {
  const { engine, ctx } = setup('game')


  function gameLoop(timeStamp: number) {
    const delta = (timeStamp - oldTimeStamp) / 1000
    engine.update(delta)
    engine.draw(ctx)
  
    requestAnimationFrame(gameLoop)
  }

  requestAnimationFrame(gameLoop)
}

main()