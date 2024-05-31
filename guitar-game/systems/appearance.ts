import { System, Component, Entity, Aspect } from "../ecs";
import Surface from "../graphics/surface";
import { Position } from "../systems";


class SpriteAtlas {
    private _sprite_atlas = new Map<string, HTMLCanvasElement>()
    constructor() {

    }

    buildRectangle(name: string, width: number, height: number, color: string = "red") {
        const canvas = document.createElement('canvas') as HTMLCanvasElement
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.fillStyle = color
        ctx.fillRect(0, 0, width, height)
        this._sprite_atlas.set(name, canvas)
    }

    buildSprite() {

    }
}


export class Appearance extends Component {
    public width: number = 1
    public height: number = 1
    private _canvas: HTMLCanvasElement
    constructor(public color: string = 'red', width: number, height: number) {
        super();
        this.width = width
        this.height = height
        this.constructCanvas()
    }

    private constructCanvas(): void {
        const canvas = document.createElement('canvas') as HTMLCanvasElement
        canvas.width = this.width
        canvas.height = this.height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.fillStyle = this.color
        ctx.fillRect(0, 0, this.width, this.height)
        this._canvas = canvas
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas
    }
}



export class AppearanceRenderer extends System {
    public componentsRequired = new Set<Function>([Position, Appearance]);

    public onAdd(aspect: Aspect): void {
        console.log(aspect)
    }
    update(entities: Map<Entity, Aspect>): void {
        entities.forEach((_, entity) => {
            const position = this.ecs.getComponents(entity).get(Position)
            const appearance = this.ecs.getComponents(entity).get(Appearance)
            Surface.ctx.drawImage(appearance.canvas, position.p.x, position.p.y)
          
        })
    }
}   


export class Sprite extends Component {
    url: string
    constructor(public name: string) {
        super()
    }
}
export class SpriteRenderer extends System {
    public componentsRequired = new Set<Function>([Position, Sprite]);

    public onAdd(aspect: Aspect): void {
        console.log(aspect)
    }

    update(entities: Map<Entity, Aspect>): void {
    }
}