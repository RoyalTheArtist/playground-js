import { Screen, Surface } from "../graphics"
import { Blank_Tile, GameMap, Tile } from "../map"
import { BaseAppComponent } from "../app"
import { MapMaker } from "../mapmaker"
import { MouseHandler } from "../mouse"
import { TileSet } from "../assetManager/tiles"



export class MapView extends BaseAppComponent {
    _el: HTMLElement
    width: number
    height: number
    _screen: Screen | null = null
    mouse: MouseHandler
    activeTile: Tile | null = null
    constructor(parent: MapMaker, elem: string) {
        super(parent)
        this._el = document.querySelector(elem) as HTMLElement

        if (!this._el) {
            throw new Error('App not found')
        }

        this.width = this._el.clientWidth
        this.height = this._el.clientHeight

        this.mouse = new MouseHandler()
    }

    public init() {
        this._screen = new Screen()

        this.mouse?.init(this._screen.canvas)

        this._el.appendChild(this._screen.canvas)

        this._screen.setResolution(this.width, this.height);

        (this.parent as MapMaker).signals.on('changeTile', (tile: Tile) => {
            this.activeTile = tile
        })

        this.mouse.onMouseDown((state) => {
            if (!this.activeTile) return

            if (state.rightMouse) {
                (this.parent as MapMaker).map.setTile(this.mouse.lockedPos.x, this.mouse.lockedPos.y, { ...Blank_Tile})
            } else {
                (this.parent as MapMaker).map.setTile(this.mouse.lockedPos.x, this.mouse.lockedPos.y, this.activeTile)
            }
            
        }).onMouseMove((state) => {
            if (!this.mouse.pressed || !this.activeTile) return
            
            if (state.rightMouse) {
                (this.parent as MapMaker).map.setTile(this.mouse.lockedPos.x, this.mouse.lockedPos.y, { ...Blank_Tile})
                return
            }
            (this.parent as MapMaker).map.setTile(this.mouse.lockedPos.x, this.mouse.lockedPos.y, this.activeTile)
        })
    }

    public render() {
        if (!this._screen) return

        this._screen.clear()

        const grid = drawGrid((this.parent as MapMaker).map.width, (this.parent as MapMaker).map.height, 20, 20)
        this._screen.drawAlpha(grid, 0, 0, 1, 0.5)

        if ((this.parent as MapMaker).tileSet && (this.parent as MapMaker).tileSet.tileset) {
            const map = drawMap((this.parent as MapMaker).map, (this.parent as MapMaker).tileSet.tileset)
            this._screen.render(map, 0, 0)
        }

        drawMouse(this.mouse, this._screen)
    }

    public resize() {
        this.width = this._el.clientWidth
        this.height = this._el.clientHeight
        this._screen?.setResolution(this.width, this.height);
    }
}

function drawMouse(mouse: MouseHandler, screen: Screen) {
    if (!mouse.available) return
    
    const coords = mouse.lockedPos

    screen.context.strokeStyle = 'red'
    screen.context.strokeRect(coords.x * 20, coords.y * 20, 20, 20)
}

function drawGrid(width: number, height: number, tileWidth: number, tileHeight: number): HTMLCanvasElement {
    const surface = new Surface(width * tileWidth, height * tileHeight)
    const ctx = surface.context
    ctx.strokeStyle = 'rgba(255,255,255)'
        
    for (let x = 0; x <= width * tileWidth; x += tileWidth) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height * tileHeight)
        ctx.stroke()
    }

    for (let y = 0; y <= tileHeight * height; y += tileHeight) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width * tileWidth, y)
        ctx.stroke()
    }

    return surface.canvas
}

function drawMap(map: GameMap, tileSet: TileSet): HTMLCanvasElement {
    const TILE_HEIGHT = tileSet.tileHeight
    const TILE_WIDTH = tileSet.tileWidth
  
    const surface = new Surface(map.width * TILE_WIDTH, map.height * TILE_HEIGHT)

    map.tiles.forEach((tile, index) => {
        if (!tile.sprite || tile.sprite === "blank") return
        
        const tileImage = tileSet.getTileImage(tile.sprite)
        if(!tileImage) return
      const x = (index % map.width) * TILE_WIDTH
      const y = Math.floor(index / map.width) * TILE_HEIGHT
        
      
      surface.draw(tileImage, x, y)
    })

    return surface.canvas
  }