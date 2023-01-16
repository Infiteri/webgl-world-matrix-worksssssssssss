import * as core from "../core.js";

/**
 * Simple class to keep the projection matrix
 */
export class Camera2D {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    this.z = -6;

    this.projection = core.Matrix4x4.orthoGraphic(
      0,
      canvas.width,
      canvas.height,
      0,
      100,
      -1.0
    );
  }
}
