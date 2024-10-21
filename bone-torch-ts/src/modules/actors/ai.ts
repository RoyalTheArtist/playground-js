import { Component } from "@/engine/ecs"
import { Action, NoAction } from "./actions"
import { Actor } from "./actors"

export class AI implements Component {
    public parent: Actor

    public  initialize(): void {}
    public  update(_delta: number): void {}
    public  perform(_entity: Actor): Action { return new NoAction() }
}