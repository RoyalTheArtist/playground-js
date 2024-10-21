import { Entity } from "./entity";
import { IInitialize, IUpdate } from "../engine/update.h";
export abstract class Component implements IUpdate, IInitialize {
    parent: Entity | null

    update(_delta: number): void {}
    initialize(): void {}
}