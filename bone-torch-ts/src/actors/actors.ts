import { Entity, IComponent } from "../ecs";
import { SurfaceLayer } from "../render";
import { Color, Vector2D } from "../utils";

class ActorDrawComponent implements IComponent {
    public parent: Actor
    constructor() { }

    public get center() {
        const position = this.parent.position
        return new Vector2D(this.screenPosition.x - 16, this.screenPosition.y - 16)
    }

    public get screenPosition() {
        return new Vector2D(this.parent.position.x * 32, this.parent.position.y * 32)
    }
    
    public update() {
        this.draw()
    }

    public initialize() { }

    public draw() {
        SurfaceLayer.foreground.fillCircle(this.center, 16, Color.fromString('yellow'))
    }
}

class ActorLocomotionComponent implements IComponent {
    public parent: Actor
    constructor() { }

    public initialize(): void {
        
    }

    public update(): void {
        
    }
}

export class Actor extends Entity {
    constructor(public position: Vector2D) {
        super();
    }

    public initialize(): void {
        this.addComponent(new ActorLocomotionComponent());
        this.addComponent(new ActorDrawComponent());
        super.initialize();
    }
}