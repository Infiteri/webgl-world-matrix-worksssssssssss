import * as core from "../core.js";

/**
 * Acts like a parent for other objects
 */
export class SimObject {
  /**
   * Should all be unique
   *
   * @param {Number} id
   * @param {String} name
   * @param {core.Scene} scene
   */
  constructor(id, name, scene) {
    this.id = id;
    this.name = name;
    this.scene = scene;
    this.components = [];

    //Extra stuff
    this.children = [];
    this.isLoaded = false;
    this.parent;

    //Data
    this.transform = new core.Transform();
    this.localMatrix = core.Matrix4x4.Identity();
    this.worldMatrix = core.Matrix4x4.Identity();
  }

  AddComponent(component) {
    this.components.push(component);
    component.SetOwner(this);
  }

  /**
   * Add children to the children array
   * @param {SimObject} child Is of type SimObject
   */
  AddChild(child) {
    //Set the parent to this
    child.parent = this;
    this.children.push(child);

    //Callback
    child.OnAdded(this.scene);
  }

  /**
   * Removes the children
   * @param {SimObject} child To remove
   */
  RemoveChild(child) {
    const index = this.children.indexOf(child);

    //It exists
    if (index !== -1) {
      child.parent = undefined;
      this.children.splice(index, 1); //Remove from array
    }
  }

  /**
   * Do I really need to say what it does
   *
   * @param {String} name
   */
  GetObjectByName(name) {
    //If the parent name is the searched name return the parent
    if (this.name === name) return this;

    //Give the element from array
    for (const child of this.children) {
      const result = child.GetObjectByName(name);

      if (result) return this;
    }

    //No SimObject
    return undefined;
  }

  /**
   * Loads
   */
  Load() {
    this.isLoaded = true;

    for (const c of this.components) {
      c.Load();
    }

    //Load all the children
    for (const child of this.children) {
      child.Load();
    }
  }

  /**
   * Updates
   */
  Update(time) {
    this.localMatrix = this.transform.GetTransformationMatrix();
    this.UpdateWorldMatrix(
      this.parent !== undefined ? this.parent.worldMatrix : undefined
    );

    for (const c of this.components) {
      c.Update(time);
    }

    //Update all the children
    for (const child of this.children) {
      child.Update(time);
    }
  }

  /**
   * Renders
   */
  Render(camera) {
    for (const c of this.components) {
      c.Render(camera);
    }

    //Render all the children
    for (const child of this.children) {
      child.Render(camera);
    }
  }

  /**
   * @param {core.Scene} scene
   */
  OnAdded(scene) {
    this.scene = scene;
  }

  /**
   * Updates the world matrix
   */

  UpdateWorldMatrix(parentWorldMatrix) {
    if (parentWorldMatrix !== undefined) {
      this.worldMatrix = core.Matrix4x4.multiply(
        parentWorldMatrix,
        this.localMatrix
      );
    } else {
      this.worldMatrix.CopyFrom(this.localMatrix);
    }
  }
}
