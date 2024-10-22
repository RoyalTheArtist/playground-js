
import { Entity } from "@/engine/ecs";
import { GameMap } from "@/apps/boneTorch/modules/map";
import { Vector2D } from "@/utils";
import { ActorDrawComponent, Inventory } from "./actors.components";


export class Actor extends Entity {
    parent: GameMap
    constructor(public position: Vector2D) {
        super();
    }

    public initialize(): void {
        this.addComponent(new Inventory(10));
        this.addComponent(new ActorDrawComponent());
        super.initialize();
    }

    public moveTo(direction: Vector2D) {
        this.position = new Vector2D(this.position.x + direction.x, this.position.y + direction.y)
    }
}