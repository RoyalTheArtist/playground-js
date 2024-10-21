import { Component, Entity } from "../../ecs";
import { GameMap } from "../../maps";
import { SurfaceLayer } from "../../render";
import { Color, Vector2D } from "../../utils";
import { Settings } from "../../utils/settings";
import { Item } from "../items/items.base";


const TILE_SIZE = Settings.tiles.size.x
const ENTITY_RADIUS = (TILE_SIZE - 2) / 2

class ActorDrawComponent extends Component {
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

export class Actor extends Entity {
    parent: GameMap
    constructor(public position: Vector2D) {
        super();
    }

    public initialize(): void {
        this.addComponent(new Inventory(10));
        this.addComponent(new ActorLocomotionComponent());
        this.addComponent(new ActorDrawComponent());
        super.initialize();
    }

    public moveTo(direction: Vector2D) {
        this.position = new Vector2D(this.position.x + direction.x, this.position.y + direction.y)
    }
}