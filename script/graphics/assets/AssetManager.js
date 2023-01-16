import * as core from "../../core.js";

/**
 * How a Asset might look like
 */
export class IAsset {
  /**
   * @param {String} name
   * @param {any} data
   */
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

/**
 * Loader
 */

export class IAssetLoader {
  supportedExtension = [];

  /**
   * @param {String} name
   */
  LoadAsset(name) {}
}

/**
 * Takes care of the assets / manages them
 * STATICw
 */
export class AssetManager {
  static loaders = [];
  static loadedAssets = {};

  static Init() {
    AssetManager.loaders.push(new core.ImageAssetLoader());
  }

  /**
   * @param {IAssetLoader} loader = Has supported extensions ('png', and stuff like that)
   * TODO: Make sure it doesn't push already existing loader
   */
  static RegisterLoader(loader) {
    AssetManager.loaders.push(loader);
  }

  /**
   * IDK Yet
   *
   * @param {core.IAsset} asset
   */
  static OnAssetLoaded(asset) {
    AssetManager.loadedAssets[asset.name] = asset;

    const messageString = core.messages.ASSET_LOADED_MESSAGE + asset.name;

    core.Message.Send(messageString, this, asset);
  }

  /**
   * @param {String} name
   */
  static LoadAsset(name) {
    //Gets something like 'png', 'gif' or 'jpg'
    const extension = name.split(".").pop().toLowerCase();

    for (const l of AssetManager.loaders) {
      if (l.supportedExtension.indexOf(extension) !== -1) {
        l.LoadAsset(name);
        return;
      }
    }
    // //Shit
    // console.warn(
    //   `Unable to load asset with extension: ${extension}. No loader associated with it`
    // );
  }

  /**
   * Checks if the image is loaded / sends response
   *
   * @param {String} name
   * @returns {boolean} True / False
   */
  static IsAssetLoaded(name) {
    return AssetManager.loadedAssets[name] !== undefined;
  }

  /**
   * Returns a IAsset if it exists, if not it automatically loads the asset
   *
   * @param {String} name
   * @returns {IAsset} IAsset
   */
  static GetAsset(name) {
    const asset = AssetManager.loadedAssets[name];

    //?: Give
    if (asset !== undefined) return asset;
    //?: Load
    else {
      // console.log("Unable to get asset:" + name);
      AssetManager.LoadAsset(name);
    }

    //Case
    return undefined;
  }
}
