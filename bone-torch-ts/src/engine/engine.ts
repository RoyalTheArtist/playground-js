import { Viewport } from "../graphics";
import { BaseScreen } from "../screens";
import { IRender, IUpdate } from "./update.h";

export class Engine implements IUpdate, IRender {
    protected _screen: BaseScreen | null = null
    protected _lastUpdate: number = 0
    protected _viewport: Viewport

    constructor(viewport: Viewport) {
        this._viewport = viewport
    }

    start() {
        window.requestAnimationFrame(() => this.update())
    }

    setScreen(screen: BaseScreen) {
        this._screen = screen
    }

    update() {
        const delta = Date.now() - this._lastUpdate
        
        if (this._screen) {
            this._screen.update(delta)
        }

        window.requestAnimationFrame(() => {
            this._lastUpdate = Date.now()
            this.update()
            this.render()
        })
    }

    render() {
        if (!this._screen) return
        this._screen.render(this._viewport.surface)
    }
}
