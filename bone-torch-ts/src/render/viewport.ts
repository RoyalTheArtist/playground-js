import { IInitialize } from "../engine"
import { Color, Vector2D } from "../utils"
import { Surface, SurfaceLayer } from "./surface"

export class Viewport implements IInitialize {
    private _surface: Surface

    constructor(surface: Surface) {
      this._surface = surface
    }

    public get surface(): Surface {
      return this._surface
    }
  
    public initialize() {
      document.body.appendChild(this._surface.canvas)
    }
  
    public draw() {
      this.surface.clear()
      this.surface.drawRect(0, 0, 800, 600, Color.fromString('black'))
      this.surface.draw(SurfaceLayer.background.canvas, 0, 0)
      this.surface.draw(SurfaceLayer.foreground.canvas, 0, 0)
    }
  
    public clear() {
      SurfaceLayer.background.clear()
      SurfaceLayer.foreground.clear()
    }

    public setResolution(width: number, height: number) {
      this._surface.setResolution(new Vector2D(width, height))
    }

    public drawAlpha(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, zoom: number, alpha: number) {
      this.surface.context.save()
      this.surface.context.globalAlpha = 1-alpha
      this.surface.context.drawImage(img, x, y, img.width * zoom, img.height * zoom)
      this.surface.context.restore()
    }
  
  public drawBackground(color: Color = new Color(0, 0, 0)) {
      this.surface.drawRect(0, 0, this.surface.width, this.surface.height, color)
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
