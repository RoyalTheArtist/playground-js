import { Component } from "../../ecs"
import { SurfaceLayer } from "../../render"
import { Vector2D } from "../../utils"
import { Settings } from "../../utils/settings"
import { TileObject } from "."

const TILE_SIZE = Settings.tiles.size.x

export class TileDrawComponent implements Component {
  public parent: TileObject
  update() {
    this.Draw()
  }
  
  initialize() {
    this.Draw()
  }

  private Draw(): void {
    const color = this.parent.tile.color
    SurfaceLayer.background.drawStrokeRect(new Vector2D(this.parent.position.x * TILE_SIZE, this.parent.position.y * TILE_SIZE), new Vector2D(TILE_SIZE, TILE_SIZE), Color.fromString(color || 'white'))
  }
}