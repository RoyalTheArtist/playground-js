import { Surface } from "../graphics"

export interface IUpdate {
    update(delta: number): void
}

export interface IRender {
    render(surface: Surface): void
}
