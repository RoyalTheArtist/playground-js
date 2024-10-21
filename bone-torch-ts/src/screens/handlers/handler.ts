import { Action} from "../../modules/actors"
import { StandardGameInput } from "../../engine/input"
import { BaseScreen } from "../screens"


export abstract class InputHandler {
    abstract handleInput(input: StandardGameInput): Action | null
}



