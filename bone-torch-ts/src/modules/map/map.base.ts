import { Entity } from "../../engine/ecs"
import { IInitialize } from "../../engine"
import { Tile } from "../tiles"
import { Vector2D } from "../../utils"
import { TileManager } from "../tiles"

export interface IMapData {
  width: number
  height: number
  tiles: Tile[]
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
    this.tileManager.process()
  }

  public saveMap(): IMapData {
    return {
      width: this.width,
      height: this.height,
      tiles: this.tileManager.tiles
    }
  }
}
 