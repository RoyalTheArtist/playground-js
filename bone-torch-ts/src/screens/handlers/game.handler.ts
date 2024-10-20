import { Action, MoveAction, NoAction } from "../../actors"
import { StandardGameInput } from "../../input"
import { Vector2D } from "../../utils"
import { InputHandler } from "./handler"

export class GameInputHandler extends InputHandler { 
    handleInput(input: StandardGameInput, delta: number): Action {
        if (input.axis.discrete.x !== 0 || input.axis.discrete.y !== 0) {
            return new MoveAction(new Vector2D(input.axis.discrete.x, input.axis.discrete.y))
        }

        if (input.actions.has("open_inventory") && input.actions.get("open_inventory") === "pressed") {
            console.log("open inventory")
        }

        return new NoAction()
    }   
}