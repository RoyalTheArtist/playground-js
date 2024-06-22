export class Surface {
    public ctx: CanvasRenderingContext2D
    public canvas: HTMLCanvasElement
    
    constructor(width: number, height: number, name: string = "") {
        if (name) {
            this.canvas = document.querySelector(name) as HTMLCanvasElement
        }
        if (!this.canvas) this.canvas = document.createElement('canvas')
        
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    get width() {
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    public drawRect(x: number, y: number, width: number, height: number, color: string = "black") {
        this.ctx.fillStyle = color
        this.ctx.translate(x, y)
        this.ctx.fillRect(-width/2,-height/2, width, height)
        this.ctx.translate(-x, -y)
    }

    public drawCircle(x: number, y: number, radius: number, color: string = "black", outline?: string) {
        this.ctx.fillStyle = color
        if (outline) this.ctx.strokeStyle = outline
        this.ctx.translate(x, y)
        this.ctx.beginPath()
        this.ctx.arc(0, 0, radius, 0, 2 * Math.PI)
        this.ctx.fill()
        if (outline) this.ctx.stroke()
        this.ctx.translate(-x, -y)
    }

    public drawBackground(color: string = "black") {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }
}