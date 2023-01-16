/**
 * Component boilerplate
 * @abstract
 */
export class BaseComponent {
  constructor(name) {
    this.name = name;
  }

  SetOwner(owner) {
    this.owner = owner;
  }

  Load() {}

  Update(time) {}

  Render() {}
}
