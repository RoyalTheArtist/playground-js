import { ECS } from "../engine/ecs"

abstract class BaseScreen {
    public abstract update(delta: number): void
    public abstract render(surface: Surface): void
}

type Point = {x: number, y: number}
type Vector2 = [number, number]

abstract class DrawComponent {

    public abstract render(surface: Surface): void
}

class Velocity {
    _vx: number
    _vy: number
    constructor(vx: number, vy: number, public speed: number = 20) {
        this._vx = vx
        this._vy = vy
    }

    move(vector: Vector2) {
        this._vx = vector[0]
        this._vy = vector[1]
    }

    get vx(): number { return this._vx }
    get vy(): number { return this._vy }
}

class Entity {
    velocity: Velocity = new Velocity(0, 0, 50)
    draw: DrawComponent
    constructor(public position: Point) {
    }

    public update(delta: number): void {
        this.position.x += this.velocity.vx * this.velocity.speed * delta
        this.position.y += this.velocity.vy * this.velocity.speed * delta
    }
}

class StartScreen extends BaseScreen {
    points: Point[] = []
    entities: Set<Entity> = new Set()
    constructor() {
        super()

        const entity = new Entity({ x: 100, y: 100 })
        this.entities.add(entity)
        entity.velocity.move([0,1])
    }
    public update(delta: number): void {
        for (let entity of this.entities) {
            entity.update(delta)
        }
    }

    public render(surface: Surface): void {
        for (let entity of this.entities) {
            surface.drawRect(entity.position.x, entity.position.y, 5, 5, "blue")
        }
       
    }
}

class Engine {
    activeScreen: BaseScreen
    currentTimeStamp: number = 0

    constructor() {
        this.activeScreen = new StartScreen()
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

class Surface {
    public ctx: CanvasRenderingContext2D
    public canvas: HTMLCanvasElement
    
    constructor(width: number, height: number, name: string = "") {
        if (name) {
            this.canvas = document.querySelector(name) as HTMLCanvasElement
        }
        if (!this.canvas) this.canvas = document.createElement('canvas')
        
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    get width() {
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    public drawRect(x: number, y: number, width: number, height: number, color: string = "black") {
        this.ctx.fillStyle = color
        this.ctx.translate(x, y)
        this.ctx.fillRect(-width/2,-height/2, width, height)
        this.ctx.translate(-x, -y)
    }
}

function main() {
    const engine = new Engine()

    const surface = new Surface(640, 480, "#anims")
    
    function gameLoop(timeStamp: number) {
        engine.update(timeStamp)
        surface.clear()
        engine.render(surface)
        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)
}

window.onload = () => {
    main()
}