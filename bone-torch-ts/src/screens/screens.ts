import { Entity } from "../ecs"
import { IRender, IUpdate } from "../engine"
import { Surface } from "../graphics"
import { createMap, drawMap, GameMap } from "../maps/map"


abstract class InputHandler {

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
  
  
const mapData = {
    tileAtas: [
        [0, FLOOR_TILE],
        [1, WALL_TILE],
    ]
}



export class GameScreen extends BaseScreen {
    private _map: GameMap
    private _entities: Set<Entity> = new Set()

    constructor() {
        super()
        this._map = createMap(mapDataOne, 10, 10)
        this._map.process()
    }

    public get map(): GameMap {
        return this._map
    }
    update(_delta: number) {
        console.log('game screen')
    }

    render(surface: Surface) {
        surface.clear()
        surface.drawRect(0, 0, 800, 600, 'black')

        drawMap(this.map, surface)
    }
}