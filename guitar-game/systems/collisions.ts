import { Component, Aspect, System, Entity } from "../ecs"
import { RectangleGraphic, Stage } from "../graphics/graphics"
import { Player } from "../input"
import { Position } from "../systems"

class Collision extends Component {
    width: number
    height: number
    constructor(width: number, height: number) {
        super()
        this.width = width
        this.height = height
    }
}

class CollisionsAspect extends Aspect {
    public graphic: RectangleGraphic
    constructor() {
        super()
    }
}

class DrawCollisions extends System {
    public componentsRequired = new Set<Function>([Position, Collision]);
    constructor(public stage: Stage) { super() }

    public makeAspect(): Aspect {
        return new CollisionsAspect()
    }
    public onAdd(aspect: CollisionsAspect): void {
        const position = aspect.get(Position)
        const collision = aspect.get(Collision)
        const sprite = new RectangleGraphic(collision.width, collision.height, 'red', position.p.x, position.p.y)
        aspect.graphic = sprite
        this.stage.add(sprite)
    }
    update(entities: Map<Entity, CollisionsAspect>): void {
        entities.forEach((aspect, entity) => {
            const position = this.ecs.getComponents(entity).get(Position)
            
            aspect.graphic.x = position.p.x
            aspect.graphic.y = position.p.y
        })
    }
}

class Colliding extends Component {
    target: Entity
    constructor(target: Entity) {
        super()
        this.target = target
    }
}

class CollisionDetector extends System {
    public componentsRequired = new Set<Function>([Position, Collision]);
    update(entities: Map<Entity, Aspect>): void {
        for (const entity of entities.keys()) {
            const pos1 = this.ecs.getComponents(entity).get(Position)
            const col1 = this.ecs.getComponents(entity).get(Collision)

            for (const entity2 of entities.keys()) {
                if (entity === entity2) {
                    continue
                }
                const pos2 = this.ecs.getComponents(entity2).get(Position)
                const col2 = this.ecs.getComponents(entity2).get(Collision)

                if (
                    pos1.p.x + col1.width > pos2.p.x &&
                    pos1.p.x < pos2.p.x + col2.width &&
                    pos1.p.y + col1.height > pos2.p.y &&
                    pos1.p.y < pos2.p.y + col2.height
                ) {
                    const player = this.ecs.getComponents(entity).get(Player)
                    if (player) {
                        this.ecs.addComponent(entity, new Colliding(entity2))
                    }
                    
                    //console.log(`Collision detected between ${entity} and ${entity2}`)
                }
            }
        }
    }
}

class PlayerCollisions extends System {
    public componentsRequired = new Set<Function>([Player, Colliding]);

    update(entities: Map<Entity, Aspect>): void {
        entities.forEach((_, entity) => {
            const colliding = this.ecs.getComponents(entity).get(Colliding)
            if (colliding) {
                console.log("Player collided with ", colliding.target)
                this.ecs.removeEntity(colliding.target)
                this.ecs.removeComponent(entity, Colliding)
            }
        })
    }
}

export { CollisionsAspect, Colliding, Collision, CollisionDetector, PlayerCollisions }