import { BaseScreen } from "./base"

export class MainMenu extends BaseScreen {
    logged: boolean = false
    update(_delta: number) {
        if (!this.logged) {
            console.log('main menu')
            this.logged = true
        }
        
          //surface.clear()
        // surface.drawRect(0, 0, 800, 600, 'black')
        // surface.drawText('Bone Torch', 400, 200, 'white', 32)
        // surface.drawText('(N) New Game', 400, 300, 'white', 16)
        // surface.drawText('(T) Test Chamber', 400, 325, 'white', 16)
        // surface.drawText('(Q) Quit', 400, 350, 'white', 16)
    }
}
