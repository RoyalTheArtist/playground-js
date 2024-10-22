import { BaseScreen } from "bt-engine/screen.base"
import { GameScreen } from "../gameScreen/game.screen"

import { InputManager } from "@/engine/input"
import { SurfaceLayer } from "@/render"
import { Color, Settings } from "@/utils"

export class MainMenuScreen extends BaseScreen {
    initialize() {
        
    }
    update(_delta: number) {
        const inputs = InputManager.getInputs(Settings.keyboardMappings.mainMenu)
        if (inputs.actions.has("new_game") && inputs.actions.get("new_game") === "pressed") {
            return new GameScreen().initialize()
        }
        
        SurfaceLayer.background.clear()
        SurfaceLayer.foreground.clear()

        const white = new Color(255, 255, 255)

        SurfaceLayer.background.drawText('Bone Torch', 400, 200, white, 32)
        SurfaceLayer.background.drawText('(N) New Game', 400, 300, white, 16)
        SurfaceLayer.background.drawText('(T) Test Chamber', 400, 325, white, 16)
        SurfaceLayer.background.drawText('(Q) Quit', 400, 350, white, 16)
        
        return this
    }
}
