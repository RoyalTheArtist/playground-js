import { Action, MoveAction } from "@/modules/actors"
import { StandardGameInput } from "bt-engine/input"
import { Vector2D } from "@/utils"

import { InputHandler } from "bt-engine"

export class GameInputHandler extends InputHandler { 
    handleInput(input: StandardGameInput): Action | null {
        if (input.axis.discrete.x !== 0 || input.axis.discrete.y !== 0) {
            return new MoveAction(new Vector2D(input.axis.discrete.x, input.axis.discrete.y))
        }

        if (input.actions.has("open_inventory") && input.actions.get("open_inventory") === "pressed") {
            console.log("open inventory")
        }

        return null
    }   
}