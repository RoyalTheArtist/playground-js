"use strict";

class GameObject {
  isColliding: boolean = false
  constructor(public context: CanvasRenderingContext2D, public x: number, public y: number, public vx: number, public vy: number) {

  }
}

class Square extends GameObject {
  width: number = 50
  height: number = 50
  color: string = "blue"
  constructor(public context: CanvasRenderingContext2D, public x: number, public y: number, public vx: number, public vy: number) {
    super(context, x, y, vx, vy)

  }

  draw() {
    this.context.fillStyle = this.color
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }

  update(delta: number) {
    this.x += this.vx * delta
    this.y += this.vy * delta

    if (this.isColliding) {
      this.color = "red"
    } else {
      this.color = "blue"
    }
  }


}

function setup(el: string) {
  const canvas = document.getElementById(el) as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = 640
  canvas.height = 480

  return {
    canvas,
    ctx
  }
}

// Example easing functions
function easeInOutQuint (t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function easeLinear (t, b, c, d) {
  return c * t / d + b;
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  // Check x and y for overlap
  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
      return false;
  }
  return true;
}

class Engine {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  oldTimeStamp: number = 0
  rectangle: any
  timepassed: number = 0
  gameObjects: Square[]
  constructor() {
    const { canvas, ctx } = setup('game')

    this.gameObjects = [
      new Square(ctx, 0, 0, 50, 0),
      new Square(ctx, 50, 50, 25, 25),
      new Square(ctx, 100, 100, 0, -25)
    ]

    this.canvas = canvas
    this.ctx = ctx

    this.rectangle = {
      x: 0,
      y: 0,
      w: 50,
      h: 50
    }
  }

  drawFPS(timeStamp: number) {
    const delta = (timeStamp - this.oldTimeStamp) / 1000

    this.oldTimeStamp = timeStamp

    const fps = Math.round(1 / delta)
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, 200, 100)
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText("FPS: " + fps, 10, 50)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    this.gameObjects.forEach((obj) => obj.draw())
  }

  update(delta: number) {
    this.gameObjects.forEach((obj) => obj.update(delta))
    this.detectCollisions()
  }

  detectCollisions() {

    // reset collisions
    this.gameObjects.forEach((obj) => {
      obj.isColliding = false
    })

    for (let i = 0; i < this.gameObjects.length; i++) {
      for (let j = i + 1; j < this.gameObjects.length; j++) {
        const obj1 = this.gameObjects[i]
        const obj2 = this.gameObjects[j]

        if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
          obj1.isColliding = true
          obj2.isColliding = true
        }
      }
    }
  }
}

const engine = new Engine()

function gameLoop(timeStamp: number) {
  let delta = (timeStamp - engine.oldTimeStamp) / 1000

  delta = Math.min(delta, 0.1)
  engine.oldTimeStamp = timeStamp

  engine.update(delta)
  engine.draw()
  requestAnimationFrame(gameLoop)
}

function main() {
  requestAnimationFrame(gameLoop)
}

window.onload = () => {
  main()
}


