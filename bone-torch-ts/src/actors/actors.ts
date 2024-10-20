import { Entity, IComponent } from "../ecs";
import { SurfaceLayer } from "../render";
import { Color, Vector2D } from "../utils";
import { Action, NoAction } from "./actions";

class ActorDrawComponent implements IComponent {
    public parent: Actor
    constructor() { }

    public get center() {
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

export abstract class AI {
    public abstract update(action: Action): void
    public abstract perform(entity: Actor): Action
}

export class PlayerAI extends AI {
    private _nextAction: Action | null = null

    public update(action: Action) {
        this._nextAction = action
    }
    public perform(): Action {
        if (this._nextAction) {
            const action = this._nextAction
            this._nextAction = null
            return action
        }
        return new NoAction()
    }
}


export class Actor extends Entity {
    public ai: AI
    constructor(public position: Vector2D) {
        super();
    }

    public initialize(): void {
        this.addComponent(new ActorLocomotionComponent());
        this.addComponent(new ActorDrawComponent());
        super.initialize();
    }

    public moveTo(direction: Vector2D) {
        this.position = new Vector2D(this.position.x + direction.x, this.position.y + direction.y)
    }
}