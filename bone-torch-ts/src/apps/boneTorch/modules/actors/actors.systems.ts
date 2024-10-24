import { Entity, System } from 'bt-engine/ecs'
import { AI } from './ai'
import { ActionQueue, MoveAction } from './actions'
import { Actor } from './actors'


export class TurnSystem extends System {
    public componentsRequired = new Set([AI])
    public query(entities: Set<Entity>): void {
        for (const entity of entities) {
            if (entity.hasAll(this.componentsRequired)) {
                this.components.add(entity.getComponent(AI))
            }
        }
    }

    public update(): void {
        for (const currentTurn of this.components as Set<AI>) {
            const action = currentTurn.perform(currentTurn.parent)
            if (action instanceof MoveAction && action.canPerform()) {
                ActionQueue.addAction(currentTurn.parent as Actor, action, 175)
            }
        }
    }
}