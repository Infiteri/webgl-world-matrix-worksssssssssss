import * as core from "../../core.js";

export class ZoneManager {
  static zones = {};
  static globalZoneID = -1;
  static activeZone;

  /**
   * Creates a zone, adds to the zones dictionary and returns the id of the zone
   *
   * @param {String} name - String
   * @param {String} description - String
   */
  static CreateZone(name, description) {
    //Increment
    ZoneManager.globalZoneID++;

    //Create
    const zone = new core.Zone(ZoneManager.globalZoneID, name, description);

    //Add
    ZoneManager.zones[ZoneManager.globalZoneID] = zone;

    //Return the id
    return ZoneManager.globalZoneID;
  }

  static ChangeZone(id) {
    const zone = ZoneManager.zones[id];

    if (ZoneManager.activeZone !== undefined) {
      ZoneManager.activeZone.OnDeactivated();
    }

    if (zone !== undefined) {
      ZoneManager.activeZone = zone;
      ZoneManager.activeZone.OnActivated();
      ZoneManager.activeZone.Load();
    }
  }

  static CreateTestZone() {
    ZoneManager.globalZoneID++;

    const zone = new core.TestZone(
      ZoneManager.globalZoneID,
      "TestZone",
      "Test Zone Ballers"
    );

    //Add
    ZoneManager.zones[ZoneManager.globalZoneID] = zone;

    //Return the id
    return ZoneManager.globalZoneID;
  }

  static Update(time) {
    if (ZoneManager.activeZone !== undefined) {
      ZoneManager.activeZone.Update(time);
    }
  }

  static Render(camera) {
    if (ZoneManager.activeZone !== undefined) {
      ZoneManager.activeZone.Render(camera);
    }
  }
}
