export class Group {
  constructor({ x = 0, y = 0, z = -5 }) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.children = [];
  }

  AddChild(child) {
    this.children.push(child);
  }

  Render(camera) {
    this.children.forEach(c => {
      c.SetPosition(this.x, this.y, this.z);

      c.Draw(camera);
    });
  }
}
