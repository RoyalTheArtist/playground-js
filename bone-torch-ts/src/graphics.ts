export class Surface {
    width: number
    height: number
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    constructor(width: number, height: number) {
      this.width = width
      this.height = height
  
      this.canvas = document.createElement("canvas")
      this.canvas.width = width
      this.canvas.height = height
      this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D
    }
  
    public clear() {
      this.context.clearRect(0, 0, this.width, this.height)
    }
  
    public drawRect(x: number, y: number, width: number, height: number, color: string = "red") {
      this.context.fillStyle = color
      this.context.fillRect(x, y, width, height)
    }
    
    public draw(image: HTMLImageElement, x: number, y: number) {
        this.context.drawImage(image, x, y)
    }
  }
  
  type Dimensions = {
    width: number
    height: number
  }
  
  export class Screen {
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D
    resolution: Dimensions
    constructor(el: string = "#game") {
      this._canvas = document.querySelector(el) as HTMLCanvasElement
      if(!this._canvas) {
        this._canvas = document.createElement("canvas")
      }
      this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
  
      this.resolution = {
        width: this._canvas.width,
        height: this._canvas.height
      }
    }
  
    public get canvas(): HTMLCanvasElement {
      return this._canvas
    }
  
    public get context(): CanvasRenderingContext2D {
      return this._ctx
    }
  
    public setResolution(width: number, height: number) {
      this._canvas.width = width
      this._canvas.height = height
  
      this.resolution = {
        width: this._canvas.width,
        height: this._canvas.height
      }
    }
  
    public clear() {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }
  
    public render(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number) {
      this._ctx.drawImage(img, x, y)
    }

    public drawAlpha(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, zoom: number, alpha: number) {
      this.context.save()
      this.context.globalAlpha = 1-alpha
      this.context.drawImage(img, x, y, img.width * zoom, img.height * zoom)
      this.context.restore()
    }
  }
  
const BASE_URL = 'src/'

export class Texture {
    private _url: string
    private _image: HTMLImageElement
    private _loaded: boolean = false
    constructor(url: string) {
        this._url = url
        this._image = new Image()
        this._image.src = BASE_URL + this._url
    }

    get url() {
        return this._url
    }

    get image() {
        if (!this._loaded) return null
        return this._image
    }

    get loaded() {
        return this._loaded
    }
    async load() {
        return new Promise((resolve, reject) => {
            this._image.onload = () => {
                this._loaded = true
                resolve(this._image)
            }
        })
    }
}
