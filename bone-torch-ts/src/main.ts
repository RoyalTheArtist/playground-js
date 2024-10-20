import './style.scss'

import { Viewport, Surface, SurfaceLayer } from './render'
import { Engine } from './engine/engine'
import { GameScreen } from './screens'
import { Vector2D } from './utils'


function main() {
  const surface = new Surface(new Vector2D(800, 600))
  const viewport = new Viewport(surface.initialize())
  viewport.initialize()
  const engine = new Engine(viewport)
  engine.setScreen(new GameScreen())
  engine.start()
}

window.onload = () => {
  main()
}