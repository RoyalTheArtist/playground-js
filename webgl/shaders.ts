// VERTEX

const clipSpaceTriangleSource = /*glsl*/ `#version 300 es

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

const pixelCoordTriangleSource = /*glsl*/ `#version 300 es
    in vec2 a_position;

    uniform vec2 u_resolution;

    void main() {
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (OpenGL clip space)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`

export const imageTextureShader = /*glsl*/ `#version 300 es
    in vec2 a_position;
    in vec2 a_texCoord;

    uniform vec2 u_resolution;

    out vec2 v_texCoord;

    void main() {
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (OpenGL clip space)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        // pass the texCoord to the fragment shader
        // The GPU will interpolate this value between points.
        v_texCoord = a_texCoord;
    }
`

export const textureFragmentShader = /*glsl*/ `#version 300 es
    precision highp float;

    // our texture
    uniform sampler2D u_texture;

    // the texCoords passed in from the vertex shader.
    in vec2 v_texCoord;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      outColor = texture(u_texture, v_texCoord).bgra;
    }
`

export const blurryTextureFragmentShader = /*glsl*/ `#version 300 es
    precision highp float;

    // our texture
    uniform sampler2D u_texture;

    // the texCoords passed in from the vertex shader.
    in vec2 v_texCoord;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
      outColor = (
        texture(u_texture, v_texCoord) +
        texture(u_texture, v_texCoord + onePixel) +
        texture(u_texture, v_texCoord - onePixel)
      ) / 3.0;
    }
`

// FRAGMENT
const fragmentShaderSource = /*glsl*/`#version 300 es

    // fragment shaders don't have a default precision so we need
    // to pick one. highp is a good default. It means "high precision"
    precision highp float;

    uniform vec4 u_color;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      outColor = u_color;
    }
`
export const convolutionShader = /*glsl*/ `#version 300 es
    precision highp float;
    uniform sampler2D u_image;

    // the convolution kernel data
    uniform float u_kernel[9];
    uniform float u_kernelWeight;

    // the texCoords passed in from the vertex shader.
    in vec2 v_texCoord;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      vec2 onePixel = vec2(1) / vec2(textureSize(u_image, 0));

      vec4 colorSum = texture(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0]
       + texture(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1]
       + texture(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2]
       + texture(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3]
       + texture(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4]
       + texture(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[5]
       + texture(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6]
       + texture(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7]
       + texture(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[8];
      outColor = vec4((colorSum / u_kernelWeight).rgb, 1);
    }
`

export { clipSpaceTriangleSource, pixelCoordTriangleSource, fragmentShaderSource }