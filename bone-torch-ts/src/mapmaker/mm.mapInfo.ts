import { BaseAppComponent } from "../app"
import { MapMaker } from "../mapmaker"

export class MapInfoView extends BaseAppComponent {
    _el: HTMLElement
    constructor(parent: MapMaker, elem: string) {
        super(parent)

        this._el = document.querySelector(elem) as HTMLElement
    }

    init() {
        this.draw()
    }

    draw() {

    }

    saveMap() {
        const parent = this.parent as MapMaker

        return parent.map.saveMap()
    }
}