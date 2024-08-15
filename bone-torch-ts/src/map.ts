import { Surface } from "./graphics"

export type Tile = {
    passable: boolean
  transparent: boolean
    color?: string
    sprite?: string
  }
  

export interface IMapData {
    width: number
    height: number
    tiles: Tile[]
  }
  
export const Blank_Tile = {
  passable: true,
  transparent: true,
  sprite: "blank"
}
  
  export class GameMap {
    width: number
    height: number
    tiles: Tile[]
    constructor(width: number, height: number) {
      this.tiles = new Array(width * height)
      this.tiles.fill({ ...Blank_Tile })
  
      this.width = width
      this.height = height
    }

    public getTile(x: number, y: number) {
        return this.tiles[y * this.width + x]
    }

    public setTile(x: number, y: number, tile: Tile) {
        this.tiles[y * this.width + x] = tile
    }

    public saveMap(): IMapData {
      return {
        width: this.width,
        height: this.height,
        tiles: this.tiles
      }
    }
  }
  
export function createMap(mapData: number[], width: number, height: number) {
    const map = new GameMap(width, height)
  
    map.tiles = mapData.map((tile) => {
      return Blank_Tile
    })
  
    return map
}

export function loadMap(mapData: IMapData) {
    const map = new GameMap(mapData.width, mapData.height)
    map.tiles = mapData.tiles
    return map
}
  
export function drawMap(map: GameMap, surface: Surface) {
    const TILE_HEIGHT = 10
    const TILE_WIDTH = 10
  
    surface.clear()
  
    map.tiles.forEach((tile, index) => {
      const x = (index % map.width) * TILE_WIDTH
      const y = Math.floor(index / map.width) * TILE_HEIGHT
      surface.drawRect(x, y, TILE_WIDTH, TILE_HEIGHT, tile.color)
    })
  }