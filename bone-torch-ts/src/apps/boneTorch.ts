import '@/style.scss'

import { Viewport, Surface } from '@/render'
import { Engine } from '@/engine'
import { MainMenuScreen } from '@/screens'
import { Vector2D } from '@/utils'
import { AssetManager } from '@/modules/graphics/assets';


//TileSetManager.buildManifest('sewers',sewerTileset)
AssetManager.loadSpritesheet('src/data/sewers.sprites.json')

export abstract class App {
    public start() {}
}

export class BoneTorch extends App {

    public start() {
        const surface = new Surface(new Vector2D(800, 600))
        const viewport = new Viewport(surface.initialize())
        viewport.initialize()
        const engine = new Engine(viewport)
        engine.setScreen(new MainMenuScreen())
        engine.start()
    }
}
