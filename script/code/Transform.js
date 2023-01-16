import * as core from "../core.js";

/**
 * Transform stuff:
 *
 * @this position: position - Vector3 ZERO
 * @this rotation: rotation - Vector3 ZERO
 * @this scale: scale - Vector3 ONE
 */
export class Transform {
  constructor() {
    this.position = core.Vector3.ZERO();
    this.rotation = core.Vector3.ZERO();
    this.scale = core.Vector3.ONE();
  }

  /**
   * Copies the transforms from a transform to the current one
   *
   * @param {Transform} transform - to copy from
   */
  CopyFrom(transform) {
    this.position.CopyFrom(transform.position);
    this.rotation.CopyFrom(transform.rotation);
    this.scale.CopyFrom(transform.scale);
  }

  /**
   * Returns the (translation * rotation) * scale in a Matrix4x4 format
   * @see core.Matrix4x4 for the format
   */
  GetTransformationMatrix() {
    const translation = core.Matrix4x4.translation(this.position);
    const rotation = core.Matrix4x4.RotationXYZ(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z
    );

    const scale = core.Matrix4x4.scale(this.scale);

    //?: T * R * E
    return core.Matrix4x4.multiply(
      core.Matrix4x4.multiply(translation, rotation),
      scale
    );
  }
}
