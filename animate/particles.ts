import { Point } from "./engine"
import { Surface } from "./graphics"

export abstract class DrawComponent {
    parent: Particle
    public abstract render(surface: Surface): void
}

export class DrawCircle extends DrawComponent {
    constructor(public radius: number = 5, public color: string = "black") { super() }
    public render(surface: Surface) {
        surface.drawCircle(this.parent.position.x, this.parent.position.y, this.radius, this.color, "black")

        
        // surface.ctx.strokeStyle = this.color
        // surface.ctx.moveTo(this.parent.position.x, this.parent.position.y)
        // surface.ctx.lineTo(this.parent.position.x + (this.radius + 15)* Math.cos(this.parent.rotation), this.parent.position.y + (this.radius+15) * Math.sin(this.parent.rotation))
        // surface.ctx.stroke()
    }
}

export abstract class MovementComponent {
    parent: Particle
    public abstract update(delta: number): void
}

export class Stationary extends MovementComponent {
    public update(delta: number) { }
}

export class OrbitPoint extends MovementComponent {
    target: Point
    orbit: number = 0
    constructor(target: Point, public radius: number = 10, public speed: number = 4) {
        super()
        this.target = target
    }
    public update(delta: number) { 
        
        if (this.orbit > Math.PI * 2) {
            this.orbit = 0
        }
    
        this.parent.position.x = this.target.x + this.radius * Math.cos(this.orbit)
        this.parent.position.y = this.target.y + this.radius * Math.sin(this.orbit)
        this.orbit += delta * this.speed
    }
}

export class Particle {
    position: Point
    rotation: number = 0
    color: string = "red"
    movement: MovementComponent
    draw: DrawComponent
    constructor(x: number, y: number) {
        this.position = { x, y }
   
        this.movement = new Stationary()
        this.movement.parent = this

        this.draw = new DrawCircle()
        this.draw.parent = this
    }

    update(delta: number) {
        this.movement.update(delta)
    }
}