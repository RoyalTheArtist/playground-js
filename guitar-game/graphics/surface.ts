
const canvas = document.createElement('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

class Surface {
    static x: number = 0
    static y: number = 0
  
    constructor(public width: number, public height: number) {
      canvas.width = width
      canvas.height = height
    }

    public static get canvas(): HTMLCanvasElement {
      return canvas
    }
  
    public static get ctx(): CanvasRenderingContext2D {
      return ctx
    }

    static draw(ctx: CanvasRenderingContext2D) {
      ctx.drawImage(canvas, Surface.x, Surface.y, 360, 700)
    }
  
    static clear() {
      ctx.clearRect(0, 0, canvas.width, Surface.canvas.height)
    }
}
  
export default Surface