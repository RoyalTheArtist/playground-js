import { Component, Entity, System } from "@/engine/ecs";

export class RenderComponent extends Component {

}

export class RenderSystem extends System {
    public componentsRequired = new Set([RenderComponent])
    public update(): void { }
    public query(_entities: Set<Entity>): void { }
}