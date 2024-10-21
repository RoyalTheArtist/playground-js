import { TileAppearance, TileDrawComponent } from "./tile.components"

import { Entity } from "bt-engine/ecs"
import { IInitialize } from "@/engine"
import { Vector2D } from "@/utils"

export class TileObject extends Entity implements IInitialize, Tile {
    public passable: boolean
    public transparent: boolean
    private _tile: Tile

    constructor(public position: Vector2D,  tile: Tile) {
      super()

      this.passable = tile.passable
      this.transparent = tile.transparent

      this._tile = tile
    }
  
    public initialize(): void {
      //this.addComponent(new TileDrawComponent())
      
      if (this._tile.appearance) {
        this.addComponent(new TileAppearance(this._tile.appearance))
      }
    }
}
  
export type Appearance = {
  resource: string
  sprite: string
  color?: string
}

  
export type Tile = {
    passable: boolean
    transparent: boolean
    appearance?: Appearance
}