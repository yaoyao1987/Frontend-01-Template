var mod = require("../src/parser.js");
let assert = require("assert");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

it("parse a single element", () => {
  let doc = mod.parseHTML("<div></div>");
  let div = doc.children[0];
  assert.equal(div.tagName, "div");
  assert.equal(div.children.length, 0);
  assert.equal(div.type, "element");
  assert.equal(div.attributes.length, 2);
});

it("parse a single element with text content", () => {
  let doc = mod.parseHTML("<div>Hello</div>");
  let text = doc.children[0].children[0];

  assert.equal(text.content, "Hello");
  assert.equal(text.type, "text");
});

it("tag match", () => {
  let doc = mod.parseHTML("<TAG>123</TAG>");
});

it("tag mismatch", () => {
  try {
    let doc = mod.parseHTML("<div></vid>");
  } catch (error) {
    console.log(error);
  }
});

it("text with <", () => {
  let doc = mod.parseHTML("<div>a < b</div>");
  let text = doc.children[0].children[0];
  assert.equal(text.content, "a < b");
  assert.equal(text.type, "text");
});

it("with property", () => {
  let doc = mod.parseHTML("<div id=a class='cls' data=\"abc\"></div>");
  let div = doc.children[0];

  let count = 0;

  let hasId = false;
  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }

    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }

    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("with property 2", () => {
  let doc = mod.parseHTML("<div id=a class='cls' data=\"abc\"></div>");
  let div = doc.children[0];

  let count = 0;

  let hasId = false;
  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }

    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }

    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("with property 3", () => {
  let doc = mod.parseHTML("<div id=a class='cls' data=\"abc\"/>");
  let div = doc.children[0];

  let count = 0;

  let hasId = false;
  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }

    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }

    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("with property 4", () => {
  let doc = mod.parseHTML(`<div id=a class='cls' data=\"abc\">
    <h3
      title= "title"
    />
    <span id=mm><span>
    <span id=nn/>
  </div>`);
  let div = doc.children[0];

  let count = 0;

  let hasId = false;
  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }

    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }

    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("with property 5", () => {
  let doc = mod.parseHTML(`<div id=a class='cls' data=\"abc\">
    <h3
      title= "title"
    />
    <span id=mm><span>
    <span id=nn/>
  </div>
  `);
  let div = doc.children[0];

  let count = 0;

  let hasId = false;
  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }

    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }

    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("script", () => {
  let content = `<div>abcd</div><span>x</span>/script><script<</</s</sc</scr</scri</scrip</script`;
  let doc = mod.parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];

  assert.equal(text.content, content);
  assert.equal(text.type, "text");
});

it("attribute with no value", () => {
  let doc = mod.parseHTML("<div class />");
});

it("attribute with no value", () => {
  let doc = mod.parseHTML("<div class id />");
});

it("attribute with no value", () => {
  let doc = mod.parseHTML("<div/>");
});
