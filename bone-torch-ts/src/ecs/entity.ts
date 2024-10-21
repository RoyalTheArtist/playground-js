import { Component } from "./component.h"
import { IInitialize, IUpdate } from "../engine/update.h"
import { Vector2D } from "../utils"

type constr<T extends Component> = new(...args: any[]) => T 

export class Rectangle {
    constructor(public start: Vector2D, public end: Vector2D) { }
}


export abstract class Entity implements IUpdate, IInitialize { 
    protected _components: Map<Function, Component> = new Map()


    public get components() {
        return this._components
    }

    public addComponent(component: Component) {
        this._components.set(component.constructor, component)

        component.parent = this
    }

    public hasComponent(c: Function): boolean {
        return this.components.has(c)
    }

    public hasAll<C extends Component>(componentClasses: Iterable<constr<C>>): boolean {
        for (let componentClass of componentClasses) {
            if (!this.hasComponent(componentClass)) {
                return false
            }
        }
        return true
    }

    public getComponent<T extends Component>(c: constr<T>): T {
        this.components.get(c) as T
        throw new Error('Component not found')
    }

    public removeComponent<C extends Component>(c: constr<C>) {
        for (const component of this._components.keys()) {
            if (component instanceof c) {
                this._components.delete(component)
                break;
            }
        }
    }

    public update(delta: number): void {
        for (const component of this._components.values()) {
            component.update(delta)
        }
    }

    public initialize() {
        for (const component of this._components.values()) {
            component.initialize()
        }
    }
}