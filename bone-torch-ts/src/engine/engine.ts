import { Viewport } from "../render";
import { BaseScreen } from "../screens";
import { IUpdate } from "./update.h";

import { KeyboardManager } from "../input";
export class Engine implements IUpdate {
    protected _screen: BaseScreen | null = null
    protected _lastUpdate: number = 0
    private _viewport: Viewport
    
    constructor(viewport: Viewport) {
        this._viewport = viewport
    }

    public get viewport(): Viewport {
        return this._viewport
    }

    public get screen(): BaseScreen | null {
        return this._screen
    }

    start() {
        new KeyboardManager()
        window.requestAnimationFrame(() => this.update(performance.now()))
    }

    setScreen(screen: BaseScreen) {
        this._screen = screen
    }

    update(timePassed: number) {
        this.viewport.clear()
        const delta = timePassed - this._lastUpdate
        this._lastUpdate = timePassed
        this.screen?.update(delta)
        this.viewport.draw()

        window.requestAnimationFrame((timeStamp) => {
            this.update(timeStamp)
        })
    }
}
