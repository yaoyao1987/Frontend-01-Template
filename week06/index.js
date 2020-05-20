// function match(string) {
//   for (let c of string) {
//     if (c == "a") {
//       return true;
//     }
//   }
//   return false;
// }

// var a = match("I am groot");
// console.log("a", a);

// function match(string) {
//   let foundA = false;
//   for (let c of string) {
//     if (c == "a") {
//       foundA = true;
//     } else if (foundA && c == "b") {
//       return true;
//     } else {
//       foundA = false;
//     }
//   }
//   return false;
// }

// var ab = match("I abm groot");
// console.log("ab", ab);

// function match(string) {
//   let state = start;
//   for (let c of string) {
//     console.log("c", c);
//     state = state(c);
//   }
//   return state === end;
// }

// function start(c) {
//   if (c === "a") {
//     return foundA;
//   } else {
//     return start;
//   }
// }

// function end(c) {
//   return end;
// }

// function foundA(c) {
//   if (c === "b") {
//     return foundB;
//   } else {
//     return start(c);
//   }
// }

// function foundB(c) {
//   if (c === "c") {
//     return foundC;
//   } else {
//     return start(c);
//   }
// }

// function foundC(c) {
//   if (c === "d") {
//     return foundD;
//   } else {
//     return start(c);
//   }
// }

// function foundD(c) {
//   if (c === "e") {
//     return foundE;
//   } else {
//     return start(c);
//   }
// }

// function foundE(c) {
//   if (c === "f") {
//     return end;
//   } else {
//     return start(c);
//   }
// }

// console.log(match("aabcdef"));

// function match(string) {
//   let state = start;
//   for (let c of string) {
//     console.log("c", c);
//     state = state(c);
//   }
//   return state === end;
// }

// function start(c) {
//   if (c === "a") {
//     return foundA;
//   } else {
//     return start;
//   }
// }

// function end(c) {
//   return end;
// }

// function foundA(c) {
//   if (c === "b") {
//     return foundB;
//   } else {
//     return start(c);
//   }
// }

// function foundB(c) {
//   if (c === "c") {
//     return foundC;
//   } else {
//     return start(c);
//   }
// }

// function foundC(c) {
//   if (c === "a") {
//     return foundA2;
//   } else {
//     return start(c);
//   }
// }

// function foundA2(c) {
//   if (c === "b") {
//     return end;
//   } else {
//     return start(c);
//   }
// }

// function foundB2(c) {
//   if (c === "x") {
//     return end;
//   } else {
//     return foundB(c);
//   }
// }

// console.log(match("aabcabcabx"));


function match(string) {
  let state = start;
  for (let c of string) {
    console.log("c", c);
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === "a") {
    return foundA;
  } else {
    return start;
  }
}

function end(c) {
  return end;
}

function foundA(c) {
  if (c === "b") {
    return foundB;
  } else {
    return start(c);
  }
}

function foundB(c) {
  if (c === "a") {
    return foundA2;
  } else {
    return start(c);
  }
}

function foundA2(c) {
  if (c === "b") {
    return foundB2;
  } else {
    return start(c);
  }
}

function foundB2(c) {
  if (c === "a") {
    return foundA3;
  } else {
    return start(c);
  }
}

function foundA3(c) {
  if (c === "b") {
    return foundB3;
  } else {
    return start(c);
  }
}

function foundB3(c) {
  if (c === "x") {
    return end;
  } else {
    return foundB2(c);
  }
}

console.log(match("aabababx"));