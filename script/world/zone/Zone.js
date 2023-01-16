import * as core from "../../core.js";

/**
 * The states that the zone can be in
 *
 * @constant UNINITIALIZED - On the Zone creation
 * @constant LOADING - While the Zone is loading
 * @constant UPDATING - While the Zone is updating
 */
export const ZoneStates = {
  /**
   * On the Zone creation
   */
  UNINITIALIZED: "UNINITIALIZED",

  /**
   * On the Zone load
   */
  LOADING: "LOADING",

  /**
   * On the Zone updating (used both for update and render)
   * Allows for the Zone to be updated
   */
  UPDATING: "UPDATING",
};

export class Zone {
  /**
   *
   * @param {Number} id
   * @param {String} name
   * @param {String} description
   */
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.scene = new core.Scene();

    this.state = ZoneStates.UNINITIALIZED;
  }

  /**
   * Does what the function name is to the scene
   */
  Update(time) {
    if (this.state === ZoneStates.UPDATING) {
      this.scene.Update(time);
    }
  }

  /**
   * Does what the function name is to the scene
   */
  Render(camera) {
    if (this.state === ZoneStates.UPDATING) {
      this.scene.Render(camera);
    }
  }

  /**
   * Does what the function name is to the scene
   */
  Load() {
    this.state = ZoneStates.Load;

    this.scene.Load();

    this.state = ZoneStates.UPDATING;
  }

  /**
   * Unloads of course
   */
  Unload() {}

  OnActivated() {}

  OnDeactivated() {}
}
