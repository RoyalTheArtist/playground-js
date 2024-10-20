import { Actor } from "../actors"
import { Entity } from "../ecs"
import { IRender, IUpdate } from "../engine"
import { Surface } from "../graphics"
import { createMap, drawMap, FLOOR_TILE, GameMap, WALL_TILE } from "../maps"
import { Vector2D } from "../utils"


abstract class InputHandler {

}

class MainMenuInputHandler extends InputHandler {
}


export abstract class BaseScreen implements IUpdate, IRender {
    abstract update(delta: number): void
    abstract render(surface: Surface): void
}

export class MainMenu extends BaseScreen {
    logged: boolean = false
    update(_delta: number) {
        if (!this.logged) {
            console.log('main menu')
            this.logged = true
        }
        
    }

    render(surface: Surface) {
        surface.clear()
        surface.drawRect(0, 0, 800, 600, 'black')
        surface.drawText('Bone Torch', 400, 200, 'white', 32)
        surface.drawText('(N) New Game', 400, 300, 'white', 16)
        surface.drawText('(T) Test Chamber', 400, 325, 'white', 16)
        surface.drawText('(Q) Quit', 400, 350, 'white', 16)
    }
}

// 0 = floor
// 1 = wall
const mapDataOne = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  
  const mapDataTwo = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 1, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]

export class GameScreen extends BaseScreen  {
    private _map: GameMap
    private _entities: Set<Entity> = new Set()

    constructor() {
        super()
        this._map = createMap(mapDataOne, 10, 10)
        this._map.initialize()
        this._map.process()

        const player = new Actor(new Vector2D(5, 5))
        player.initialize()
        this._entities.add(player)
    }

    public get map(): GameMap {
        return this._map
    }
    update(_delta: number) {
        this.map.update(_delta)

        for (const entity of this._entities) {
            entity.update(_delta)
        }
    }

    render() {}
}