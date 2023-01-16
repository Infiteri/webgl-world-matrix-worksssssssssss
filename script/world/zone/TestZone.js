import { Zone } from "./Zone.js";
import * as core from "../../core.js";

export class TestZone extends Zone {
  Load() {
    this.testObject = new core.SimObject(0, "tst");
    this.mesh = new core.MeshComponent(
      "test",
      new core.Material({ textureSrc: "/crate.png" })
    );

    this.testObject.AddComponent(this.mesh);

    this.testObject.transform.position.x = 200;
    this.testObject.transform.position.y = 150;

    this.scene.AddObject(this.testObject);

    super.Load();
  }

  Update(time) {
    this.testObject.transform.rotation.z += 0.05;

    super.Update(0);
  }
}
