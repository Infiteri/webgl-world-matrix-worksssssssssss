import Engine from "./script/Engine.js";
import * as core from "./script/core.js";

const engine = new Engine();

const zone = core.ZoneManager.CreateTestZone();
core.ZoneManager.ChangeZone(zone);

engine.Init();

function r() {
  requestAnimationFrame(r);
  engine.Render();
}

r();
