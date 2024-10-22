import { Entity, System } from 'bt-engine/ecs'
import { ActorDrawComponent } from './actors.components'
import { Position } from '../../components'

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