import { ECS } from "../engine/ecs"
import { Engine, Point, Vector2 } from "./engine"
import { Surface } from "./graphics"
import { OrbitScreen } from "./screens"

function main() {
    const engine = new Engine()

    engine.setScreen(new OrbitScreen())
    const surface = new Surface(1200, 500, "#anims")
    
    function gameLoop(timeStamp: number) {
        engine.update(timeStamp)
        surface.clear()
        engine.render(surface)
        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)
}

window.onload = () => {
    main()
}