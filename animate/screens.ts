import { Engine, Point } from "./engine"
import { Surface } from "./graphics"
import { DrawCircle, DrawComponent, MovementComponent, OrbitPoint, Particle, Stationary } from "./particles"

export abstract class BaseScreen {
    engine: Engine
    public abstract update(delta: number): void
    public abstract render(surface: Surface): void
}

class ParticleBuilder {
    private particle: Particle
    constructor() {
        this.reset()
    }

    public build(): Particle {
        const particle = this.particle
        this.reset()
        return particle
    }

    public setPosition(x: number, y: number) {
        this.particle = new Particle(x, y)
        return this
    }

    public addMovement(movement: MovementComponent) {
        movement.parent = this.particle
        this.particle.movement = movement
        return this
    }

    public addDraw(draw: DrawComponent) {
        draw.parent = this.particle
        this.particle.draw = draw
        return this
    }

    public reset() {
        this.particle = new Particle(0, 0)
    }
}


class OrbitScreen extends BaseScreen {
    points: Point[] = []

    particles: Set<Particle> = new Set()
    constructor() {
        super()
        const particleBuilder = new ParticleBuilder()
        //const entity = new Entity({ x: 100, y: 100 })
        //this.entities.add(entity)
        //entity.velocity.move([0,1])

        const sun = new Particle(300, 250)
        //particle2.movement = new OrbitPoint(600, 250, 100, 3)
        sun.movement = new Stationary()
        sun.movement.parent = sun
        sun.color = "blue"
        sun.draw = new DrawCircle(20, "yellow")
        sun.draw.parent = sun
        this.particles.add(sun)



        const mercury = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 55, 3.193))
            .addDraw(new DrawCircle(3, "grey"))
            .build()
        


        const venus = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 80, 2.3256))
            .addDraw(new DrawCircle(4, "#ffe6b5"))
            .build()
        


        const earth = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 110, 2.12304))
            .addDraw(new DrawCircle(6, "green"))
            .build()
        
        const moon = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(earth.position, 15, 4))
            .addDraw(new DrawCircle(1, "white"))
            .build()

        const mars = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 130, 1.45039))
            .addDraw(new DrawCircle(5, "red"))
            .build()
        
        const jupiter = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 190, 1.0239))
            .addDraw(new DrawCircle(14, "orange"))
            .build()
        
        const saturn = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 230, 0.7543))
            .addDraw(new DrawCircle(12, "brown"))
            .build()
        
        const uranus = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 270, 0.42039))
            .addDraw(new DrawCircle(8, "lightblue"))
            .build()
        
        const neptune = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 320, 0.25))
            .addDraw(new DrawCircle(10, "blue"))
            .build()
        
        const pluto = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 400, 0.125))
            .addDraw(new DrawCircle(2, "grey"))
            .build()
        
        const haumea = particleBuilder
            .setPosition(0, 0)
            .addMovement(new OrbitPoint(sun.position, 500, 0.0625))
            .addDraw(new DrawCircle(1, "yellow"))
            .build()
        
        
        this.particles.add(mercury)
        this.particles.add(venus)
        this.particles.add(earth)
        this.particles.add(moon)
        this.particles.add(mars)
        this.particles.add(jupiter)
        this.particles.add(saturn)
        this.particles.add(uranus)
        this.particles.add(neptune)
        this.particles.add(pluto)
        this.particles.add(haumea)
    }
    public update(delta: number): void {
        for (let particle of this.particles) {
            particle.update(delta)
        }
    }

    public render(surface: Surface): void {
        surface.drawBackground("black")
        for (let particle of this.particles) {
            particle.draw.render(surface)
        }
    }
}

export {
    OrbitScreen
}