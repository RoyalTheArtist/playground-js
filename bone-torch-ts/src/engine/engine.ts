import { SurfaceLayer, Viewport } from "../render";
import { BaseScreen } from "../screens";
import { Color } from "../utils";
import { IUpdate } from "./update.h";

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
        window.requestAnimationFrame(() => this.update())
    }

    setScreen(screen: BaseScreen) {
        this._screen = screen
    }

    update() {
        SurfaceLayer.clear()
        SurfaceLayer.background.drawRect(0, 0, 800, 600, Color.fromString('black'))
        const delta = Date.now() - this._lastUpdate
        
        this.screen?.update(delta)
        this.viewport.draw()

        window.requestAnimationFrame(() => {
            this._lastUpdate = Date.now()
            this.update()   
        })
    }
}
