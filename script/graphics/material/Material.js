import * as core from "../../core.js";
import { gl } from "../../Engine.js";

export class Material {
  constructor({ color = new core.Color(), textureSrc }) {
    this.color = color;
    this.texture = core.TextureManager.GetTexture(textureSrc);
  }

  Bind(shader) {
    const tintLocation = shader.GetUniformLocation("uTint");
    gl.uniform4fv(tintLocation, this.color.ToFloat32Array());
  }

  ActivateAndBind(unit = 0) {
    this.texture.ActivateAndBind(unit);
  }
}
