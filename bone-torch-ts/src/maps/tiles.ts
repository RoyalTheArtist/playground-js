import { IComponent } from "../ecs"
import { Entity } from "../ecs/entity"
import { IInitialize } from "../engine"
import { SurfaceLayer } from "../render"
import { Color, Vector2D } from "../utils"

const TILE_SIZE = 32



export class TileDrawComponent implements IComponent {
  public parent: TileObject
  update() {
    this.Draw()
  }
  
  private Draw(): void {
    const color = this.parent.tile.color
    SurfaceLayer.background.drawStrokeRect(new Vector2D(this.parent.position.x * TILE_SIZE, this.parent.position.y * TILE_SIZE), new Vector2D(TILE_SIZE, TILE_SIZE), Color.fromString(color || 'white'))
  }
}
  

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
  
export class TileConstructor {
  constructor() {}
}

export const FLOOR_TILE: Tile = {
  passable: true,
  transparent: true,
  bitmask: null,
  sprite: "floor",
  color: "black"
}

export const WALL_TILE: Tile = {
  passable: false,
  transparent: true,
  bitmask: null,
  sprite: "wall",
  color: "white"
}

