import { IInitialize, IUpdate } from "../../engine";


export abstract class BaseScreen implements IUpdate, IInitialize {
    abstract update(delta: number): BaseScreen

    abstract initialize(): void
}