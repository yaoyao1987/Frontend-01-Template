# 写一个正则表达式 匹配所有 Number 直接量

```javascript
// Number 直接量正则
const NumberReg = /(^[+|-]?[\d]+([\.][\d]+)?([Ee][+-]?[\d]+)?$)|(^0[bB][0-1]+$)|(^0[xX][0-9a-fA-F]+$)/;
```

Number 定义：

- NumericLiteral ::
  - DecimalLiteral
  - BinaryIntegerLiteral
  - OctalIntegerLiteral
  - HexIntegerLiteral

<span id="refer-anchor-decimal"></span>

- DecimalLiteral ::

  - DecimalIntegerLiteral . DecimalDigits<sub>opt</sub> ExponentPart<sub>opt</sub>
  - . DecimalDigits ExponentPart<sub>opt</sub>
  - DecimalIntegerLiteral ExponentPart<sub>opt</sub>

- DecimalIntegerLiteral ::

  - 0
  - NonZeroDigit DecimalDigits<sub>opt</sub>

- DecimalDigits ::

  - DecimalDigit
  - DecimalDigits DecimalDigit

- DecimalDigit :: one of

  - 0 1 2 3 4 5 6 7 8 9

- NonZeroDigit :: one of

  - 1 2 3 4 5 6 7 8 9

```javascript
// 十进制
const DecimalLiteral = /^[+|-]?[\d]+([\.][\d]+)?([Ee][+-]?[\d]+)?$/;
```

- BinaryIntegerLiteral ::

  - 0b BinaryDigits
  - 0B BinaryDigits

- BinaryDigits ::

  - BinaryDigit
  - BinaryDigits BinaryDigit

- BinaryDigit :: one of

  - 0 1

```javascript
// 二进制
const BinaryReg = /^0[bB][0-1]+$/;
```

- OctalIntegerLiteral ::

  - 0o OctalDigits
  - 0O OctalDigits

- OctalDigits ::

  - OctalDigit
  - OctalDigits OctalDigit

- OctalDigit :: one of

  - 0 1 2 3 4 5 6 7

```javascript
// 八进制
const OctalReg = /^0[oO][0-7]+$/;
```

- HexIntegerLiteral ::

  - 0x HexDigits
  - 0X HexDigits

- HexDigits ::

  - HexDigit
  - HexDigits HexDigit

- HexDigit :: one of
  - 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F

```javascript
// 十六进制
const HexIntegerReg = /^0[xX][0-9a-fA-F]+$/;
```
