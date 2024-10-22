import { Action, Actor, AI, NoAction } from "./apps/boneTorch/modules/actors"
import { Vector2D } from "./utils"

export class Player {
    private static _nextTurn: Action | null = null
    private static _player: Actor | null = null

    static get player(): Actor | null { return Player._player }

    static get nextTurn(): Action | null {
        return Player._nextTurn
    }
    static setNextTurn(action: Action | null) {
        Player._nextTurn = action
    }

    static spawnPlayerAt(position: Vector2D) {
        if (Player._player) {
            return Player._player
        }
        Player._player = spawnPlayer(position)
        return Player._player
    }
}

export class PlayerAI extends AI {

    public initialize() { }
    public update(_delta: number) {
    }
    public perform(): Action {
        if (Player.nextTurn) {
            const action = Player.nextTurn
            Player.setNextTurn(null)
            return action
        }
        return new NoAction()
    }
}

export const spawnPlayer = (position: Vector2D) => {
    const player = new Actor(position)
    player.initialize()
    player.addComponent(new PlayerAI())
    return player
}