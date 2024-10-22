
import { BaseScreen } from "bt-engine"

import { Entity, System } from "@/engine/ecs"
import { InputManager } from "@/engine/input"

import { Actor, AI, ActionQueue, MoveAction, DrawEntitySystem } from "@/apps/boneTorch/modules/actors"
import { createMap, GameMap } from "@/apps/boneTorch/modules/map"
import { TileDrawSystem } from "@bt/modules/tiles"

import { GameInputHandler } from "../handlers"

import { Player, spawnPlayer } from "@/player"
import { Vector2D, Settings } from "@/utils"
import { RenderSystem } from "@/modules/graphics"


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


const tileDrawSystem = new TileDrawSystem()
const drawEntitySystem = new DrawEntitySystem()
const renderSystem = new RenderSystem()

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
    private _handler: GameInputHandler = new GameInputHandler()
    private _map: GameMap
    private _entities: Set<Entity> = new Set()
    private _activeActors: Set<Actor> = new Set()


    constructor() {
        super()
    }

    public initialize(): GameScreen {
        this._map = createMap(mapDataOne, 10, 10)

        const player = spawnPlayer(new Vector2D(5, 5))
        player.parent = this._map
        this._entities.add(player)
        this._activeActors.add(player)
        return this
    }

    public get map(): GameMap {
        return this._map
    }
    update(delta: number) {
        const inputs = InputManager.getInputs(Settings.keyboardMappings.gameScreen)
        this._handler.handleInput(inputs)
    
        const allEntities = new Set([...this._entities, ...this.map.tileManager.tiles])

        turnSystem.query(new Set(this._activeActors))
        tileDrawSystem.query(new Set(this.map.tileManager.tiles))
        drawEntitySystem.query(new Set(this._entities))
        renderSystem.query(allEntities)


        turnSystem.update()       
        tileDrawSystem.update()
        drawEntitySystem.update()
        renderSystem.update()

        this.map.update(delta) // not sure if I need this, uncertain as of 10/20/2024

        ActionQueue.processActions(delta)
        return this
    }
}