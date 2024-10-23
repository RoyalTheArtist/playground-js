import { Entity, System } from 'bt-engine/ecs'
import { ActorDrawComponent } from './actors.components'
import { Position } from '../../components'
import { AI } from './ai'
import { ActionQueue, MoveAction } from './actions'
import { Actor } from './actors'

export class DrawEntitySystem extends System {
    public componentsRequired = new Set([ActorDrawComponent, Position])
    private entities: Set<Entity> = new Set()

    public query(entities: Set<Entity>): void {
        this.components.clear()
        for (let entity of entities) {
            if (entity.hasAll(this.componentsRequired)) {
                this.entities.add(entity)
            }
        }
    }

    public update(delta: number): void {
        for (let entity of this.entities) {
            const component = entity.getComponent(ActorDrawComponent)
            component.update(delta)
        }
    }
}


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