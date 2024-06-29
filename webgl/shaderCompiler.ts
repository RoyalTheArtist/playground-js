export class ShaderCompiler {
    /**
     * Creates a shader program with the given source code.
     *
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {number} type - The type of shader (e.g., gl.VERTEX_SHADER).
     * @param {string} source - The source code for the shader.
     * @return {WebGLShader | null} - The created shader program, or null if compilation failed.
     */
    static createShader(gl: WebGL2RenderingContext, type: number, source: string) {
        const shader = gl.createShader(type) as WebGLShader
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) {
            return shader
        }
        console.log(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
    }

    /**
     * Creates a shader program.
     *
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {WebGLShader} vertexShader - The vertex shader.
     * @param {WebGLShader} fragmentShader - The fragment shader.
     * @return {WebGLProgram | null} - The created shader program, or null if linking failed.
     */
    static createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl.createProgram() as WebGLProgram

        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        const success = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (success) {
            return program
        }
        console.log(gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
    }

}