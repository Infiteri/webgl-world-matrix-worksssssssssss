import * as core from "../core.js";

export class MeshComponent extends core.BaseComponent {
  constructor(name, material) {
    super(name);
    this.mesh = new core.Mesh({ material });
  }

  Load() {
    this.mesh.Init();
  }

  Render(camera) {
    this.mesh.Draw(camera, this.owner.worldMatrix);
  }
}
