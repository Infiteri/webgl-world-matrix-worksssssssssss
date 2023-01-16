import * as core from "../core.js";

//Utils
import { gl } from "../Engine.js";

export class Mesh {
  constructor({ width = 100, height = 100, material }) {
    this.material = material;

    this.width = width;
    this.height = height;

    this.buffer = new core.Buffer(5);
    this.shader = new core.Shader(
      "Shader",
      core.shaders.vsShader,
      core.shaders.fsShader
    );

    //Add Vertex Data
    this.vertexInfo = new core.AttributeInfo(0, 0, 3);
    this.buffer.AddAttribute(this.vertexInfo);

    this.texInfo = new core.AttributeInfo(1, 3, 2);
    this.buffer.AddAttribute(this.texInfo);

    this.data = [
      0,
      0,
      0,
      0,
      0, // End
      0,
      this.height,
      0,
      0,
      1.0, // End
      this.width,
      this.height,
      0,
      1.0,
      1.0, // End
      this.width,
      this.height,
      0,
      1.0,
      1.0, // End
      this.width,
      0,
      0,
      1.0,
      0, // End
      0,
      0,
      0,
      0,
      0, // End
    ];

    this.buffer.PushBackData(this.data);

    this.Init();
  }

  Destroy() {
    this.buffer.Delete();
    core.TextureManager.ReleaseTexture(this.textureName);
  }

  Init() {
    this.buffer.Upload();
  }

  /**
   * @param {Camera2D} camera
   * @param {core.Shader} shader
   */
  Draw(camera, model) {
    this.shader._use();
    this.Bind(camera, model);

    this.material.ActivateAndBind(0);

    const diffuseLocation = this.shader.GetUniformLocation("uDiffuse");
    gl.uniform1i(diffuseLocation, 0);

    this.buffer.Bind();
    this.buffer.Draw();
  }

  /**
   * @param {core.Camera2D} camera
   * @param {core.Matrix4x4} model
   */
  Bind(camera, model) {
    //Projection and model multiply
    const projectionLocation =
      this.shader.GetUniformLocation("uProjectionMatrix");

    gl.uniformMatrix4fv(
      projectionLocation,
      false,
      new Float32Array(camera.projection.data)
    );

    const modelLocation = this.shader.GetUniformLocation("uModelMatrix");
    gl.uniformMatrix4fv(modelLocation, false, model.ToFloat32Array());

    this.material.Bind(this.shader);
  }
}
