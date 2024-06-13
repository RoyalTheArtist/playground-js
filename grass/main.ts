

const tileSize = {
    width: 24,
    height: 24
}

const grid = {
    width: 4,
    height: 4
}


const windowSize = {
    width: tileSize.width * grid.width,
    height: tileSize.height * grid.height
}

const grassOne: [number, number, number | null] = [0, 1, 1]
const grassTwo: [number, number, number | null] = [0, 0, 1]
const grassThree: [number, number, number | null] = [0, 1, 2]

const colorKeyCode = [
    '#286a21',
    '#609034',
    '#a0b043'
]

function createGrassBlade(heightMap: [number, number, number | null]) {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 1
    canvas.height = 3

    ctx.fillStyle = colorKeyCode[heightMap[0]]
    ctx.fillRect(0, 2, 1, 1)

    ctx.fillStyle = colorKeyCode[heightMap[1]]
    ctx.fillRect(0, 1, 1, 1)

    if(heightMap[2] !== null) {
        ctx.fillStyle = colorKeyCode[heightMap[2]]  
        ctx.fillRect(0, 0, 1, 1)
    }
    return canvas

}

function grabWindowScreen(selector: string, width: number, height: number, zoom: number = 1) {
    const canvas = document.querySelector(selector) as HTMLCanvasElement
    if (!canvas) {
        throw new Error('canvas not found')
    }

    canvas.width = width * zoom
    canvas.height = height * zoom
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.imageSmoothingEnabled = false
    return {
        canvas,
        ctx
    }
}

class GrassCreator {
    grass: Map<[number, number, number | null], HTMLCanvasElement> = new Map()
    constructor() {

    }

    add(grass: [number, number, number | null]) {
        if (!this.grass.has(grass)) {
            const blade = createGrassBlade(grass)
            this.grass.set(grass, blade)
        }
    }

    getBlade(grass: [number, number, number | null]) {
        if (!this.grass.has(grass)) {
            const blade = createGrassBlade(grass)
            this.grass.set(grass, blade)
        }
        return this.grass.get(grass)
    }
}

export function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max-min+ 1) + min)
}

const grassMaker = new GrassCreator()

const GRASS_HIGH_DENSITY = 72

function createGrassTile(width: number, height: number) {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = width
    canvas.height = height 
    ctx.imageSmoothingEnabled = false
    
    let grass
    
    for (let x = 1; x < width - 1; x+=2) {
        for (let y = 1; y < height - 1; y+=4) {
            const grassWeight = generateRandomNumber(0, 100)
            if (grassWeight > 80) {
                grass = grassMaker.getBlade(grassThree)
            } else if (grassWeight > 45) {
                grass = grassMaker.getBlade(grassTwo)
            } else {
                grass = grassMaker.getBlade(grassOne)
            }

            const x_offset = generateRandomNumber(-1, 1)
            const y_offset = generateRandomNumber(-1, 1)
            ctx.drawImage(grass, x + x_offset, y + y_offset)
        }
    }

    return canvas
}

function createGrassTileLowDensity(width: number, height: number) {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = width
    canvas.height = height
    ctx.imageSmoothingEnabled = false
    
    let grass
    
    for (let x = 0; x < width; x+=5) {
        for (let y = 0; y < height; y+=6) {
            const grassWeight = generateRandomNumber(0, 100)
            if (grassWeight > 80) {
                grass = grassMaker.getBlade(grassThree)
            } else if (grassWeight > 45) {
                grass = grassMaker.getBlade(grassTwo)
            } else {
                grass = grassMaker.getBlade(grassOne)
            }

            const x_offset = generateRandomNumber(-1, 1)
            const y_offset = generateRandomNumber(-1, 1)
            ctx.drawImage(grass, x + x_offset, y + y_offset)
        }
    }

    return canvas
}

function main() {
    const windowScreen = grabWindowScreen('canvas', windowSize.width + 48, windowSize.height + 48, 4)

    const canvas = document.createElement('canvas') as HTMLCanvasElement
    if (!canvas) {
        throw new Error('canvas not found')
    }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = tileSize.width * grid.width + 6
    canvas.height = tileSize.height * grid.height + 6
    ctx.imageSmoothingEnabled = false


    ctx.fillStyle = '#100304'
    ctx.fillRect(3, 3, canvas.width - 6, canvas.height - 6)

    // const grassOneBlade = createGrassBlade(grassOne)
    // const grassTwoBlade = createGrassBlade(grassTwo)
    // const grassThreeBlade = createGrassBlade(grassThree)


    //ctx.drawImage(grassOneBlade, 0, 3)
    //ctx.drawImage(grassTwoBlade, 2, 4)
    //ctx.drawImage(grassThreeBlade, 4, 5)
    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            if (y === 0 || x === 0 || y === grid.height - 1 || x === grid.width -1) {
                const grassTile = createGrassTile(tileSize.width, tileSize.height)

                ctx.drawImage(grassTile, x * tileSize.width, y * tileSize.height, tileSize.width, tileSize.height)
            } else {
                const grassTile = createGrassTileLowDensity(tileSize.width, tileSize.height)

                ctx.drawImage(grassTile, x * tileSize.width, y* tileSize.height)
            }
        }
    }
   

    // const grassTile = createGrassTile(tileSize.width, tileSize.height)
    // const grassTile2 = createGrassTile(tileSize.width, tileSize.height)
    // const grassTile3 = createGrassTile(tileSize.width, tileSize.height)
    // const grassTile4 = createGrassTile(tileSize.width, tileSize.height)

    // ctx.drawImage(grassTile, 0, 0)
    // ctx.drawImage(grassTile2, 24, 0)
    // ctx.drawImage(grassTile3, 48, 0)
    // ctx.drawImage(grassTile4, 72, 0)
    windowScreen.ctx.drawImage(canvas, 0, 0, windowScreen.canvas.width, windowScreen.canvas.height)
}

main()