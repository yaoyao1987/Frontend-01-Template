# 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

```javascript
```

- StringLiteral ::

  - " DoubleStringCharacters<sub>opt</sub> "
  - ' SingleStringCharacters<sub>opt</sub> '

- SingleStringCharacters ::

  - SingleStringCharacter SingleStringCharacters<sub>opt</sub>

```javascript
/**SourceCharacter but not one of ' or \ or LineTerminator
 *<LS> U+2028
 *<PS> U+2029
 *\ EscapeSequence
 *LineContinuation
 */
// ^[^'\\\n\r\u2028\u2029]$
const SingleStringReg = /['"\bfnrtv]/;
```

- DoubleStringCharacters ::

  - DoubleStringCharacter DoubleStringCharacters<sub>opt</sub>

- DoubleStringCharacter ::

  - SourceCharacter but not one of " or \ or LineTerminator
  - \<LS>
  - \<PS>
  - \ EscapeSequence
  - LineContinuation

- SingleStringCharacter ::

  - SourceCharacter but not one of ' or \ or LineTerminator
  - \<LS>
  - \<PS>
  - \ EscapeSequence
  - LineContinuation

- LineContinuation ::

  - \ LineTerminatorSequence

- EscapeSequence ::

  - CharacterEscapeSequence
  - 0 [lookahead ∉ DecimalDigit]
  - HexEscapeSequence
  - UnicodeEscapeSequence

- CharacterEscapeSequence ::

  - SingleEscapeCharacter
  - NonEscapeCharacter

- SingleEscapeCharacter :: one of

  - ' " \ b f n r t v

- NonEscapeCharacter ::

  - SourceCharacter but not one of EscapeCharacter
    or LineTerminator

- EscapeCharacter ::
  - SingleEscapeCharacter
  - DecimalDigit
  - x
  - u
- HexEscapeSequence ::

  - x HexDigit HexDigit

- UnicodeEscapeSequence ::

  - u Hex4Digits
  - u{ CodePoint }

- Hex4Digits ::
  - HexDigit HexDigit HexDigit HexDigit

```javascript
const DoubleStringReg = //
```
