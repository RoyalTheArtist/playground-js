import { Surface, SurfaceLayer } from "./surface"

import { IInitialize } from "bt-engine"
import { Color, Vector2D } from "bt-engine/utils"


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
      this.surface.drawRect(new Vector2D(0, 0), new Vector2D(this.surface.width, this.surface.height), Color.fromString('black'))
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
