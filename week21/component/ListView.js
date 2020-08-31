import { createElement, Wrapper, Text } from "./createElement.js";

export class ListView {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
    this[name] = value;
  }
  getAttribute(name) {
    return this[name];
  }
  appendChild(child) {
    this.children.push(child);
  }
  render() {
    let data = this.getAttribute("data");
    return (
      <div class="list-view" style="width:300px;">
        {data.map(this.children[0])}
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
