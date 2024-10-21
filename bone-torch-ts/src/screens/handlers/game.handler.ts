import { Action, MoveAction, NoAction } from "../../modules/actors"
import { StandardGameInput } from "../../input"
import { Vector2D } from "../../utils"
import { GameScreen } from "../screens"
import { InputHandler } from "./handler"

export class GameInputHandler extends InputHandler { 
    parent: GameScreen
    handleInput(input: StandardGameInput): Action | null {
        if (input.axis.discrete.x !== 0 || input.axis.discrete.y !== 0) {
            return new MoveAction(new Vector2D(input.axis.discrete.x, input.axis.discrete.y), this.parent.map)
        }

        if (input.actions.has("open_inventory") && input.actions.get("open_inventory") === "pressed") {
            console.log("open inventory")
        }

        return null
    }   
}