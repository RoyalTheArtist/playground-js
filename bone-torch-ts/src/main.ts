import { BoneTorch } from "./apps/boneTorch"
function main() {
    const game = new BoneTorch()

    game.start()
}

window.onload = () => {
  main()
}