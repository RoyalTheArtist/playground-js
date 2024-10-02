export class Surface {
  width: number
  height: number
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  constructor(width: number, height: number, el: string = "") {
    this.width = width
    this.height = height

    if (el) {
      this.canvas = document.querySelector(el) as HTMLCanvasElement
    } else {
      this.canvas = document.createElement("canvas")
    }
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D
    this.setResolution(width, height)
  }

  public setResolution(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  public clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  public drawRect(x: number, y: number, width: number, height: number, color: string = "red") {
    this.context.fillStyle = color
    this.context.fillRect(x, y, width, height)
  }

  public draw(image: HTMLImageElement | HTMLCanvasElement, x: number, y: number) {
      this.context.drawImage(image, x, y)
  }

  public drawAlpha(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, zoom: number, alpha: number) {
    this.context.save()
    this.context.globalAlpha = 1-alpha
    this.context.drawImage(img, x, y, img.width * zoom, img.height * zoom)
    this.context.restore()
  }

  public drawText(text: string, x: number, y: number, color: string = "black", size: number = 16) {
    this.context.fillStyle = color
    this.context.textBaseline = "top"
    this.context.textAlign = "left"
    this.context.font = `${size}px sans-serif`
    this.context.fillText(text, x, y) 
  }
}
  
  type Dimensions = {
    width: number
    height: number
  }
  
  export class Viewport {
    private _surface: Surface
    resolution: Dimensions
    constructor(surface: Surface) {
      this._surface = surface
      this.resolution = {
        width: this.surface.canvas.width,
        height: this.surface.canvas.height
      }
    }

    public get surface(): Surface {
      return this._surface
    }
  
  
    public setResolution(width: number, height: number) {
      this._surface.setResolution(width, height)
  
      this.resolution = {
        width: width,
        height: height
      }
    }

    public drawAlpha(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, zoom: number, alpha: number) {
      this.surface.context.save()
      this.surface.context.globalAlpha = 1-alpha
      this.surface.context.drawImage(img, x, y, img.width * zoom, img.height * zoom)
      this.surface.context.restore()
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
