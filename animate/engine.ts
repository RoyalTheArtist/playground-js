import { Surface } from "./graphics"
import { BaseScreen } from "./screens"

export type Point = {x: number, y: number}
export type Vector2 = [number, number]

export class Engine {
    activeScreen: BaseScreen
    currentTimeStamp: number = 0

    constructor() {
        
    }

    setScreen(screen: BaseScreen) {
        this.activeScreen = screen
        this.activeScreen.engine = this
    }

    update(timeStamp: number) {
        const delta = (timeStamp - this.currentTimeStamp) / 1000
        const max_delta = Math.min(delta, 0.1)
        this.currentTimeStamp = timeStamp

        this.activeScreen.update(max_delta)
    }

    render(surface: Surface) {
        this.activeScreen.render(surface)
    }
}