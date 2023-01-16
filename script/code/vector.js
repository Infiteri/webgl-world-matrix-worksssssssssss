/**
 * Vector3 component.
 * Has a X, Y, Z
 */
export class Vector3 {
  /**
   * To zero by default
   *
   * @param {Number} x - X position || Defaults to 0 (zero)
   * @param {Number} y - Y position || Defaults to 0 (zero)
   * @param {Number} z - Z position || Defaults to 0 (zero)
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns a Vector3 component initialized at X, Y, Z to zero
   */
  static ZERO() {
    return new Vector3(0, 0, 0);
  }

  /**
   * Returns a Vector3 component initialized at X, Y, Z to one
   */
  static ONE() {
    return new Vector3(1, 1, 1);
  }

  /**
   * Sets the X, Y, Z to the vector passed in
   * @param {Vector3} vector - Vector to copy from
   */
  CopyFrom(vector) {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
  }

  /**
   * Returns a array of the data (X, Y, Z)
   */
  ToArray() {
    return [this.x, this.y, this.z];
  }

  /**
   * Returns a Float32Array of the data (X, Y, Z)
   */
  ToFloat32Array() {
    return new Float32Array(this.ToArray());
  }
}

export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  ToArray() {
    return [this.x, this.y];
  }

  ToFloat32Array() {
    return new Float32Array(this.ToArray());
  }
}
