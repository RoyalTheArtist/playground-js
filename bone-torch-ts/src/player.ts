import { Action, Actor, AI, NoAction } from "./modules/actors"
import { Vector2D } from "./utils"

export class Player {
    static _nextTurn: Action | null = null

    static get nextTurn(): Action | null {
        return Player._nextTurn
    }
    static setNextTurn(action: Action | null) {
        Player._nextTurn = action
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