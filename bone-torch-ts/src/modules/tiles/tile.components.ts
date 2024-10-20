import { TileObject } from "./tile.base"

import { Component } from "@/engine/ecs"
import { SurfaceLayer } from "@/render"
import { Color, Vector2D, Settings } from "@/utils"

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