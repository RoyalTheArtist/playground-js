import { Surface } from "../render"

export interface IInitialize {
    initialize(): void
}
export interface IUpdate {
    update(delta: number): void
}

export interface IRender {
    render?(surface: Surface): void
}
