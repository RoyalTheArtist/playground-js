import { Actor } from "../../actors"
import { Entity } from "../../ecs"
import { KeyboardManager } from "../../input"
import { InputManager, ActionMapping } from "../../input"
import { createMap, GameMap } from "../../maps"
import { SurfaceLayer } from "../../render"
import { Color, Vector2D } from "../../utils"
import { GameInputHandler, InputHandler } from "../handlers"
import { BaseScreen } from "./base"
import { ActionQueue, MoveAction } from "../../actors/actions"

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

  const gameScreenMapping: ActionMapping = {
    w: ['move_up', 'inventory_scroll_up'],
    s: ['move_down', 'inventory_scroll_down'],
    a: ['move_left', 'inventory_scroll_left'],
    d: ['move_right', 'inventory_scroll_right'],
    i: ['open_inventory']
}


export class GameScreen extends BaseScreen  {
    private _handler: InputHandler = new GameInputHandler()
    private _map: GameMap
    private _entities: Set<Entity> = new Set()
    private _player: Actor

    constructor() {
        super()
        this._map = createMap(mapDataOne, 10, 10)
        this._map.initialize()
        this._map.process()

        this._player = new Actor(new Vector2D(5, 5))
        this._player.initialize()
        this._entities.add(this._player)

    }

    public get map(): GameMap {
        return this._map
    }
    update(delta: number) {
        const inputs = InputManager.getInputs(gameScreenMapping)
        const result = this._handler.handleInput(inputs, delta)

        SurfaceLayer.clear()
        SurfaceLayer.background.drawRect(0, 0, 800, 600, Color.fromString('black'))
        
        this.map.update(delta)

        if (result instanceof MoveAction) {
            ActionQueue.addAction(this._player, result, 175)
        }
        ActionQueue.processActions(delta)

        for (const entity of this._entities) {
            entity.update(delta)
        }       
    }

    render() {}
}