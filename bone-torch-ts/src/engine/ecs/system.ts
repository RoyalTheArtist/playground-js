import { Component } from "./component.h"
import { Entity } from "./entity"

export abstract class System {
    public abstract componentsRequired: Set<Function>
    public components: Set<Component> = new Set()
    public abstract query(entities: Set<Entity>): void
    public abstract update(): void
    //public ecs: ECS | null = null
}
  