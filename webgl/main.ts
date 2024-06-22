const vertexShaderSource = /*glsl*/ `
    #version 300 es

    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    in vec4 a_position;

    // all shaders have a main function
    void main() {
      // gl_Position is a special variable a vertex shader
      // is also known as the vertex position
      gl_Position = a_position;
    }
`

const fragmentShaderSource = /*glsl*/`
    #version 300 es

    // fragment shaders don't have a default precision so we need
    // to pick one. highp is a good default. It means "high precision"
    precision highp float;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      outColor = vec4(1.0, 0.0, 0.5, 1.0);
    }
`

function main() {
    const canvas = document.querySelector('#webgl2') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext

    if (!gl) {
        throw new Error('WebGL 2 not supported')
    }
    console.debug("WebGL >>>> Initialized")
}

window.onload = () => {
    main()
}