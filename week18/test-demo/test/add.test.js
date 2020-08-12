var add = require("../src/add.js");
// import {add} from '../src/add.js';
var assert = require("assert");

it("add.add(3, 4) should be 7", function() {
  assert.equal(add.add(3, 4), 7);
});
