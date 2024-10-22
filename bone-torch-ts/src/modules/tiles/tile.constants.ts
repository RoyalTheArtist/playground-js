import { Tile } from "./tile.base"

export const FLOOR_TILE: Tile = {
    passable: true,
    transparent: true,
    appearance: {
      resource: "src/data/sewers.sprites.json",
      sprite: "floor_bare",
      color: "black"
    }
  }
  
  export const WALL_TILE: Tile = {
    passable: false,
    transparent: true,
    appearance: {
      resource: "src/data/sewers.sprites.json",
      sprite: "brick",
      color: "white"
    }
  }