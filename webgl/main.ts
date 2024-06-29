import {  blurryTextureFragmentShader, convolutionShader, fragmentShaderSource, imageTextureShader, pixelCoordTriangleSource, textureFragmentShader } from "./shaders"
import { ShaderCompiler } from "./shaderCompiler"

function randInt(range: number): number {
    return Math.floor(Math.random() * range)
}

function createRandRectangle(width: number = 300, height: number = 300) {
    const x1 = randInt(width)
    const x2 = x1 + randInt(width)

    const y1 = randInt(height)
    const y2 = y1 + randInt(height)

    return [
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
    ]
}

function createRectangleAt(x: number, y: number, width: number = 300, height: number = 300) {
    const x1 = x
    const x2 = x + width

    const y1 = y
    const y2 = y + height

    return [
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
    ]
}

function createTriangle() {
    return [
        0, -100,
        150, 125,
        -175, 100
    ]
}

function drawRectangles() {
    const canvas = document.querySelector('#webgl2') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext

    if (!gl) {
        throw new Error('WebGL 2 not supported')
    }
    console.debug("WebGL >>>> Initialized")

    const vertexShader = ShaderCompiler.createShader(gl, gl.VERTEX_SHADER, pixelCoordTriangleSource) as WebGLShader
    //const vertexShader = createShader(gl, gl.VERTEX_SHADER, clipSpaceTriangleSource) as WebGLShader
    const fragmentShader = ShaderCompiler.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader

    const program = ShaderCompiler.createProgram(gl, vertexShader, fragmentShader) as WebGLProgram

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

    const positionBuffer = gl.createBuffer() as WebGLBuffer

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const positions = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30
    ]

    const color = [1,0.75,0.5,1]

    // puts the position data into the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    // creates a vertex array object, a collection of attribute state
    const vao = gl.createVertexArray() as WebGLVertexArrayObject
    gl.bindVertexArray(vao)

    gl.enableVertexAttribArray(positionAttributeLocation)

    const size = 2 // 2 components per iteration
    const type = gl.FLOAT // the data is 32bit floats
    const normalize = false // don't normalize teh data
    const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0 // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    )

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // clears the canvas
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    // pass in the canvas resolution so we can convert from
    // pixels to clip space in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    gl.uniform4f(colorUniformLocation, color[0], color[1], color[2], color[3])

    gl.bindVertexArray(vao)

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const count = 6

    for (let i = 0; i < 51; i++) {
        const rect = createRandRectangle(gl.canvas.width, gl.canvas.height)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rect), gl.STATIC_DRAW)
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), Math.random())
        gl.drawArrays(primitiveType, offset2, count)
    }
}

function computeKernelWeight(kernel) {
    const weight = kernel.reduce(function (prev, cur) {
        return prev + cur;
    })
    return weight <= 0 ? 1 : weight
}

function renderImage(image) {
    const canvas = document.querySelector('#webgl2') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext

    if (!gl) {
        throw new Error('WebGL 2 not supported')
    }
    console.debug("WebGL >>>> Initialized")

    const vertexShader = ShaderCompiler.createShader(gl, gl.VERTEX_SHADER, imageTextureShader) as WebGLShader
    const fragmentShader = ShaderCompiler.createShader(gl, gl.FRAGMENT_SHADER, convolutionShader) as WebGLShader
    const program = ShaderCompiler.createProgram(gl, vertexShader, fragmentShader) as WebGLProgram

    // attributes
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord')

    // uniforms
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const imageLocation = gl.getUniformLocation(program, 'u_image')
    const kernelLocation = gl.getUniformLocation(program, 'u_kernel[0]')
    const kernelWeightLocation = gl.getUniformLocation(program, 'u_kernelWeight')


    // create a vertex array object, a collection of attribute state
    const vao = gl.createVertexArray() as WebGLVertexArrayObject
    gl.bindVertexArray(vao)
    
    const positionBuffer = gl.createBuffer() as WebGLBuffer

    gl.enableVertexAttribArray(positionAttributeLocation)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const size = 2 // 2 components per iteration
    const type = gl.FLOAT // the data is 32bit floats
    const normalize = false // don't normalize teh data
    const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0 // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    )

        // provide texture coords
    const texCoordBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(texCoordAttributeLocation)

    gl.vertexAttribPointer(
        texCoordAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    )

    const texture = gl.createTexture() as WebGLTexture

    // make unit 0 the active texture unit
    // (i.e, the unit all other texture commands will affect)
    gl.activeTexture(gl.TEXTURE0 + 0)

    // bind texture to 'texture unit '0' 2d bind point
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Set the parameters so we don't need mips and so we're not flitering and we don't repeat
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    // upload the image into the texture
    const mipLevel = 0 // the largest mip
    const internalFormat = gl.RGBA // format we want in the texture
    const srcFormat = gl.RGBA // format of data we are supplying
    const srcType = gl.UNSIGNED_BYTE // type of data we are supplying
    gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image)



    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // clears the canvas
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    // pass in the canvas resolution so we can convert from
    // pixels to clip space in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    // Tell the shader to get the texture from texture unit 0
    gl.uniform1i(imageLocation, 0)

    const edgeDetectKernel = [
        -1, -1, -1,
        -1, 8, -1,
        -1, -1, -1
    ]

    gl.uniform1fv(kernelLocation, edgeDetectKernel)
    gl.uniform1f(kernelWeightLocation, computeKernelWeight(edgeDetectKernel))

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const count = 6

    const rect = createRectangleAt(0, 0, image.width, image.height) //createRectangle(gl.canvas.width, gl.canvas.height)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rect), gl.STATIC_DRAW)

    gl.drawArrays(primitiveType, offset2, count)

}

function main() {
    new ShaderCompiler()

    const image = new Image()
    image.src = '/bcs.PNG'
    image.onload = () => renderImage(image)
    //drawRectangles()
}



window.onload = () => {
    main()
}