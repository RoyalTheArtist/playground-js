
import { Actor } from "./actors"

import { SurfaceLayer } from "@/render"

import { Component } from "bt-engine/ecs"
import { Vector2D } from "bt-engine/utils"
import { GraphicObject, RenderComponent, Sprite } from 'bt-engine/graphics'

import { Item } from "bone-torch/modules/items"
import { Position } from "bone-torch/components"
import { AssetManager } from "@/engine/assets"




class CircleSprite extends Sprite {

    constructor(start: Vector2D, dimensions: Vector2D, public readonly radius: number) {
        super(null, start, dimensions)
    }
    public build() {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = this.dimensions.x
        canvas.height = this.dimensions.y
        ctx.beginPath()
        ctx.arc(this.dimensions.x / 2, this.dimensions.y / 2, this.radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'yellow'
        ctx.fill()

        const img = new Image()
        img.src = canvas.toDataURL()
        this.img = img
    }
}

type EntityAppearance = {
    shape: "circle" | "square",
    resource?: string,
    sprite?: string,
}

export class ActorAppearance extends RenderComponent {
    public parent: Actor | null = null
    private appearance: EntityAppearance
    private sprite: Sprite | null = null

    constructor(appearance: EntityAppearance) {
        super()
        this.appearance = appearance
    }

    public initialize() {
        if (this.appearance.resource && this.appearance.sprite) {
            const spritesheet = AssetManager.getSpriteSheet(this.appearance.resource)
            if (!spritesheet) return
            const sprite = spritesheet.getSprite(this.appearance.sprite)
            this.sprite = sprite
        } else if (this.appearance.shape === "circle") {
            this.sprite = new CircleSprite(new Vector2D(0, 0), new Vector2D(16, 16), 6)
            this.sprite.build()
        }
    }

    public update() { 
        //this.draw()
        if (!this.parent || !this.sprite) return
        const position = this.parent.getComponent<Position>(Position)
        if (!SurfaceLayer.foreground.objects.has(this.parent)) {
            SurfaceLayer.foreground.objects.set(this.parent, new GraphicObject(this.sprite, new Vector2D(position.position.x * 16, position.position.y * 16), "foreground"))
        }
    }
    
}

export class Inventory extends Component {
    private _items: Array<Item> = []
    constructor(public size: number) { super() }

    public get items() {
        return this._items
    }

    public addItem(item: Item) {
        this._items.push(item)
    }

    public removeItem(item: Item) {
        this._items.splice(this._items.indexOf(item), 1)
    }

    public initialize() {}
    public update() {}
}