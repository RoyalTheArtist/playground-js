import { BoneTorch } from "./apps"
function main() {
    const game = new BoneTorch()

    game.start()
}

window.onload = () => {
  main()
}