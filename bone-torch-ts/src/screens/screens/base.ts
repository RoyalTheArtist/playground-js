import { IUpdate } from "../../engine";


export abstract class BaseScreen implements IUpdate {
    abstract update(delta: number): void
}