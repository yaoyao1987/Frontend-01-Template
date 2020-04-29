# 每周总结可以写在这里

## 作业

### JavaScript | 表达式，类型准换

#### [convertStringToNumber](./convertStringToNumber.md)

#### [convertNumberToString](./convertNumberToString.md)

### JavaScript | 语句，对象

根据课上老师的示范，找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。

- Bound Function Exotic Objects

  - Internal Slots
    - [[BoundTargetFunction]]
    - [[BoundThis]]
    - [[BoundArguments]]
  - methods
    - [[Call]](thisArgument, argumentsList)
    - [[Construct]](argumentsList, newTarget)
    - BoundFunctionCreate(targetFunction, boundThis, boundArgs)

- Array Exotic Objects

  - property
    - length
  - methods
    - [[DefineOwnProperty]](P, Desc)
    - ArrayCreate(length [, proto])
    - ArraySpeciesCreate(originalArray, length)
    - ArraySetLength(A, Desc)

- String Exotic Objects

  - property
    - length
  - internal slot
    - [[StringData]]
  - methods
    - [[GetOwnProperty]](P)
    - [[DefineOwnProperty]](P, Desc)
    - [[OwnPropertyKeys]]()
    - StringCreate(value, prototype)
    - StringGetOwnProperty(S, P)

- Arguments Exotic Objects

  - internal slot
    - [[ParameterMap]]
  - methods
    - [[GetOwnProperty]](P)
    - [[DefineOwnProperty]](P, Desc)
    - [[Get]](P, Receiver)
    - [[Set]](P, V, Receiver)
    - [[Delete]](P)
    - CreateUnmappedArgumentsObject(argumentsList)
    - CreateMappedArgumentsObject(func, formals, argumentsList, env)
    - MakeArgGetter(name, env)
    - MakeArgSetter(name, env)

- Integer-Indexed Exotic Objects

  - internal slot
    - [[ViewedArrayBuffer]]
    - [[ArrayLength]]
    - [[ByteOffset]]
    - [[TypedArrayName]]
  - methods
    - [[GetOwnProperty]](P)
    - [[HasProperty]](P)
    - [[DefineOwnProperty]](P, Desc)
    - [[Get]](P, Receiver)
    - [[Set]](P, V, Receiver)
    - [[OwnPropertyKeys]]()
    - IntegerIndexedObjectCreate(prototype, internalSlotsList)
    - IntegerIndexedElementGet(O, index)
    - IntegerIndexedElementSet(O, index, value)

- Module Namespace Exotic Objects

  - internal slot
    - [[Module]]
    - [[Exports]]
    - [[Prototype]]
  - methods
    - [[SetPrototypeOf]](V)
    - [[IsExtensible]]()
    - [[PreventExtensions]]()
    - [[GetOwnProperty]](P)
    - [[DefineOwnProperty]](P, Desc)
    - [[HasProperty]](P)
    - [[Get]](P, Receiver)
    - [[Set]](P, V, Receiver)
    - [[Delete]](P)
    - [[OwnPropertyKeys]]()
    - ModuleNamespaceCreate(module, exports)

- Immutable Prototype Exotic Objects
  - methods
    - [[SetPrototypeOf]](V)
    - SetImmutablePrototype(O, V)
