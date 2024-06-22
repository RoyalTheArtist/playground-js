import { useCurves } from "./coding-curves"

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


type GeneratorType = 'wave' | 'circle' | 'polygon' | 'spiral'

class GeneratorElement {
    el: HTMLElement
    constructor(elem: string) {
        
    }

    setup() {

    }
}


class GeneratorSelector {
    el: HTMLElement
    ctx: CanvasRenderingContext2D
    generators: Map<string, (ctx: CanvasRenderingContext2D, form?: FormData) => void> = new Map()
    constructor(elem: string, ctx: CanvasRenderingContext2D) {
        this.el = document.querySelector(elem) as HTMLElement
        this.ctx = ctx
        this.setup()
    }

    setup() {
        this.el.addEventListener('submit', (e) => {
            console.debug('submit', e)
            const name = (e.target as HTMLFormElement).id
            const generator = this.generators.get(name)
            const form = new FormData(e.target as HTMLFormElement)
            if (generator) {
                e.preventDefault()
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
                generator(this.ctx, form)
            }
        })
    }

    defineGenerator(name: string, callback: (ctx: CanvasRenderingContext2D, form?: FormData) => void) {
        this.generators.set(name, callback)
    }
}

function main() {
    //const windowScreen = grabWindowScreen('canvas', windowSize.width + 48, windowSize.height + 48, 4)
    const windowScreen = grabWindowScreen('canvas', 800, 500)
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    if (!canvas) {
        throw new Error('canvas not found')
    }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    //canvas.width = tileSize.width * grid.width + 6
    //canvas.height = tileSize.height * grid.height + 6
    canvas.width = 800
    canvas.height = 500


    const generators = new GeneratorSelector('#generators', ctx)
    generators.defineGenerator("generateWave", (ctx) => {
        windowScreen.ctx.clearRect(0, 0, windowScreen.canvas.width, windowScreen.canvas.height)
        generateWave(ctx)
        windowScreen.ctx.drawImage(canvas, 0, 0)
    })
    generators.defineGenerator("generateCircle", (ctx, form) => {
        windowScreen.ctx.clearRect(0, 0, windowScreen.canvas.width, windowScreen.canvas.height)
        let radius = 200
        if(form?.has('radius')) {
            radius = parseInt(form.get('radius') as string)
        }
        generateCircle(ctx, radius)
        windowScreen.ctx.drawImage(canvas, 0, 0)
    })
    generators.defineGenerator("generatePolygon", (ctx, form) => {
        windowScreen.ctx.clearRect(0, 0, windowScreen.canvas.width, windowScreen.canvas.height)
        let radius = 200
        let sides = 6
        let rotation = 0
        if (form?.has('radius')) {
            radius = parseInt(form.get('radius') as string)
        }
        if (form?.has('sides')) {
            sides = parseInt(form.get('sides') as string)
        }
        if (form?.has('rotation')) {
            rotation = parseInt(form.get('rotation') as string)
        }
        generatePolygon(ctx, radius, sides, rotation)
        windowScreen.ctx.drawImage(canvas, 0, 0)
    })
    generators.defineGenerator("generateSpiral", (ctx) => {
        windowScreen.ctx.clearRect(0, 0, windowScreen.canvas.width, windowScreen.canvas.height)
        generateSpiral(ctx, 200, 6)
        windowScreen.ctx.drawImage(canvas, 0, 0)
    })
}

function getWaveParameters() {
    // @ts-ignore
    const waveParameters = new FormData(document.forms.generateWave)
    const { amplitude, wavelength, resolution} = Object.fromEntries(waveParameters.entries())
    return {amplitude: amplitude.valueOf() as string, wavelength: wavelength.valueOf() as string, resolution: resolution.valueOf() as string}
}

function generateWave(ctx: CanvasRenderingContext2D) {
    const curves = useCurves()
    
    const {amplitude, wavelength, resolution} = getWaveParameters()
    const wave = curves.generateWave(800, parseInt(amplitude), parseInt(wavelength), parseInt(resolution))
    curves.draw(ctx, wave)
 
}

function generateCircle(ctx: CanvasRenderingContext2D, radius: number) {
    const curves = useCurves()

    curves.drawCircle(ctx,  radius)

}

function generatePolygon(ctx: CanvasRenderingContext2D, radius: number, sides: number, rotation: number = 2) {
    const curves = useCurves()  

    curves.drawPolygon(ctx, radius, sides, rotation)

}

window.onload = () => {

    main()
}

function generateSpiral(ctx: CanvasRenderingContext2D, arg1: number, arg2: number) {
    const curves = useCurves()

    curves.drawSpiral(ctx, 200, 4 )
}

