function createElement(Cls, attributes, ...children) {
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

  for (let child of children) {
    if (typeof child === "string") {
      child = new Text(child);
    }
    o.appendChild(child);
  }
  return o;
}

class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}
/////////////////////////////////////////////////////////////////
class MyComponent {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    // this.root.setAttribute(name, value);
    this.attributes.set(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  set title(value) {
    this.properties.set("title", value);
  }

  render() {
    return (
      <article>
        <h1>{this.properties.get("title")}</h1>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    );
  }

  mountTo(parent) {
    this.slot = <div></div>;

    // parent.appendChild(this.root);
    for (const child of this.children) {
      this.slot.appendChild(child);
      // child.mountTo(this.slot);
    }
    this.render().mountTo(parent);
  }
}

// let component = (
//   <div id='a' class='b' style='width:100px;height:100px;background-color: lightgreen;'>
//     <div>{1}</div>
//     <p></p>
//     <div></div>
//     <div></div>
//   </div>
// );
let component = (
  <MyComponent title="hello world">
    <div>{new Wrapper("span")}111</div>
  </MyComponent>
);

component.title = "new Title";
component.mountTo(document.body);
// let component = <Cls id='a' />;

// component.setAttribute('id', 'a');
