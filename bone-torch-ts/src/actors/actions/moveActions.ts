import { Entity } from "../../ecs"
import { Vector2D } from "../../utils"
import { Actor } from "../actors"

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
        entity.moveTo(this.direction)
    }
}




