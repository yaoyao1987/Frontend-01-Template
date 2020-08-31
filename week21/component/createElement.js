import { enableGesture } from "./gesture";

export function createElement(Cls, attributes, ...children) {
  let o;
  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {},
    });
  }

  for (const name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  let visit = (children) => {
    for (let child of children) {
      if (typeof child === "object" && child instanceof Array) {
        visit(child);
        continue;
      }
      if (typeof child === "string") {
        child = new Text(child);
      }
      o.appendChild(child);
    }
  };

  visit(children);
  return o;
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
  getAttribute(name) {
    return;
  }
}

export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  get style() {
    return this.root.style;
  }

  get classList() {
    return this.root.classList;
  }

  set innerText(text) {
    return (this.root.innerText = text);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, (c) => c.toLowerCase());
      this.addEventListener(eventName, value);
    }
    if (name === "enableGesture") {
      enableGesture(this.root);
    }
  }

  getAttribute(name) {
    return this.root.getAttribute(name);
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    if (!this.children.length) return;
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}
