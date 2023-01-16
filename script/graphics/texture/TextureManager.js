import * as core from "../../core.js";

class TextureReferenceNode {
  /**
   * @param {core.Texture} texture
   */
  constructor(texture) {
    this.texture = texture;
    this.referenceCount = 1;
  }
}

/**
 * Static class
 */
export class TextureManager {
  static textures = {};

  /**
   * @param {String} name
   */
  static GetTexture(name) {
    const textures = TextureManager.textures;

    if (textures[name] === undefined) {
      const texture = new core.Texture(name);
      textures[name] = new TextureReferenceNode(texture);
    } else {
      textures[name].referenceCount++;
    }

    return textures[name].texture;
  }

  /**
   * @param {String} name
   */
  static ReleaseTexture(name) {
    const textures = TextureManager.textures;

    if (textures[name] === undefined) {
      console.warn(`A texture named: ${name} doesn't, can't release`);
    } else {
      textures[name].referenceCount--;

      if (textures[name].referenceCount < 1) {
        textures[name].texture.Destroy();
        textures[name].texture = undefined;
        delete textures[name].texture;
      }
    }
  }
}
