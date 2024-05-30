import { Aspect, Component, Entity, System } from "./ecs"
import Surface from "./surface"

type Point = {x: number, y: number}

class Position extends Component {
  private _p: Point
  constructor(public x: number, public y: number) {
    super()
    this._p = {x, y}
  }

  get p(): Point { return this._p }
  set p(p: Point) { this._p = p }
  setX(x: number) { this._p.x = x }
  setY(y: number) { this._p.y = y }
}

class DrawPositions extends System {
  private logged = false
  public componentsRequired = new Set<Function>([Position]);
  update(entities: Map<Entity, Aspect>): void { 
    entities.forEach((_,entity) => {
      const position = this.ecs.getComponents(entity).get(Position)
      //const ctx = this.ecs.getComponents(entity).get(Surface).ctx
      Surface.ctx.fillStyle = 'red'
      Surface.ctx.fillRect(position.p.x, position.p.y, 25, 25)
    })
    if (!this.logged) {
      console.log(entities)
      this.logged = true
    }
  }
}

class Velocity extends Component {
  constructor(public vx: number, public vy: number) {
    super()
  }
}

class Physics extends System {
  private logged = false
  public componentsRequired = new Set<Function>([Position, Velocity])
  update(entities: Map<Entity, Aspect>): void { 
    entities.forEach((_aspect, entity) => {
      const position = this.ecs.getComponents(entity).get(Position)
      const velocity = this.ecs.getComponents(entity).get(Velocity)
      position.p.x += velocity.vx
      position.p.y += velocity.vy
    })

    if (!this.logged) {
      console.log(entities)
      this.logged = true
    }
  }
}

export { Position, DrawPositions, Velocity, Physics }