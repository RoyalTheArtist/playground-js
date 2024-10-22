import { Appearance, TileObject } from "./tile.base"

import { Component } from "bt-engine/ecs"
import { AssetManager } from "bt-engine/assets"

import { SurfaceLayer } from "@/render"
import { Vector2D } from "bt-engine/utils"


export class TileDrawComponent implements Component {
  public parent: TileObject
  update() {
    this.Draw()
  }
  
  initialize() {
    this.Draw()
  }

  private Draw(): void {
    //const color = this.parent..color
    //SurfaceLayer.background.drawStrokeRect(new Vector2D(this.parent.position.x * TILE_SIZE, this.parent.position.y * TILE_SIZE), new Vector2D(TILE_SIZE, TILE_SIZE), Color.fromString(color || 'white'))
  }
}


export class Sprite {
  public static from(url: string, frame: [number, number, number, number]) {
    
  }
}

export class TileAppearance implements Component {
  public parent: TileObject
  private appearance: Appearance

  constructor(appearance: Appearance, public readonly dimensions: Vector2D) {
    this.appearance = appearance
  }

  public get start() {
    return new Vector2D(this.parent.position.x * this.dimensions.x, this.parent.position.y * this.dimensions.y)
  }

  public get center() {
    return new Vector2D(this.start.x + this.dimensions.x / 2, this.start.y + this.dimensions.y / 2)
  }

  initialize() {  }

  update() { 
    this.draw()
  }

  draw() {
    const spritesheet = AssetManager.getSpriteSheet(this.appearance.resource)
    if (!spritesheet) return
    const sprite = spritesheet.getSprite(this.appearance.sprite)
    if (!sprite.canvas) return
    SurfaceLayer.background.draw(sprite.canvas, this.start.x, this.start.y)
  }
}

export class TileBitmask implements Component {
  public parent: TileObject
  public value: number

  constructor(bitmask: number) {
    this.value = bitmask
  }
  initialize() {  }

  update() { }
}