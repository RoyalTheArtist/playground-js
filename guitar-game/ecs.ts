type Entity = number

abstract class Component {}

abstract class System {
    public abstract componentsRequired: Set<Function>
    public ecs: ECS
    
    public makeAspect(): Aspect {
        return new Aspect()
    }

    public onAdd(_aspect: Aspect): void { }
    
    public onRemove(_aspect: Aspect): void { }
    public abstract update(entities: Map<Entity, Aspect>): void
}

type ComponentClass<T extends Component> = new (...args: any[]) => T

class ComponentContainer {
  private components = new Map<Function, Component>()

  public add(component: Component) {
    this.components.set(component.constructor, component)
  }

  public get<T extends Component>(componentClass: ComponentClass<T>): T {
    return this.components.get(componentClass) as T
  }

  public has(componentClass: Function): boolean {
    return this.components.has(componentClass)
  }

  public hasAll(componentClasses: Iterable<Function>): boolean {
    for (let componentClass of componentClasses) {
      if (!this.components.has(componentClass)) {
        return false
      }
    }
    return true
  }

  public delete(componentClass: Function): void {
    this.components.delete(componentClass)
  }
}

// Systems view of an entity
class Aspect {
    public entity: Entity
    private components: ComponentContainer

    public setCC(cc: ComponentContainer) {
        this.components = cc
    }

    public get<T extends Component>(c: ComponentClass<T>): T {
        return this.components.get(c)
    }

    public has(...cs: Function[]): boolean {
        return this.components.hasAll(cs)
    }
}

class ECS {
  private entities = new Map<Entity, ComponentContainer>()
  private systems = new Map<System, Map<Entity, Aspect>>()

  // Bookkeeping
  private nextEntityId = 0
  private entitiesToDestroy = new Array<Entity>()

  public addEntity(): Entity {
    let entity = this.nextEntityId
    this.nextEntityId++
    this.entities.set(entity, new ComponentContainer())
    return entity
  }

  public removeEntity(entity: Entity): void {
    this.entitiesToDestroy.push(entity)
  }

  public addComponent(entity: Entity, component: Component): void {
    this.entities.get(entity)?.add(component)
    this.checkE(entity)
  }

  public getComponents(entity: Entity): ComponentContainer {
    return this.entities.get(entity) as ComponentContainer
  }

  public removeComponent(
    entity: Entity, componentClass: Function
  ): void {
    this.entities.get(entity)?.delete(componentClass)
    this.checkE(entity)
  }

  public addSystem(system: System): void {
    if (system.componentsRequired.size === 0) {
      console.warn("System not added: empty components list ", system)
      return
    }

    system.ecs = this

    this.systems.set(system, new Map())
    for (let entity of this.entities.keys()) {
      this.checkES(entity, system)
    }
  }

  public removeSystem(system: System): void {
    this.systems.delete(system)
  }

  public update(delta: number): void {
    for (let [system, entities] of this.systems.entries()) {
      system.update(entities)
    }

    while (this.entitiesToDestroy.length > 0) {
      this.destroyEntity(this.entitiesToDestroy.pop() as number)
    }
  }

  private destroyEntity(entity: Entity): void {
    this.entities.delete(entity)
    for (let [system, entities] of this.systems.entries()) {
        if (entities.has(entity)) {
            const aspect = entities.get(entity)
            entities.delete(entity)
            system.onRemove(aspect as Aspect)
        }
    }
  }

  private checkE(entity: Entity): void {
    for (let system of this.systems.keys()) {
      this.checkES(entity, system)
    }
  }
  
    private checkES(entity: Entity, system: System): void {
        const have = this.entities.get(entity)
        if (!have) return
        
        const need = system.componentsRequired
        const aspects = this.systems.get(system)
        
        if (have.hasAll(need)) {
            if (!aspects?.has(entity)) {
                const aspect = system.makeAspect()
                aspect.entity = entity
                aspect.setCC(have)
                aspects?.set(entity, aspect)
                system.onAdd(aspect)
            }
        } else {
            aspects?.delete(entity)
        }
    }
}

export {
    ECS,
    Aspect,
    Component,
    System,
    Entity
}