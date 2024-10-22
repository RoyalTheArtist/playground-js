
import { SpriteSheet } from "@/engine/graphics";

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

    public static get baseUrl() {
        return this._baseUrl
    }

    public static set baseUrl(url: string) {
        this._baseUrl = url
    }

    public static async loadSpritesheet(resource: string) {
        const spriteJSON = await fetchJson(this.baseUrl + resource)
        if (!spriteJSON) throw new Error('Resource not found')
        
        const spritesheet = SpriteSheet.from(spriteJSON)
        this.spritesheets.set(resource, spritesheet)
        return spritesheet
    }

    public static getSpriteSheet(resource: string) { 
        return this.spritesheets.get(resource)
    }


}