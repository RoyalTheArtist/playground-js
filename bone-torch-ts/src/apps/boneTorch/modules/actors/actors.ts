
import { Entity } from "bt-engine/ecs";
import { Vector2D } from "bt-engine/utils";
import { GameMap } from "bone-torch/modules/map";
import { Settings } from "bone-torch/settings";
import { Position } from "bone-torch/components";

import { ActorDrawComponent, Inventory } from "./actors.components";


const TILE_SIZE = Settings.tiles.size

export class Actor extends Entity {
    parent: GameMap
    constructor(public position: Vector2D) {
        super();
    }

    public initialize(): void {
        this.addComponent(new Inventory(10));
        this.addComponent(new ActorDrawComponent(new Vector2D(TILE_SIZE.x, TILE_SIZE.y)));
        super.initialize();
    }

    public moveTo(direction: Vector2D) {
        const position = new Position(this.position)
        this.addComponent(position);
        this.position = new Vector2D(this.position.x + direction.x, this.position.y + direction.y)
    }
}