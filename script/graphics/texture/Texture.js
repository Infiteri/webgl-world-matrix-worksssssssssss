import { gl } from "../../Engine.js";
import * as core from "../../core.js";

const LEVEL = 0;
const BORDER = 0;
const TEMP_IMAGE_DATA = new Uint8Array([0, 0, 0, 0]);

export class Texture extends core.IMessageHandler {
  /**
   * @param {String} name
   * @param {number} width
   * @param {number} height
   */

  constructor(name, width = 1, height = 1) {
    super();

    this.name = name;
    this.width = width;
    this.height = height;

    this.handle = gl.createTexture();

    this.isLoaded = false;

    core.Message.Subscribe(
      core.messages.ASSET_LOADED_MESSAGE + this.name,
      this
    );

    this.Bind();

    gl.texImage2D(
      gl.TEXTURE_2D,
      LEVEL,
      gl.RGBA,
      1,
      1,
      BORDER,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      TEMP_IMAGE_DATA
    );

    const asset = core.AssetManager.GetAsset(this.name);
    if (asset !== undefined) {
      this.LoadTextureFromAsset(asset);
    }
  }

  /**
   * @param {core.ImageAsset} asset
   */
  LoadTextureFromAsset(asset) {
    this.width = asset.width;
    this.height = asset.height;

    this.Bind();

    gl.texImage2D(
      gl.TEXTURE_2D,
      LEVEL,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      asset.data
    );

    if (this.IsPowerOf2()) gl.generateMipmap(gl.TEXTURE_2D);
    else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    this.isLoaded = true;
  }

  /**
   * @param {Number} textureUnit
   */
  ActivateAndBind(textureUnit = 0) {
    gl.activeTexture(gl.TEXTURE0 + textureUnit);

    this.Bind();
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.handle);
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, undefined);
  }

  Destroy() {
    gl.deleteTexture(this.handle);
  }

  /**
   * @param {core.Message} message
   */
  OnMessage(message) {
    if (message.code === core.messages.ASSET_LOADED_MESSAGE + this.name) {
      console.log("Asset loaded: " + this.name);
      this.LoadTextureFromAsset(message.context);
    }
  }

  IsPowerOf2() {
    return (
      this.IsValuePowerOf2(this.width) && this.IsValuePowerOf2(this.height)
    );
  }

  IsValuePowerOf2(value) {
    return (value & (value - 1)) == 0;
  }
}
