import { Tile } from './modules/tiles/tile.base';

import './style.scss'

import { Viewport, Surface } from '@/render'
import { Engine } from '@/engine'
import { MainMenuScreen } from '@/screens'
import { Vector2D } from '@/utils'
import { TileSet } from './assetManager/tiles';
import { TileSetManager } from './modules/tiles/tile.tileset';
import { AssetManager } from './modules/graphics/assets';


const sewerTileset = {
  "tileset": {
      "meta": {
          "size": [16, 16],
          "spritesheet": "assets/images/dungeon_sewers_001.png"
      },
      "tiles": {
          "brick": {
              "passable": false,
              "sprite": "brick"
          }
      }
  },
  "spritesheet": {
      "meta": {
          "resource": "assets/images/dungeon_sewers_001.png",
          "tileset": {
              "size": [16,16]
          }
      },
      "atlas": {
          "brick": [0, 0, 16, 16],
          "floor_bare": [20, 0, 16, 16],
          "floor_wood": [40, 0, 16, 16],
          "doorway": [0, 20, 16, 16],
          "stairs": [20, 20, 16, 16]
      }
  }
}

//TileSetManager.buildManifest('sewers',sewerTileset)
AssetManager.loadSpritesheet('src/data/sewers.sprites.json')

function main() {
  const surface = new Surface(new Vector2D(800, 600))
  const viewport = new Viewport(surface.initialize())
  viewport.initialize()
  const engine = new Engine(viewport)
  engine.setScreen(new MainMenuScreen())
  engine.start()
}

window.onload = () => {
  main()
}