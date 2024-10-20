import { IComponent } from "./component.h"
import { IInitialize, IRender, IUpdate } from "../engine/update.h"
import { Vector2D } from "../utils"

type constr<T> = { new(...args: unknown[]): T }


export class Rectangle {
    constructor(public start: Vector2D, public end: Vector2D) { }
}


export abstract class Entity implements IUpdate, IInitialize { 
    protected _components: Set<IComponent> = new Set()
    protected _renderComponents: Set<IComponent> = new Set()

    public get components(): Set<IComponent> {
        return this._components
    }

    public addComponent(component: IComponent) {
        this._components.add(component)

        if ('render' in component) {
            this._renderComponents.add(component)
        }
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

    public initialize() {
        for (const component of this._components) {
            component.initialize()
        }
    }
}