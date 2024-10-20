import { Action} from "../../actors"
import { StandardGameInput } from "../../input"


export abstract class InputHandler {
    abstract handleInput(input: StandardGameInput, delta: number): Action 
}



