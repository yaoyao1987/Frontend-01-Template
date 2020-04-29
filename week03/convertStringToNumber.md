# convertStringToNumber

- StringNumericLiteral :::

  - StrWhiteSpaceopt
  - StrWhiteSpaceopt StrNumericLiteral StrWhiteSpaceopt

- StrWhiteSpace :::

  - StrWhiteSpaceChar StrWhiteSpaceopt

- StrWhiteSpaceChar :::

  - WhiteSpace // U+0009 U+000B U+000C U+0020 U+00A0 U+FEFF
  - LineTerminator // U+000A U+000D U+2028 U+2029

- StrNumericLiteral :::

  - StrDecimalLiteral
  - BinaryIntegerLiteral
  - OctalIntegerLiteral
  - HexIntegerLiteral

- StrDecimalLiteral :::

  - StrUnsignedDecimalLiteral
  - \+ StrUnsignedDecimalLiteral
  - \- StrUnsignedDecimalLiteral

**input**: @params: { string } 输入需要转换的字符串, { radix } 转换的指定基数,默认 10 进制
**output**: return number

```javascript
/**
 * 字符串转成十进制， 十进制 = [符号][整数][.][小数][e][指数]
 *
 * @param {*} string 字符串
 * @param {*} radix 进制
 * @returns 数字
 */
function convertStringToDecimalNumber(string, radix) {
  if (isNaN(string)) return NaN;
  let number = 0;

  // 取整数部分
  number = string ^ 0; // 位运算转数字

  let sign = "+"; // 符号,默认加号

  // 是否有符号
  if (["-", "+"].includes(string[0])) {
    sign = string[0];
  }

  // 小数部分
  if (string.includes(".") && !(string.includes("e") || string.includes("E"))) {
    let decimalData = string.split(".")[1];
    let i = 0;
    let fraction = 1;
    while (i < decimalData.length) {
      fraction = fraction / radix;
      if (sign == "-") {
        number -= (decimalData[i] ^ 0) * fraction;
      } else {
        number += (decimalData[i] ^ 0) * fraction;
      }
      i++;
    }
  }

  return number;
}
/**
 * 字符串转成二进制、八进制、十六进制
 *
 * @param {*} string
 * @param {*} radix
 * @returns
 */
function convertStringToRadixNumber(string, radix) {
  // 转数字后的string
  string = (string ^ 0).toString(radix);
  let number = string ^ 0;
  return number;
}
/**
 * 字符串转数字
 *
 * @param {*} string
 * @param {number} [radix=10]
 * @returns
 */
function convertStringToNumber(string, radix = 10) {
  // 过滤WhiteSpace字符
  string = string.replace(/\u0009|\u000B|\u000C|\u0020|\u00A0|\uFEFF/g, "");
  // 过滤LineTerminator字符
  string = string.replace(/\u000A|\u000D|\u2028|\u2029/g, "");

  switch (radix) {
    case 2:
    case 8:
    case 16:
      return convertStringToRadixNumber(string, radix);
    default:
      return convertStringToDecimalNumber(string, radix);
  }
}
var a = convertStringToNumber("0o10", 2);
// var a = convertStringToNumber("\u0009\u0009\u0009");
console.log("a", a);
```
