"use strict";

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

function main() {
  const { canvas, ctx } = setup('game')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

main()