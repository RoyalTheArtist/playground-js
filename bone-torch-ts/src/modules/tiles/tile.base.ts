import { Entity } from "../../ecs"
import { IInitialize } from "../../engine"
import { Vector2D } from "../../utils"
import { TileDrawComponent } from "./tile.components"

export class TileObject extends Entity implements IInitialize, Tile {
    public passable: boolean
    public transparent: boolean
    public bitmask: number | null
  
    public sprite?: string
    public color?: string
    constructor(public position: Vector2D, public tile: Tile) {
      super()
  
      this.passable = tile.passable
      this.transparent = tile.transparent
      this.bitmask = tile.bitmask
    }
  
    public initialize(): void {
      this.addComponent(new TileDrawComponent())
    }
  }
  
export type Tile = {
    passable: boolean
    transparent: boolean
    bitmask: number | null
    color?: string
    sprite?: string
}