import { Entity } from "bt-engine/ecs"

import { Vector2D, ImpossibleException } from "bt-engine/utils"
import { Actor } from "bone-torch/modules/actors"
import { PlayerMoveAnimation, RenderAnimation } from "@/engine/graphics/animations/animations"

export abstract class Action {
    private _parent: Actor | null = null

    public get requester(): Actor | null { return this._parent }
    public set requester(parent: Actor) { this._parent = parent }

    abstract perform(entity: Entity): void
    abstract canPerform(): {}
}

export class NoAction extends Action {
    perform(_entity: Entity): void { }
    canPerform() { return true }
 }

export class MoveAction extends Action {
    constructor(public direction: Vector2D) {
        super()
    }

    public get moveTo(): Vector2D {
        if (!this.requester) return new Vector2D(0, 0)
        return new Vector2D(this.requester.position.x + this.direction.x, this.requester.position.y + this.direction.y)
    }
    perform(entity: Actor) {
        entity.moveTo(this.direction)
    }

    canPerform() {
        if (!this.requester) return false
        const map = this.requester.parent
        return map.tileManager.isWalkable(this.moveTo) && map.tileManager.isInBounds(this.moveTo)
     }
}




