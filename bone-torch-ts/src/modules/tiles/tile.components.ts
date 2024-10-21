import { Appearance, TileObject } from "./tile.base"

import { Component } from "@/engine/ecs"
import { SurfaceLayer } from "@/render"
import { Color, Vector2D, Settings } from "@/utils"
import { AssetManager } from "../graphics/assets"

const TILE_SIZE = Settings.tiles.size.x

export class TileDrawComponent implements Component {
  public parent: TileObject
  update() {
    this.Draw()
  }
  
  initialize() {
    this.Draw()
  }

  private Draw(): void {
    const color = this.parent.tile.color
    SurfaceLayer.background.drawStrokeRect(new Vector2D(this.parent.position.x * TILE_SIZE, this.parent.position.y * TILE_SIZE), new Vector2D(TILE_SIZE, TILE_SIZE), Color.fromString(color || 'white'))
  }
}


export class Sprite {
  public static from(url: string, frame: [number, number, number, number]) {
    
  }
}

export class TileAppearance implements Component {
  public parent: TileObject
  private appearance: Appearance

  constructor(appearance: Appearance) {
    this.appearance = appearance
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
    SurfaceLayer.background.draw(sprite.canvas, this.parent.position.x * TILE_SIZE, this.parent.position.y * TILE_SIZE)
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