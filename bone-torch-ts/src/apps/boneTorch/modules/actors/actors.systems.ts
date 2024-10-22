import { Entity, System } from 'bt-engine/ecs'
import { ActorDrawComponent } from './actors.components'

export class DrawEntitySystem extends System {
    public componentsRequired = new Set([ActorDrawComponent])
    public components: Set<ActorDrawComponent> = new Set()

    public query(entities: Set<Entity>): void {
        this.components.clear()
        for (let entity of entities) {
            if (entity.hasAll(this.componentsRequired)) {
                this.components.add(entity.getComponent(ActorDrawComponent))
            }
        }
    }

    public update(): void {
        for (let component of this.components) {
            component.update()
        }
    }
}