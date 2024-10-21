import { Tile } from "./tile.base"

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