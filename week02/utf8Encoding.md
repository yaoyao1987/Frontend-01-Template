# 写一个 UTF-8 Encoding 的函数

```javascript
function UTF8Encoding(str) {
  const code = encodeURIComponent(str);
  if (code.indexOf("%") > -1) {
    return code.split("%").join("");
  } else {
    return code
      .charCodeAt(0)
      .toString(16)
      .join("");
  }
}
```
