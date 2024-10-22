
import { Actor } from "./actors"

import { SurfaceLayer } from "@/render"

import { Component } from "bt-engine/ecs"
import { Color, Vector2D } from "bt-engine/utils"

import { Item } from "bone-torch/modules/items"

export class ActorDrawComponent extends Component {
    public parent: Actor
    
    constructor(public dimensions: Vector2D, public type: string = "circle") { super() }

    public get center() {
        return new Vector2D(this.screenPosition.x + this.radius, this.screenPosition.y + this.radius)
    }

    public get screenPosition() {
        return new Vector2D(this.parent.position.x * this.radius * 2, this.parent.position.y * this.radius * 2 -2)
    }

    public get radius() {
        return this.dimensions.x / 2
    }
    
    public update() {
        this.draw()
    }

    public initialize() { }

    public draw() {
        if (this.type === "square") {
            const color = Color.fromString('yellow')
            SurfaceLayer.foreground.drawRect(this.parent.position, new Vector2D(this.dimensions.x, this.dimensions.y), color)
        }
        else {
            SurfaceLayer.foreground.fillCircle(this.center, this.radius - 2, Color.fromString('yellow'))
        }
        
    }
}

export class Inventory extends Component {
    public parent: Actor

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