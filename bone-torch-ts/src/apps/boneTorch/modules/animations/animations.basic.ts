import { GraphicObject } from "bt-engine/graphics"
import { SurfaceLayer } from "@/render"
import { Entity } from "bt-engine/ecs"
import { RenderAnimation } from "bt-engine/graphics/animations"
import { Vector2D } from "bt-engine/utils"

export class MoveSpriteAnimation extends RenderAnimation {
    private counter: number = 0
    private increment: {x: number, y: number}

    private graphicsObject: GraphicObject | null = null
    constructor(public readonly entity: Entity, public readonly from: Vector2D, public readonly to: Vector2D, public readonly duration: number = 100,) {
        super()
        this.increment = {
            x: (this.to.x - this.from.x) / this.duration,
            y: (this.to.y - this.from.y) / this.duration
        }
    }

    public initialize() {
        if (SurfaceLayer.foreground.objects.has(this.entity)) {
            const graphicsObject = SurfaceLayer.foreground.objects.get(this.entity)
            if (graphicsObject) {
                graphicsObject.position = this.from
                this.graphicsObject = graphicsObject
            }
        }
    }

    public update(delta: number) {
        if (this.counter >= this.duration) {
            this.end()
            return
        }
        this.counter += delta

        if (!this.graphicsObject) return

        const x = this.from.x + this.increment.x * this.counter
        const y = this.from.y + this.increment.y * this.counter
        const position = new Vector2D(x, y)
        this.graphicsObject.position = position
    }
}