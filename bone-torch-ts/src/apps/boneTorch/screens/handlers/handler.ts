import { Action} from "@/modules/actors"
import { StandardGameInput } from "bt-engine/input"

export abstract class InputHandler {
    abstract handleInput(input: StandardGameInput): Action | null
}



