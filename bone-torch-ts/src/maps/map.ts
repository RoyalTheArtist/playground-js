import { Entity } from "../ecs"
import { IInitialize } from "../engine"
import { Vector2D } from "../utils"
import { FLOOR_TILE, Tile, TileObject, WALL_TILE } from "./tiles"


const bitmaskDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
]

export function calculateBitmask(map: GameMap) {
  for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
      const tile = map.getTile(x, y)
      if (tile && tile.transparent) {
        let bitmask = 0
        bitmaskDirections.forEach(([dx, dy]) => {
          const tx = x + dx
          const ty = y + dy
          if (tx >= 0 && tx < map.width && ty >= 0 && ty < map.height) {
            const otherTile = map.getTile(tx, ty)
            if (otherTile && otherTile.transparent) {
              bitmask |= 1 << (dx + dy * 8)
            }
          }
        }) 
        
        tile.bitmask = bitmask
      }
    }
  }
}



export interface IMapData {
    width: number
    height: number
    tiles: Tile[]
  }
  


  
export class GameMap extends Entity implements IInitialize {
  private _tiles: TileObject[]
  
  constructor(public size: Vector2D) {
    super()
    const { x: width, y: height } = size
    this._tiles = new Array(width * height)
  }

  public get width(): number {
    return this.size.x
  }

  public get height(): number { 
    return this.size.y
  }

  public get tiles(): TileObject[] {
    return this._tiles
  }

  public initialize() {
    for (const tile of this._tiles) {
      tile.initialize()
    }

    this.process()
  }

  public update(_delta: number) { 
    for (const tile of this._tiles) {
      tile.update(_delta)
    }
  }
  

  public process() {
    calculateBitmask(this)
  }

  public getTile(x: number, y: number) {
      return this._tiles[y * this.width + x]
  }

  public setTile(x: number, y: number, tile: Tile) {
      this._tiles[y * this.width + x] = new TileObject(new Vector2D(x, y), { ...tile})
  }

  public setTiles(tiles: TileObject[]) {
      this._tiles = tiles
  }

  public getTilesInBounds(x: number, y: number, width: number, height: number) {
      const tiles = new Array(width * height)
      for (let i = 0; i < width * height; i++) {
          const tile = this.getTile(x + i % width, y + Math.floor(i / width))
          if (tile) {
              tiles.push(tile)
          } 
      }
      return tiles
  }

  public saveMap(): IMapData {
    return {
      width: this.width,
      height: this.height,
      tiles: this._tiles
    }
  }
}
 
  

