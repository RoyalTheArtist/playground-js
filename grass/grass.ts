/**
 * Generates a random number between min and max (inclusive).
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} - The randomly generated number.
 */
export function generateRandomNumber(min: number, max: number) {
    if (min > max) {
        throw new Error('Min value cannot be greater than max value');
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
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

    if (heightMap[2] !== null) {
        ctx.fillStyle = colorKeyCode[heightMap[2]]
        ctx.fillRect(0, 0, 1, 1)
    }
    return canvas
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

const grassMaker = new GrassCreator()

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

function drawGrassGrid(ctx: CanvasRenderingContext2D, width: number, height: number, tileSize: {width: number, height: number}) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (y === 0 || x === 0 || y === height - 1 || x === width -1) {
                const grassTile = createGrassTile(tileSize.width, tileSize.height)

                ctx.drawImage(grassTile, x * tileSize.width, y * tileSize.height, tileSize.width, tileSize.height)
            } else {
                const grassTile = createGrassTileLowDensity(tileSize.width, tileSize.height)

                ctx.drawImage(grassTile, x * tileSize.width, y* tileSize.height)
            }
        }
    }
}