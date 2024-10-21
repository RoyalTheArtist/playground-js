import { Entity } from "@/engine/ecs"

import { Vector2D, ImpossibleException } from "@/utils"
import { Actor } from "@/modules/actors"

export abstract class Action {
    abstract perform(entity: Entity): void
}

export class NoAction extends Action {
    perform(_entity: Entity): void {}
 }

export class MoveAction extends Action {
    constructor(public direction: Vector2D) {
        super()
    }
    perform(entity: Actor) {
        const map = entity.parent
        const moveToPosition = new Vector2D(entity.position.x + this.direction.x, entity.position.y + this.direction.y)
        if (!map.tileManager.isWalkable(moveToPosition) || !map.tileManager.isInBounds(moveToPosition)) {
            throw new ImpossibleException('Cannot move to this position')
        }
        entity.moveTo(this.direction)
    }
}




