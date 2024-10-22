import { Component } from "@/engine/ecs"
import { Actor } from "./actors"
import { Color, Settings, Vector2D } from "@/utils"
import { SurfaceLayer } from "@/render"
import { Item } from "@bt/modules/items"

const TILE_SIZE = Settings.tiles.size.x
const ENTITY_RADIUS = (TILE_SIZE - 2) / 2

export class ActorDrawComponent extends Component {
    public parent: Actor

    public get center() {
        return new Vector2D(this.screenPosition.x + ENTITY_RADIUS, this.screenPosition.y + ENTITY_RADIUS)
    }

    public get screenPosition() {
        return new Vector2D(this.parent.position.x * TILE_SIZE, this.parent.position.y * TILE_SIZE)
    }
    
    public update() {
        this.draw()
    }

    public initialize() { }

    public draw() {
        SurfaceLayer.foreground.fillCircle(this.center, ENTITY_RADIUS, Color.fromString('yellow'))
    }
}

class ActorLocomotionComponent extends Component {
    public parent: Actor
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