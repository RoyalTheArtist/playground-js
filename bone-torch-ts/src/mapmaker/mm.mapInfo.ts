import { BaseAppComponent } from "../app"
import { MapMaker } from "../mapmaker"

export class MapInfoView extends BaseAppComponent {
    parent: MapMaker
    _el: HTMLElement
    constructor(parent: MapMaker, elem: string) {
        super(parent)
        this.parent = parent
        this._el = document.querySelector(elem) as HTMLElement
    }

    init() {
        this.draw()
    }

    draw() {

    }

    saveMap() {
        const parent = this.parent
        return parent.map.saveMap()
    }
}