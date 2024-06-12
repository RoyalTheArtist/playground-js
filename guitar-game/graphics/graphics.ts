
    export class ImageGraphic {
        private _img: HTMLImageElement
        public loaded: boolean = false
        private _url: string
        public width: number = 0
        public height: number = 0
    
        constructor(url: string) {
            const img = new Image()
            img.src = url
            img.onload = () => {
                this._img = img
                this.loaded = true
                this.width = img.width
                this.height = img.height
            }
            this._url = url
        }
    
        get img(): HTMLImageElement { return this._img }
    }
    

export abstract class GraphicObject {
    x: number = 0
    y: number = 0
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    public abstract render(ctx)
}

export class SpriteGraphic extends GraphicObject {
        
    public graphic: ImageGraphic
    constructor(graphic: ImageGraphic, public x: number = 0, public y: number = 0, public offset: boolean = false) {
        super(x, y)
        this.graphic = graphic
    }

    public render(ctx) {
        if (!this.graphic.loaded) {
            return
        }
        
        if (this.offset) {
            ctx.drawImage(this.graphic.img, this.x, this.y)
        } else {
            ctx.translate(this.x, this.y)
            ctx.drawImage(this.graphic.img, -this.graphic.width / 2, -this.graphic.height / 2)
            ctx.translate(-this.x, -this.y )
        }

    }
}
    
export class RectangleGraphic extends GraphicObject {
    rectangle: HTMLCanvasElement
    _width: number
    _height: number
    _color: string
    constructor(width: number, height: number, color: string = "red", x: number = 0, y: number = 0) {
        super(x, y)
        this._width = width
        this._height = height
        this.buildRectangle(width, height, color)
    }

    buildRectangle(width: number, height: number, color: string = "red") {
        const canvas = document.createElement('canvas') as HTMLCanvasElement
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.fillStyle = color
        ctx.fillRect(0, 0, width, height)
        ctx.imageSmoothingEnabled = false
        this.rectangle = canvas
    }
    public render(ctx) {
        ctx.translate(this.x, this.y)
        ctx.drawImage(this.rectangle, -(this._width/2), -this._height/2)
        ctx.translate(-this.x, -this.y )
    }

}

    class SpriteAtlas {
        private _sprite_atlas = new Map<string, GraphicObject>()
        constructor() {
    
        }
    
        public getSpriteFrom(url: string) {
            const sprite = SpriteAtlas.buildSprite(url)
            this._sprite_atlas.set(url, sprite)
        }
    
        public static buildRectangle(name: string, width: number, height: number, color: string = "red") {
            const canvas = document.createElement('canvas') as HTMLCanvasElement
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            ctx.fillStyle = color
            ctx.fillRect(0, 0, width, height)
            return canvas
    
        }
    
        public static buildSprite(urL: string) {
            const img = new ImageGraphic(urL)
            const sprite = new SpriteGraphic(img)
            return sprite
        }
    
        public static canvasToSprite(canvas: HTMLCanvasElement) {
            const img = new ImageGraphic(canvas.toDataURL())
            const sprite = new SpriteGraphic(img)
            return sprite
        }
    }
    
    export class Stage {
        private graphics: Set<GraphicObject> = new Set()
        public ctx: CanvasRenderingContext2D
        public canvas: HTMLCanvasElement
        constructor(public width: number, public height: number) {
            const canvas = document.createElement('canvas') as HTMLCanvasElement
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            this.ctx = ctx
            this.canvas = canvas
            this.ctx.imageSmoothingEnabled = false
        }
      
        public add(graphic: GraphicObject) {
            this.graphics.add(graphic)
        }

        public remove(graphic: GraphicObject) {
            this.graphics.delete(graphic)
        }
      
        render(ctx: CanvasRenderingContext2D) {
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.ctx.strokeStyle = "black"
            this.ctx.strokeRect(0, 0, this.width, this.height)
            this.graphics.forEach((graphic) => {
                graphic.render(this.ctx)
                })
                
            ctx.drawImage(this.canvas, 0, 0)
        }
      }
