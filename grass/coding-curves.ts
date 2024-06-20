

function getSinPoints() {
    const points = [] as number[]

    for (let i = 0.0; i < 6.28; i += 0.1) {
        points.push(Math.sin(i))
    }

    return points
}

type Point = [number, number]

function generateWave(width: number, amplitude: number = 200, wavelength: number = 100, res: number = 1, fn: Function = Math.sin) {
    const points = [] as Array<Point>
    for (let x = 0; x < width; x+=res) {
        const y =  fn(x/wavelength * Math.PI * 2 ) * amplitude

        points.push([x, y])
    }

    return points
}


function generateCircle(x: number, y: number, radius: number = 250) {
    const points = [] as Array<Point>

    const res = 4 / radius
    for (let t = 0; t < Math.PI * 2; t += res) {
        const x_pos = x + radius * Math.cos(t)
        const y_pos = y + radius * Math.sin(t) 

        points.push([x_pos, y_pos])
    }

    return points
}

/* 
    When Radius = 200 and Sides = 6, need to substract -1 from Math.PI to equal appropriate size
    When Radius = 200 and Sides = 200, need to subtract -2.1 from Math.PI to equal appropriate size
*/


function generateSpiral(x: number, y: number, radius: number = 250, sides: number = 6, rotation: number = 0) {
    const res = Math.PI * 2 / ((radius) * sides)
    const points = [] as Array<Point>

    for (let i = 0; i < Math.PI - 2.14; i += res) {
        const angle =  i * radius
        const x_pos = x + (0+ angle) * Math.cos(angle) 
        const y_pos = y + (0 + angle) * Math.sin(angle)

        points.push([x_pos, y_pos])
    }

    return points
}

function generatePolygion(x: number, y: number, radius: number = 250, sides: number = 6, rotation: number = 0) {
    const res = Math.PI * 2 / sides
    const points = [] as Array<Point>

    

    for (let i = 0; i < Math.PI * 2; i+= res) {
        const x_pos = x + (radius) * Math.cos(i + rotation)
        const y_pos = y + (radius) * Math.sin(i + rotation)

        points.push([x_pos, y_pos])

        
    }

    return points
}

function useCurves() {
    const pointImage = document.createElement('canvas') as HTMLCanvasElement
    const pointCtx = pointImage.getContext('2d') as CanvasRenderingContext2D
    pointImage.width = 25
    pointImage.height = 25

    pointCtx.fillStyle = 'black'
    pointCtx.fillRect(0, 0, 1, 1)

    function drawCurves(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 5
        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(100, 100)
        ctx.lineTo(700, 700)
        ctx.stroke()
    }

    function rotateDraw(ctx: CanvasRenderingContext2D, angle: number) {
        ctx.save()
        ctx.translate(350, 50)
        ctx.rotate(angle)
        
        ctx.drawImage(pointImage, -12, -12)
        ctx.restore()
    }

    function draw(ctx: CanvasRenderingContext2D, wave: Point[]) {
        //const points = getSinPoints()

        const { height } = ctx.canvas
       

        ctx.strokeStyle = "blue"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, height - (250 + wave[0][1]))

        for (let x = 0; x < wave.length; x++) {
            const [xPos, y] = wave[x]
           
            const yPos = 250 + y
            ctx.lineTo(xPos, height - yPos)
            rotateDraw(ctx, yPos)
        }

        ctx.stroke()
        //drawCurves(ctx)
    }

    function drawPoints(ctx, points) {
        ctx.strokeStyle = "red"
        ctx.lineWidth = 1

        ctx.beginPath()
        for (let x = 0; x < points.length; x++) {
            const [xPos, y] = points[x]
            ctx.lineTo(xPos, y)
        }
        //ctx.closePath()
        ctx.stroke()
        
    }
 
    function drawCircle(ctx: CanvasRenderingContext2D, radius) {
        const points = generateCircle(400, 250, radius)

        drawPoints(ctx, points)
    }

    function drawPolygon(ctx: CanvasRenderingContext2D, radius: number, sides: number, rotation: number = 0) {
        const points = generatePolygion(400, 250, radius, sides, rotation)

        drawPoints(ctx, points)

    }

    function drawRotatingPolygon(ctx: CanvasRenderingContext2D, sides: number) {
        let angle = 0
        for (let size = 5; size < 250; size += 10) {
            drawPolygon(ctx, size, sides, angle)
        }
    }

    function drawSpiral(ctx: CanvasRenderingContext2D, radius: number, sides: number, rotation: number = 0) {
        const points = generateSpiral(400, 250, radius, sides, rotation)

        drawPoints(ctx, points)
    }

    return {
        draw,
        generateWave,
        drawCircle,
        drawPolygon,
        drawRotatingPolygon,
        drawSpiral
    }
}

export { useCurves }