import { System, Component, Entity, Aspect } from "../ecs";
import { GraphicObject, ImageGraphic, RectangleGraphic, SpriteGraphic, Stage } from "../graphics/graphics";
import Surface from "../graphics/surface";
import { Position } from "../systems";




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
    private _url: string
    constructor(url: string, public offset: boolean = false) {
        super()
        this._url = url
    }

    get url(): string { return this._url }
}

class SpriteAspect extends Aspect {
    public graphic: GraphicObject
    constructor() {
        super()
    }
}

export class SpriteRenderer extends System {
    public componentsRequired = new Set<Function>([Position, Sprite]);

    public makeAspect(): Aspect {
        return new SpriteAspect()
    }
    constructor(public stage: Stage) {
        super()
    }

    public onAdd(aspect: SpriteAspect): void {
        const sprite = aspect.get(Sprite)
        const position = aspect.get(Position)

        const img = new ImageGraphic(sprite.url)
        const graphicOjb = new SpriteGraphic(img, position.p.x, position.p.y, sprite.offset)

        aspect.graphic = graphicOjb
        this.stage.add(graphicOjb)
    }

    public onRemove(aspect: SpriteAspect): void {
        this.stage.remove(aspect.graphic)
    }

    update(entities: Map<Entity, SpriteAspect>): void {
        entities.forEach((aspect, entity) => {
            const position = this.ecs.getComponents(entity).get(Position)
           
            aspect.graphic.x = position.p.x
            aspect.graphic.y = position.p.y
        })
    }
}

export class DrawPosition extends System {
    public componentsRequired = new Set<Function>([Position]);

    constructor(public stage: Stage) {
        super()
    }
    public makeAspect(): Aspect {
        return new SpriteAspect()
    }
    public onAdd(aspect: SpriteAspect): void {
        const position = aspect.get(Position)
        const sprite = new RectangleGraphic(1, 1, 'red', position.p.x, position.p.y)
        this.stage.add(sprite)
        aspect.graphic = sprite

    }

    public onRemove(aspect: SpriteAspect): void {
        this.stage.remove(aspect.graphic)
    }
    update(entities: Map<Entity, SpriteAspect>): void { 
        entities.forEach((aspect,entity) => {
            const position = this.ecs.getComponents(entity).get(Position)
           
            aspect.graphic.x = position.p.x
            aspect.graphic.y = position.p.y
        })
    }
}