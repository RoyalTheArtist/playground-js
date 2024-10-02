import './style.scss'
import { createMap, drawMap } from './maps'
import { Viewport, Surface } from './graphics'
import { Engine } from './engine/engine'
import { GameScreen, MainMenu } from './screens'


// 0 = floor
// 1 = wall
const mapDataOne = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

const mapDataTwo = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 1, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 0, 1, 0, 1, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

function main() {
  const gameSurface = new Surface(800, 600, "#game")
  const viewport = new Viewport(gameSurface)
  const engine = new Engine(viewport)
  engine.setScreen(new GameScreen())
  engine.start()
}

window.onload = () => {
  main()
}