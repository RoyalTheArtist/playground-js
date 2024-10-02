import { Surface } from "../graphics"

export type Tile = {
    passable: boolean
    transparent: boolean
    bitmask: number | null
    color?: string
    sprite?: string
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

const TILE_ATLAS = new Map<string | number, Tile>([
  [1, WALL_TILE],
  [0, FLOOR_TILE],
])

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

export function processMap(tiles: number[]) {
  const mapData = new Array(tiles.length)
  for (let i = 0; i < tiles.length; i++) {
    mapData[i] = TILE_ATLAS.get(tiles[i])
  }
  return mapData
}

export interface IMapData {
    width: number
    height: number
    tiles: Tile[]
  }
  
export const Blank_Tile = {
  passable: true,
  transparent: true,
  bitmask: null,
  sprite: "blank"
}
  
  export class GameMap {
    width: number
    height: number
    _tiles: Tile[]
    constructor(width: number, height: number) {
      this._tiles = new Array(width * height)
      this._tiles.fill({ ...Blank_Tile })
  
      this.width = width
      this.height = height
    }

    public get tiles(): Tile[] {
      return this._tiles
    }

    public process() {
      calculateBitmask(this)
    }

    public getTile(x: number, y: number) {
        return this._tiles[y * this.width + x]
    }

    public setTile(x: number, y: number, tile: Tile) {
        this._tiles[y * this.width + x] = tile
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
  
/**
 * Creates a new GameMap from a 1D array of tile data. The `mapData` array
 * should contain `width * height` elements, where each element is a number
 * representing the tile type from the `TILE_ATLAS` map. The resulting map
 * will be a `GameMap` object with the same width and height as the input
 * parameters.
 * 
 * @param mapData 1D array of tile data
 * @param width The width of the map
 * @param height The height of the map
 * @returns A new `GameMap` object
 */
export function createMap(mapData: number[], width: number, height: number) {
  const tiles = processMap(mapData)
  const map = loadMap({ width, height, tiles })
  return map
}

/**
 * Loads a `GameMap` object from a serialized representation of the map.
 * The `mapData` object should contain the following properties:
 * - `width`: The width of the map
 * - `height`: The height of the map
 * - `tiles`: A 1D array of tile data, where each element is a `Tile` object.
 *
 * @param mapData The serialized map data
 * @returns A new `GameMap` object
 */
export function loadMap(mapData: IMapData) {
    const map = new GameMap(mapData.width, mapData.height)
    map._tiles = mapData.tiles
    return map
}
  
export function drawMap(map: GameMap, targetSurface: Surface) {
  const TILE_HEIGHT = 20
  const TILE_WIDTH = 20

  const surface = new Surface(map.width * TILE_WIDTH, map.height * TILE_HEIGHT)

  for(const [index, tile] of map.tiles.entries()) {
    const x = (index % map.width) * TILE_WIDTH
    const y = Math.floor(index / map.width) * TILE_HEIGHT
    surface.drawRect(x, y, TILE_WIDTH, TILE_HEIGHT, tile.color)
  }

  targetSurface.draw(surface.canvas, 0, 0)
}