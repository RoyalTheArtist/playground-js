import { Entity } from "../ecs"
import { IInitialize } from "../engine"
import { Vector2D } from "../utils"
import { Tile, TileObject } from "./tiles"


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
      const tile = map.tileManager.getTile(new Vector2D(x, y))
      if (tile && tile.transparent) {
        let bitmask = 0
        bitmaskDirections.forEach(([dx, dy]) => {
          const tx = x + dx
          const ty = y + dy
          if (tx >= 0 && tx < map.width && ty >= 0 && ty < map.height) {
            const otherTile = map.tileManager.getTile(new Vector2D(tx, ty))
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
  
class TileManager {
  private _tiles: TileObject[]

  constructor(public readonly dimensions: Vector2D) {
    this._tiles = new Array(this.size * this.size)
  }

  public get size(): number {
    return this.dimensions.x * this.dimensions.y
  }

  public get tiles(): TileObject[] {
    return this._tiles
  }

  public initialize() {
    for (const tile of this._tiles) {
      tile.initialize()
    }
  }

  public update(delta: number) {
    for (const tile of this._tiles) {
      tile.update(delta)
    }
  }

  public getTile(position: Vector2D) {
    return this._tiles[position.y * this.dimensions.x + position.x]
  }

  public setTile(position: Vector2D, tile: Tile) {
      this._tiles[position.y * this.dimensions.x + position.x] = new TileObject(new Vector2D(position.x, position.y), { ...tile})
  }

  public setTiles(tiles: TileObject[]) {
      this._tiles = tiles
  }

  public getTilesInBounds(position: Vector2D, dimensions: Vector2D) {
    const { x: width, y: height } = dimensions

    const tiles = new Array(width * height)
    for (let i = 0; i < width * height; i++) {
      const x = position.x + i % width
      const y = position.y +Math.floor(i / width)
        const tile = this.getTile(new Vector2D(x, y))
        if (tile) {
            tiles.push(tile)
        } 
    }
    return tiles
  }

  isWalkable(position: Vector2D) {
    const tile = this.getTile(position)
    if (tile) {
      return tile.passable
    } else {
      return true
    }
  }

  isInBounds(position: Vector2D) {
    return position.x >= 0 && position.x < this.dimensions.x && position.y >= 0 && position.y < this.dimensions.y
  }
}
  
export class GameMap extends Entity implements IInitialize {
  private _tileManager: TileManager
  
  constructor(public size: Vector2D) {
    super()
    this._tileManager = new TileManager(size)
  }

  public get width(): number {
    return this.size.x
  }

  public get height(): number { 
    return this.size.y
  }

  public get tileManager(): TileManager {
    return this._tileManager
  }

  public initialize() {
    this.tileManager.initialize()

    this.process()
  }

  public update(delta: number) { 
    this.tileManager.update(delta)
  }
  
  public process() {
    calculateBitmask(this)
  }

  
  

  public saveMap(): IMapData {
    return {
      width: this.width,
      height: this.height,
      tiles: this.tileManager.tiles
    }
  }

  

 
}
 
  

