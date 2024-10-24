
import { Entity } from "bt-engine/ecs";
import { Vector2D } from "bt-engine/utils";
import { GameMap } from "bone-torch/modules/map";
import { Settings } from "bone-torch/settings";
import { Position } from "bone-torch/components";
import { MoveSpriteAnimation } from "bone-torch/modules/animations";

import { Inventory } from "./actors.components";
import { AnimationManager } from "bt-engine/graphics/animations";


const TILE_SIZE = Settings.tiles.size

export class Actor extends Entity {
    parent: GameMap | null = null
    constructor(public position: Vector2D) {
        super();
    }

    public initialize(): void {
        this.addComponent(new Inventory(10));
        super.initialize();
    }

    public moveTo(direction: Vector2D) {
        const entityPos = this.getComponent<Position>(Position)
            
        const newPosition = new Vector2D(entityPos.position.x + direction.x, entityPos.position.y + direction.y)

        const curTilePos = new Vector2D(entityPos.position.x * TILE_SIZE.x, Math.floor(entityPos.position.y * TILE_SIZE.y))
        const nextTilePos = new Vector2D(Math.floor(newPosition.x * TILE_SIZE.x), Math.floor(newPosition.y * TILE_SIZE.y))
        

        const animation = AnimationManager.triggerAnimation(new MoveSpriteAnimation(this, curTilePos, nextTilePos, 100))
        entityPos.position = newPosition
        this.position = newPosition

       
    }
}