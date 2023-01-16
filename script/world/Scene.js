import * as core from "../core.js";

export class Scene {
  constructor() {
    this.root = new core.SimObject(0, "__ROOT__", this);
  }

  /**
   * Add Object to the root
   * @param {core.SimObject} object - Should be of type SimObject
   */
  AddObject(object) {
    this.root.AddChild(object);
  }

  GetObjectByName(name) {
    return this.root.GetObjectByName(name);
  }

  /**
   * Loads root objects
   */
  Load() {
    this.root.Load();
  }

  /**
   * Updates the root
   * @param {Number} time
   */
  Update(time) {
    this.root.Update(time);
  }

  /**
   * Renders root objects
   */
  Render(camera) {
    this.root.Render(camera);
  }
}
