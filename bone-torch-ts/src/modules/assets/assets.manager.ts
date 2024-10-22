import { ITileSetManifest } from "@/modules/tiles/tile.tileset";
import { SpriteSheet } from "@/modules/graphics";

async function fetchJson(resource: string) { 
    try {
        const result = await fetch(resource)
        if (!result.ok) throw new Error('Resource not found')
        const data = await result.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export class AssetManager {
    private static spritesheets: Map<string, SpriteSheet> = new Map()
    public static _baseUrl = 'src/'

    public static async loadSpritesheet(resource: string) {
        const spriteJSON = await fetchJson(this.baseUrl + resource)
        if (!spriteJSON) throw new Error('Resource not found')
        
        const spritesheet = SpriteSheet.from(spriteJSON)
        this.spritesheets.set(resource, spritesheet)
        return spritesheet
    }

    public static async loadTilesetJSON(resource: string) {
        const tilesetJSON: ITileSetManifest = await fetchJson(resource)
        if (!tilesetJSON) throw new Error('Resource not found')

        const spritesheet = SpriteSheet.from(tilesetJSON.spritesheet)
        this.spritesheets.set(resource, spritesheet)
        return spritesheet
    }

    public static getSpriteSheet(resource: string) { 
        return this.spritesheets.get(resource)
    }

    public static get baseUrl() {
        return this._baseUrl
    }

    public static set baseUrl(url: string) {
        this._baseUrl = url
    }
}