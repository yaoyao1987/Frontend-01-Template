# convertNumberToString

NumberToString：

1. If m is NaN, return the String "NaN".
2. If m is +0 or -0, return the String "0".
3. If m is less than zero, return the string-concatenation of "-" and ! NumberToString(-m).
4. If m is +∞, return the String "Infinity".

**input**: @params: { number } 输入需要转换的 number, { radix } 转换的指定基数
**output**: return string

```javascript
/**
 * 数字转字符串
 *
 * @param {*} number
 * @param {number} [radix=10]
 * @returns
 */
function convertNumberToString(number, radix = 10) {
  if (isNaN(number)) return "NaN";
  if (number == "+0" || number == "-0") return 0;

  const sign = number < 0 ? "-" : "";
  number = parseFloat(number);
  let integer = Math.floor(number);
  let decimalData = String.prototype.split.call(number, ".")[1]; // 取小数部分
  let string = "";

  // 整数部分
  while (Math.abs(integer) > 0) {
    string = String(integer % radix) + string;
    integer = Math.floor(integer / radix);
  }

  // 小数部分
  if (decimalData) {
    string += ".";
    while (Math.abs(decimalData > 0)) {
      string = string + String(decimalData % radix);
      decimalData = Math.floor(decimalData / radix);
    }
  }
  return sign + string;
}
var b = convertNumberToString(17.222, 2);
```
