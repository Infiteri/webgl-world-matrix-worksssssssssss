//Extra bits of code that might be added

export let vsShader = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelMatrix;

    varying vec2 vTexCoord;

    void main() {
        gl_Position = uProjectionMatrix * uModelMatrix * aVertexPosition;
        vTexCoord = aTexCoord;
    }
`;

export let fsShader = `
    precision mediump float;

    uniform sampler2D uDiffuse;
    uniform vec4 uTint;

    varying vec2 vTexCoord;

    void main() {
        gl_FragColor = uTint * texture2D(uDiffuse, vTexCoord);
    }
`;
