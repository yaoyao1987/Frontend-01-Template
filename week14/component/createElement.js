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
}

export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  get style() {
    return this.root.style;
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
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
