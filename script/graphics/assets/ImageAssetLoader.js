import * as core from "../../core.js";

export class ImageAsset extends core.IAsset {
  /**
   * @param {String} name
   * @param {HTMLImageElement} data
   */
  constructor(name, data) {
    super(name, data);

    this.name = name;
    this.data = data;

    this.width = this.data.width;
    this.height = this.data.height;
  }
}

export class ImageAssetLoader extends core.IAssetLoader {
  supportedExtension = ["png", "gif", "jpg"];

  constructor() {
    super();
  }

  /**
   * Loads asset
   *
   * @param {String} name
   * @returns {core.IAsset}
   */
  LoadAsset(name) {
    //Create
    const image = new Image();

    //Send
    image.onload = this.OnImageLoaded.bind(this, name, image);

    //Add
    image.src = name; //Make sure it is the last thing it gets called
  }

  /**
   * Util
   *
   * @param {String} name
   * @param {HTMLImageElement} image
   */
  OnImageLoaded(name, image) {

    //Create
    const asset = new core.ImageAsset(name, image);
    core.AssetManager.OnAssetLoaded(asset);
  }
}
