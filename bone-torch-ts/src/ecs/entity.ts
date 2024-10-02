import { IComponent } from "./component.h"
import { IUpdate } from "../engine/update.h"

type constr<T> = new(...args: unknown[]) => T

export class Vector2D {
    constructor(public x: number = 0, public y: number = 0) { }
}

export class Rectangle {
    constructor(public start: Vector2D, public end: Vector2D) { }
}

export abstract class Entity implements IUpdate { 
    protected _components: Set<IComponent> = new Set()

    public get components(): Set<IComponent> {
        return this._components
    }

    public addComponent(component: IComponent) {
        this._components.add(component)
        component.parent = this
    }

    public hasComponent<C extends IComponent>(c: constr<C>): boolean {
        for (const component of this._components) {
            if (component instanceof c) {
                return true
            }
        }
        return false
    }

    public getComponent<C extends IComponent>(c: constr<C>): C {
        for (const component of this._components) {
            if (component instanceof c) {
                return component
            }
        }
        throw new Error('Component not found')
    }

    public removeComponent<C extends IComponent>(c: constr<C>) {
        for (const component of this._components) {
            if (component instanceof c) {
                this._components.delete(component)
                break;
            }
        }
    }

    public update(delta: number): void {
        for (const component of this._components) {
            component.update(delta)
        }
    }
}

export class Actor extends Entity { 
    public position: Vector2D = new Vector2D()
}