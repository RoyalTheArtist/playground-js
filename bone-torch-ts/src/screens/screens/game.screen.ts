
import { Actor, AI } from "../../modules/actors"
import { Entity, System } from "../../ecs"
import { InputManager, ActionMapping } from "../../input"
import { createMap, GameMap, TileDrawSystem } from "../../maps"
import { Vector2D } from "../../utils"
import { GameInputHandler, InputHandler } from "../handlers"
import { BaseScreen } from "./base"
import { ActionQueue, MoveAction } from "../../modules/actors/actions"
import { Player, spawnPlayer } from "../../player"
import { Settings } from "../../utils/settings"

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

const tileDrawSystem = new TileDrawSystem()

class TurnSystem extends System {
    public componentsRequired = new Set([AI])
    public query(entities: Set<Entity>): void {
        for (const entity of entities) {
            if (entity.hasAll(this.componentsRequired)) {
                this.components.add(entity.getComponent(AI))
            }
        }
    }

    public update(): void {
        for (const currentTurn of this.components as Set<AI>) {
            const action = currentTurn.perform(currentTurn.parent)
            if (action instanceof MoveAction) {
                ActionQueue.addAction(currentTurn.parent as Actor, action, 175)
            }
        }
    }
}

const turnSystem = new TurnSystem()

export class GameScreen extends BaseScreen  {
    private _handler: InputHandler = new GameInputHandler()
    private _map: GameMap
    private _entities: Set<Entity> = new Set()
    private _player: Actor
    private _activeActors: Set<Actor> = new Set()


    constructor() {
        super()
        this._handler.parent = this
    }

    public initialize(): GameScreen {
        this._map = createMap(mapDataOne, 10, 10)

        this._player = spawnPlayer(new Vector2D(5, 5))
        this._player.parent = this._map
        this._entities.add(this._player)
        this._activeActors.add(this._player)
        return this
    }

    public get map(): GameMap {
        return this._map
    }
    update(delta: number) {
        const inputs = InputManager.getInputs(Settings.keyboardMappings.gameScreen)
        const result = this._handler.handleInput(inputs)
        
        if (result instanceof MoveAction) {
            Player.setNextTurn(result)
        }

        turnSystem.query(new Set(this._activeActors))
        tileDrawSystem.query(new Set(this.map.tiles))

        turnSystem.update()       
        tileDrawSystem.update()
        //this.map.update(delta) // not sure if I need this, uncertain as of 10/20/2024

        for (const entity of this._entities) {
             entity.update(delta)
        }       

        ActionQueue.processActions(delta)
        return this
    }
}