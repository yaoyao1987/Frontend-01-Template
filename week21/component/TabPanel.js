import { createElement, Wrapper, Text } from "./createElement.js";

export class TabPanel {
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
  select(i) {
    for (let view of this.childViews) {
      view.style.display = "none";
    }
    for (let view of this.titleViews) {
      view.classList.remove("selected");
    }
    this.childViews[i].style.display = "";
    this.titleViews[i].classList.add("selected");
  }
  render() {
    this.childViews = this.children.map((child) => (
      <div style="width:300px;min-height:300px;">{child}</div>
    ));
    this.titleViews = this.children.map((child, i) => (
      <span
        onClick={() => this.select(i)}
        style="background-color:lightgreen;width:300px;margin:0"
      >
        {child.getAttribute("title") || " "}
      </span>
    ));
    setTimeout(() => this.select(0), 16);
    return (
      <div class="panel" style="border solid 1px lightgreen;width:300px;">
        <h1 style="background-color:lightgreen;width:300px;margin:0">
          {this.titleViews}
        </h1>
        <div>{this.childViews}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
