import { Action} from "../../modules/actors"
import { StandardGameInput } from "../../input"
import { BaseScreen } from "../screens"


export abstract class InputHandler {
    public parent: BaseScreen
    abstract handleInput(input: StandardGameInput): Action | null
}



