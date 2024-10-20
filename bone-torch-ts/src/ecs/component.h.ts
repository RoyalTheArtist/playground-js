import { Entity } from "./entity";
import { IInitialize, IUpdate } from "../engine/update.h";
export interface IComponent extends IUpdate, IInitialize {
    parent: Entity | null
}