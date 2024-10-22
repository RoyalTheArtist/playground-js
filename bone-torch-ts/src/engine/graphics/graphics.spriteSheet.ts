import { Texture } from "./resources/texture"
import { Vector2D } from "bt-engine/utils"

export type SpriteAtlas = Map<string, [number, number, number, number]>
export type SpriteAtlasData = Record<string, [number, number, number, number]>

export interface ISpriteSheetData {
    "meta": {
        "resource": string,
        "tileset": {
            "size": [number, number]
        }
    },
    "atlas": {
        [key: string]: [number, number, number, number]
    }
}

export class Sprite {
    private _texture: Texture
    private _start: Vector2D
    private _dimensions: Vector2D

    private _img: HTMLImageElement | null = null
    private _working: boolean = false

    public get texture() {
        return this._texture
    }

    public get start() {
        return this._start
    }

    public get dimensions() {
        return this._dimensions
    }

    public get img() {
        if (!this._img) {
            this.build()
        }
        return this._img
    }

    constructor(texture: Texture, start: Vector2D, dimensions: Vector2D) {
        this._texture = texture
        this._start = start
        this._dimensions = dimensions
    }

    public build() {
        if (!this.texture.loaded || this._working) return

        this._working = true
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = this.dimensions.x
        canvas.height = this.dimensions.y
        ctx.drawImage(
            this.texture.image as HTMLImageElement,
            this.start.x,
            this.start.y,
            this.dimensions.x,
            this.dimensions.y, 0, 0, this.dimensions.x, this.dimensions.y)

    

        this._img = new Image()
        this._img.src = canvas.toDataURL()

        this._working = false
    }
}

export class SpriteSheet {
    private _texture: Texture
    private _atlas: SpriteAtlas = new Map()
    private sprites: Map<string, Sprite> = new Map()
    constructor(texture: Texture) {
        this._texture = texture
        return this
    }

    public static from(data: ISpriteSheetData): SpriteSheet {
        const texture = new Texture(data.meta.resource)
        const spritesheet = new SpriteSheet(texture)
        spritesheet.setAtlas(data.atlas)
        return spritesheet
    }

    public get atlas() {
        return this._atlas
    }

    public get texture() {
        return this._texture
    }

    public setAtlas(atlasData: SpriteAtlasData) {
        this.atlas.clear()
        for (const [key, value] of Object.entries(atlasData)) {
            this.atlas.set(key, value)
        }
        return this
    }

    public getSprite(name: string): Sprite {
        if (this.sprites.has(name)) {
            return this.sprites.get(name)!
        } else {
            const sprite = new Sprite(this._texture, new Vector2D(this.atlas.get(name)![0], this.atlas.get(name)![1]), new Vector2D(this.atlas.get(name)![2], this.atlas.get(name)![3]))
            sprite.build()
            this.sprites.set(name, sprite)
            return sprite
        }
    }
}

