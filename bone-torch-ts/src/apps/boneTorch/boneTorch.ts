import '@/style.scss'

import { Viewport, Surface } from '@/render'
import { Engine } from '@/engine'
import { MainMenuScreen } from './screens'
import { Vector2D } from 'bt-engine/utils'
import { AssetManager } from '@/engine/assets';
import { App } from '../app.base'


//TileSetManager.buildManifest('sewers',sewerTileset)
AssetManager.baseUrl = 'src/apps/boneTorch/'
AssetManager.loadSpritesheet('data/sewers.sprites.json')
AssetManager.loadSpritesheetManifest('data/spritesheets.json')


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
