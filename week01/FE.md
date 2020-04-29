# FE

## HTML

## CSS

### CSS规则和语法

- 基础规则

	- 语法

- @规则

	- @chartset

		- 指定样式表中使用的字符编码

			- 必须是样式表中的第一个元素，而前面不得有任何字符。
因为它不是一个嵌套语句，所以不能在 @规则条件组 中使用。
如果有多个 @charset @规则被声明，只有第一个会被使用，而且不能在HTML元素或HTML页面的字符集相关 <style> 元素内的样式属性内使用。

		- 在样式表中有多种方法去声明字符编码，浏览器会按照以下顺序尝试下边的方法（一旦找到就停止并得出结果）

			- 文件的开头的 Unicode byte-order 字符值
			- 由Content-Type：HTTP header 中的 charset 属性给出的值或用于提供样式表的协议中的等效值
			- CSS @规则  @charset
			- 假设文档是 UTF-8

	- @import

		- 从其他样式表导入样式规则，支持media list写法

			- @import url;
@import url list-of-media-queries;

	- @namespace

		- @namespace规则通常在处理包含多个namespaces的文档时才有用，比如HTML5里内联的SVG、MathML或者混合多个词汇表的XML

		- HTML5会自动给 svg 加命名空间

	- 嵌套@规则

	  嵌套@规则, 是嵌套语句的子集,不仅可以作为样式表里的一个语句，也可以用在条件规则组里

		- @media

			- 可用于根据一个或多个基于设备类型、具体特点和环境的媒体查询来应用样式
			- 即使查询返回false，附有媒体查询的样式表仍然会下载到<link> 标签。但是，直到其查询结果变为真，否则其内容将不适用

		- @page

			- 打印的时候会用到

		- @font-face

			- 定义一种字体，icon font技术的实现方式

		- @ keyframes

			- 描述动画的中间步骤

		- @supports

			- 检测是否支持CSS属性

		- @document

			- @document 规则可以指定一个或多个匹配函数。如果任何功能适用于给定的URL，则该规则将对该URL生效

### CSS选择器

- 选择器分类

	- 基本选择器

		- 通配符

			- *

		- 类型选择器

			- div, p , a ...

		- 属性选择器

			- p[class]{...}
			- p[class][href]{...}
			- p[class='name']
			- p[class~='name']

				- 选择p元素中有class类属性并且 class 中含有 name值的

			- p[class^='na']

				- 以'na'开头的

			- p[class$='me']

				- 以'me'结尾的

			- p[class*='name']

				- 任何包含'name'字串的

		- ID选择器

			- #id

		- 类选择器

			- .class

	- 组合选择器

		- 紧邻兄弟选择器（+）

			- img + p { ... }  /* 图片后面紧跟着的段落将被选中 */
			- 当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中。

		- 一般兄弟选择器（～）

			- '~' 操作符选择兄弟元素，也就是说，第二个节点在第一个节点后面的任意位置，并且这俩节点的父节点相同

		- 子选择器（ > ）

			- '>' 操作符选择第一个元素的直接子节点

		- 后代选择器（ '  ' ）

			- ' '  (空格) 操作符将选择第一个元素的子代节点

	- 伪类

		- :hover, :active ...

	- 伪元素

		- ::before, ::after ...

### CSS属性值的计算过程

- 1. 首先，为每个元素的每个属性收集应用于元素的所有声明值（declared values）。可能有零个或多个声明值应用于元素

	- 样式来源

		- 浏览器默认样式
Default (aka User-agent/Browser) style sheet

			- 浏览器自带的默认样式,各个浏览器或有不同

		- 用户自定义样式
User style sheet

			- 浏览器提供的可供用户自定义样式的功能

		- 网站作者定义样式
Author style sheets

			- 行内样式（In-line）

				- <div style="width:20px;"></div>

			- 内联样式（Internal/Embedded）

				- <style>...</style>

			- 外联样式（External）

				- <link rel="stylesheet" type="text/css" href="..." >

- 2. 级联计算（Cascading）产生级联值（ cascaded value）。每个元素的每个属性最多有一个级联值

	- 根据样式表来源级联排序规则

		- 1. 过渡声明（css transitions）
		- 2. 用户代理的 ! important 声明
		- 3. 用户自定义的 !important 声明
		- 4. 作者定义的 !important 声明
		- 5. 动画声明（css animation）
		- 6. 作者定义的普通声明
		- 7. 用户自定义的普通声明
		- 8. 用户代理定义的普通声明

	- 计算选择器的权重

		- 对于同一来源的CSS，要根据权重来确定某个元素的某个属性的值
		- 权重规则

			- 规则

				- 计算选择器中 ID选择器 的数量（= A）, 多个可以累加
				- 计算选择器中的 类选择器，属性选择器 和 伪类的数量（= B），多个可以累加
				- 计算选择器中 类型选择器 和 伪元素 的数量（= C），多个可以累加
				- 忽略通用选择器，权重为 0
				- 得出计算的权重结果 （A，B，C）
				- 依次比较权重A B C，当前层级得出最大者就不再继续比较下一级了

			- tips

				- 伪类中 :is() ，:not()，:has() 的权重会被 () 中包含的选择器的权重代替
				- : nth-child() 或者 :nth-last-child() 的权重是伪类（它自身）加上 （）中的选择器的权重（如果有的话）
				- 伪类 :where（）的权重被置为 0

- 3. 默认计算（Defaulting）产生指定值（specified value ）。每个元素每个属性只有一个指定值

	- 如果级联值存在则指定值等于级联值，否则根据CSS继承规则( Inheritance )从父元素中获取继承值( inherited value )

- 4. 依赖计算（Resolving value dependencies）产生计算值（computed value）。每个元素每个属性只有一个计算值

	- 一些值比如em，rem等，会在此过程中计算出结果

- 5. 格式化文档（Formatting the document）产生使用值（used value）

	- 取计算值并完成剩余计算，使其成为文档布局中使用的绝对理论值的结果。如果属性不应用于此元素，则该元素对该属性没有使用值。

- 6. 最终，使用值转换为实际值

	- 使用值原则上已准备好使用，但用户代理可能无法在给定的环境中使用该值。例如，用户代理可能只能呈现像素宽度为整数的边框，因此可能必须近似使用的宽度。此外，元素的字体大小可能需要根据字体的可用性或字体大小调整属性的值进行调整。实际值是在进行任何此类调整后的使用值。

### JS操作CSS

## JavaScript

分类原因：对于任何计算机语言来说，都是以 规定的文法，表达特定的语义，最终操作运行时 的过程

### JavaScript（JS）是函数优先的轻量级解释型或即时编译型编程语言。
虽然作为开发Web页面的脚本语言而出名，如今也在很多非浏览器环境得以运用。例如：Node.js
JavaScript 是一种基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。

- 函数优先的编程语言

	- 当一门编程语言的函数可以被当作变量一样用时，则称这门语言拥有头等函数。例如，在这门语言中，函数可以被当作参数传递给其他函数，可以作为另一个函数的返回值，还可以被赋值给一个变量

- 基于原型的编程

	- 基于原型的编程（英语：prototype-based programming）或称为原型程序设计、原型编程，是面向对象编程的子系统和一种方式。在原型编程中，类不是实时的，而且行为重用（通常认为继承自基于类的语言）是通过复制已经存在的原型对象的过程实现的。这个模型一般被认为是 classless、面向原型、或者是基于实例的编程。

-  ECMAScript 标准

	- JavaScript 的标准是 ECMAScript 。截至 2012 年，所有的现代浏览器都完整的支持  ECMAScript 5.1，旧版本的浏览器至少支持 ECMAScript 3 标准。2015年6月17日，ECMA国际组织发布了 ECMAScript 的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为 ECMAScript 6 或者 ES6。自此，ECMAScript 每年发布一次新标准

### 文法以及解析

- JS编译原理及过程

	- JS引擎

		- Rhino

			- 由Mozilla基金会管理，开放源代码，完全以Java编写。用于java与js互操作

		- SpiderMonkey

			- 第一款JavaScript引擎，早期用于Netscape Navigator，现时用于Mozilla Firefox

				-  SpiderMonkey（1.0-3.0）/ TraceMonkey（3.5-3.6）/ JaegerMonkey（4.0-）

		- V8

			- Chrome

		- JavaScriptCore

			- Safari

		- Chakra

			- IE / Edge

		- Carakan

			- Opera

	- 词法分析 -> 语法分析 -> 语法树 -> 执行

		- 词法分析是将字符流(char stream)转换为记号流(token stream)

			- var AST = "is Three";

				- NAME "AST"  
EQUALS  
NAME "is Tree"  
SEMICOLON

		- 语法分析成 AST (Abstract Syntax Tree)

			- 在线转换

		- 预编译，当JavaScript引擎解析脚本时，它会在预编译期对所有声明的变量和函数进行处理！并且是先预声明变量，再预定义函数！
		- 解释执行，在执行过程中，JavaScript 引擎是严格按着作用域机制（scope）来执行的，并且 JavaScript 的变量和函数作用域是在定义时决定的，而不是执行时决定的

- 词法

	- 词法规定了语言的最小语义单元：token，可以翻译成“标记”或者“词”。

		- 格式控制符

			- 用于控制对源码文本的解释，但是并不会显示出来

		- 空白符

			- 提升了源码的可读性，并将标记 (tokens) 区分开。这些符号通常不影响源码的功能。通常可以用压缩器来移除源码中的空白，减少数据传输量

		- 行终止符

			- 除了空白符之外，行终止符也可以提高源码的可读性。不同的是，行终止符可以影响 JavaScript 代码的执行。行终止符也会影响自动分号补全的执行。在正则表达式中，行终止符会被 \s 匹配。

		- 注释

			- 单行注释
			- 多行注释

		- 关键字

			- 标识符不能是关键字，比如说函数声明式和函数表达式

		- 直接量

			- 空直接量

				- null

			- 布尔直接量

				- true
				- false

			- 数值直接量

				- 十进制

					- 1234567890
					- 0777（// 转换为八进制 777，十进制 511）

						- 十进制数值直接量可以以 0 开头，但是如果 0 以后的最高位比 8 小，数值将会被认为是八进制而不会报错

				- 二进制

					- 二进制表示为开头是0后接大写或小写的B（0b或者0B）

						- var FLT_SIGNBIT  = 0b10000000000000000000000000000000; 
// 2147483648

					- 如果0b之后有除了0或1以外的数字，将会抛出SyntaxError：“Missing binary digits after 0b”

				- 八进制

					- 八进制表示为开头是0后接大写或小写的O（0o或0O）

				- 十六进制

					- 十六进制表示为开头是0后接大写或小写的X（0x或0X）

			- 对象直接量

				- var o = { a: "foo", b: "bar", c: 42 };

			- 数组直接量

				- [1954, 1974, 1990, 2014]

			- 字符串直接量

				- 'foo'
				- 十六进制转义序列

					- '\xA9' // "©"

				- Unicode 转义序列

					- Unicode 转义序列要求在\u之后至少有四个字符
					- '\u00A9' // "©"

				- Unicode 编码转义

					- '\u{2F804}'

			- 正则表达式直接量

				- /ab+c/g
				- 一个空的正则表达式直接量必须有一个空的非捕获分组以避免被当成是行注释符号

					- /(?:)/

			- 模板直接量

				- `string text`

			- 自动分号补全

- 语法

### 语义

### 运行时

- 数据结构

	- 类型

	  JavaScript 语言的每一个值都属于某一种数据类型。JS规定了7种语言类型，语言类型广泛用于变量、函数参数、表达式、函数返回值等场合。

		- 基本类型

		  原始类型，或者说基本类型，是一种既非对象也无方法的数据。
		  JS中一共定义了6种基本类型。
		  所有的基本类型的值都是不可改变的。

			- 原始值

				- undefined

				  undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。

					- 用全局属性 undefined(window.undefined) 来表示原始值undefined
					- 使用情况

						- 1. 变量只声明，并没有赋值，该变量为undefined
						- 2. 调用函数时，应传入的参数没有提供，该参数为undefined
						- 3. 函数没有返回值时， 默认返回undefined
						- 4. 对象的属性没有赋值时，默认为undefined
						- 5. void操作符会对给定的表达式立即求值，并返回undefined

					- tips

						- 有些规范要求用 void(0) 代替 undefined
这是为了避免对其无意的修改，因为JS的代码中 undefined 是一个变量，而不是一个关键字。
现代浏览器自ES6以后，undefined 成为了一个不能被配置和重写的属性。
writable：false
enumerable：false
configurable：false
						- typeof ( a ) === 'undefined'  // true
虽然 a 从未声明，但是 typeof 不会报错。
而 void ( a ) 或者直接比较 a === undefined
会抛出一个RenferenceError 错误。

				-  null

				  null表示"没有对象"，即该处不应该有值。

					- null 是字面量，同时也是JS的关键字。
					- 使用情况

						- DOM，它是独立于语言的，不属于ECMAScript规范的范围。因为它是一个外部API，试图获取一个不存在的元素返回一个null值，而不是undefined。
						- 原型链的终点
						- 主动的分配 null 值。可以借此清空引用，保证内存回收。

					- tips

						- null === undefined // false
但是
null == undefined // true
因为==会先进行类型转换
						- typeof null  // object
这是因为一个古老的错误导致的

				- Boolean

					- ture / false

				- String

					- 字符串类型用于表示文本数据。它是一组16位的无符号整数值的“元素”。以UTF16编码保存
					- 使用情况

						- 字符串字面量

							- 'a' === "a" 不区分双引号和单引号
							- unicode表示法

								- '\u20BB7'  // ₻7
只限于\u0000~\uFFFF之间
								- '\u{20BB7}' // 𠮷
ES6 增强了对Unicode的支持

						- 模板字面量

							- ` ${  } `

					- tips

						- 字符串的最大长度因受到下标限制，所以理论上是2^53-1。（即JS中可表达的最大安全整数）
然而 实际引擎不会允许分配如此大的空间

						- ES6为字符串添加了遍历器接口。String可以被for...of 循环遍历。

				- Number

				  根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(2^63 -1) 到 2^63 -1）。它并没有为整数给出一种特定的类型。除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。

					- 双精度 64 位二进制格式的值（-(2^63 -1) 到 2^63 -1）
					- 使用情况

						- ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
0b111110111 === 503 // true ; 0o767 === 503 // true ; 
						- NaN
						- +/- Infinity

					- tips

						- 浮点数比较问题
0.1 + 0.2 == 0.3 // false
应该用最小精度值比较
Math.abs( 0.3 - 0.1 - 0.2 ) <= Number.EPSILON // true

							- JavaScript 浮点数陷阱及解法

							- 推荐一个简易处理库

				- Symbol

					- 表示独一无二的值
					- 使用情况

						- ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。
						- 内置的 Symbol 值
除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

					- tips

						- 用 Symbol 函数生成 symbol，不能用 new
let s = Symbol ( '描述' ) ;
						- Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，
也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。
但是，它也不是私有属性，有一个Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。

			- 基本类型包装对象

				- 除了null , undefined 之外，其他的基本类型都有对应的包装对象，其 valueOf() 方法返回基本类型值
				- 自动装箱转换。
基本类型值上是没有方法和属性的，但是当基本类型值调用一个包装对象上才有的方法时，会自动转换为对应的包装对象，并执行相应的方法。
这就是为什么我们可以直接用字面量执行方法。

		- 合成类型

			- 对象（Object）

				- 宿主对象(host Objects)

					- 由JS宿主环境提供的对象，完全由宿主环境决定。最常见的为浏览器环境
					- 浏览器环境中全局对象是window

				- 内置对象(Built-in Objects)

					- 固有对象(Intrinsic Objects)

						- 随着JS运行时的创建而自动创建的对象实例，在任何代码运行前创建
						- JS语言固有对象列表

					- 原生对象(Native Objects)

						- 通过语言本身的内置构造器或特殊的语法创建的对象
						- JS内置构造器

							- 基本类型

								- Boolean
								- String
								- Number
								- Symbol
								- Object

							- 基础功能和数据结构

								- Array
								- Date
								- RegExp
								- Promise
								- Proxy
								- Map
								- WeakMap
								- Set
								- WeakSet
								- Function

							- 错误类型

								- Error
								- EvalError
								- RangeError
								- ReferenceError
								- SyntaxError
								- TypeError
								- URIError

							- 二进制操作

								- ArrayBuffer
								- SharedArrayBuffer
								- DataView

							- 带类型的数组

								- Float32Array
								- Float64Array
								- Int8Array
								- Int16Array
								- Int32Array
								- UInt8Array
								- UInt16Array
								- UInt32Array
								- UInt8ClampedArray

					- 普通对象(Ordinary Objects)

						- JS中所有的对象均来自Object, 所有对象从 Object.prototype 继承方法和属性

							- 构造函数（Object）的方法

							- 原型对象（Object.prototype）的属性和方法

						- 创建

							- 字面量 / 对象初始化器
							- Object.create()
							- new Object() / Object()
							- 类/class

								- ES6引入class关键字，不再用new和function来模拟类
								- 语法糖，依然是基于原型链的实现

						- 属性

							- 数据属性

								- value 属性的值
								- writable 决定属性是否能被赋值
								- enumerable 决定属性是否能被枚举 
								- configurable 决定属性是否可以被删除或者改变特征值

							- 访问器属性

								- get / set

							- 相关方法

								- Object.defineProperty 定义属性特征或改变访问器方法
								- Object. getOwnPropertyDescriptor 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性） 

						- 原型与原型链

							- Object.create / Object.setPrototypeOf 方法 改变一个对象的[[ prototype ]] 属性

		- 类型转换

			- 强制类型转换（显式转换）

				- Number（）

					- 原始类型值

						- 数值：转换后还是原来的值   Number(324) // 324

字符串：如果可以被解析为数值，则转换为相应的数值；Number('324') // 324

字符串：如果不可以被解析为数值，返回 NaN； Number('324abc') // NaN

空字符串转为0；Number('') // 0

布尔值：true 转成 1，false 转成 0；Number(true) // 1；Number(false) // 0

undefined：转成 NaN；Number(undefined) // NaN

null：转成0；Number(null) // 0
						- Number函数将字符串转为数值，要比parseInt函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。
						- Number() 和 parseInt() 都会自动过滤字符串的前后空格

					- Object

						- 简单规则

							- Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组

						- 具体转换规则

							- 第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。

第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。

第三步，如果toString方法返回的是对象，就报错。
							- 可以自定义对象的valueOf和toString方法

				- String（）

					- 原始类型值

						- 数值：转为相应的字符串。

字符串：转换后还是原来的值。

布尔值：true转为字符串"true"，false转为字符串"false"。

undefined：转为字符串"undefined"。

null：转为字符串"null"。

					- Object

						- 简单规则

							- String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。
							- String({a: 1}) // "[object Object]"

String([1, 2, 3]) // "1,2,3"

						- 具体转换规则

							- String方法背后的转换规则，与Number方法基本相同，只是互换了valueOf方法和toString方法的执行顺序。
							- 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

如果valueOf方法返回的是对象，就报错。
							- 可以自定义对象的valueOf和toString方法

				- Boolean（）

					- 转换为 false 的值

						- undefined
null
-0或+0
NaN
''（空字符串）

					- 其他值都转换为 true

						- 所有对象（包括空对象）都会被转换成为 true
						- Boolean( new Boolean(false) ) // true

			- 自动类型转换（隐式转换）

				- 使用情况

					- 不同类型的数据互相运算

						- 1 + '5' // '15'；'5' + 1 // '15'
						- '5' - '2' // 3
						- '5' * '2' // 10
						- true - 1  // 0
						- false - 1 // -1
						- '1' - 1   // 0
						- '5' * []    // 0
						- false / '5' // 0
						- 'abc' - 1   // NaN
						- null + 1 // 1
						- undefined + 1 // NaN

					- 对非布尔值类型的数据求布尔值

						- if (...) 对条件语句中的值调用Boolean()函数
						- == 判断

							- 1、若 Type(x) 与 Type(y) 相同， 则
    1* 若 Type(x) 为 Undefined， 返回 true。
    2* 若 Type(x) 为 Null， 返回 true。
    3* 若 Type(x) 为 Number， 则
        (1)、若 x 为 NaN， 返回 false。
        (2)、若 y 为 NaN， 返回 false。
        (3)、若 x 与 y 为相等数值， 返回 true。
        (4)、若 x 为 +0 且 y 为 −0， 返回 true。
        (5)、若 x 为 −0 且 y 为 +0， 返回 true。
        (6)、返回 false。
        
    4* 若 Type(x) 为 String, 则当 x 和 y 为完全相同的字符序列（长度相等且相同字符在相同位置）时返回 true。 否则， 返回 false。
    5* 若 Type(x) 为 Boolean, 当 x 和 y 为同为 true 或者同为 false 时返回 true。 否则， 返回 false。
    6*  当 x 和 y 为引用同一对象时返回 true。否则，返回 false。
  
2、若 x 为 null 且 y 为 undefined， 返回 true。
3、若 x 为 undefined 且 y 为 null， 返回 true。
4、若 Type(x) 为 Number 且 Type(y) 为 String，返回比较 x == ToNumber(y) 的结果。
5、若 Type(x) 为 String 且 Type(y) 为 Number，返回比较 ToNumber(x) == y 的结果。
6、若 Type(x) 为 Boolean， 返回比较 ToNumber(x) == y 的结果。
7、若 Type(y) 为 Boolean， 返回比较 x == ToNumber(y) 的结果。
8、若 Type(x) 为 String 或 Number，且 Type(y) 为 Object，返回比较 x == ToPrimitive(y) 的结果。
9、若 Type(x) 为 Object 且 Type(y) 为 String 或 Number， 返回比较 ToPrimitive(x) == y 的结果。
10、返回 false。

								- 不要使用 == 判断

					- 对非数值类型的值使用一元运算符

						- null转为数值时为0，而undefined转为数值时为NaN
						- 除了加法运算符（+）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值，自动调用Number()

				- 自动转换都是以强制转换为基础的

			- 装箱转换

				- 每一种基本类型 （除了 null，undefined）都有其对应的对象，装箱转换就是把基本类型值 变为 相应的对象
				- 每一类装箱对象都有对应的 [[Class]] 属性，可以用 Object.prototype.toString 来获取

			- 拆箱转换

				- JS内部定义了 ToPrimitive 函数，实现对象类型到基本类型的转换
				- 尝试调用 valueOf 和 toString 方法，如果都没有返回基本类型的值则报错。
				- ES6之后允许对象通过显式的指定@@toPrimitive symbol 来改变默认的行为

					- var o = {
  valueOf: function(){console.log('valueOf'); return {}},
  toString: function(){console.log('toString'); return {}},
}
o[Symbol.toPrimitive] = function(){ console.log('symbol'); return 2 }

o*2 // symbol // 4

		- 类型判断

			- typeof

				- 返回值

					- Undefined ---> 'undefined'
					- Null ---> 'object'
					- Boolean ---> 'boolean'
					-  Number ---> 'number'
					- String ---> 'string'
					- Symbol ---> 'symbol'
					-  函数对象 ---> 'function'
					- 宿主对象 ---> 取决于JS运行环境
					- 其他对象 ---> 'object'

				- tips

					- typeof null === 'object' // 从一开始JS就是这样的，这是一个错误的设计

						- 在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。
由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null的类型标签也成为了 0，typeof null就错误的返回了"object"。

					- 由 new 操作符生成的会返回 'object'；但是function 除外

						- typeof new Function() === 'function'

					- 语法中需要使用括号，typeof ( 1 + '5' )  === 'string'
					- 正则表达式，返回 'object'，低版本浏览器（Chrome1-12）可能会返回 'function'
					- 暂存性死区

						- 在声明之前对块中的 let 和 const 变量使用 typeof 会抛出一个ReferenceError。
这与未声明的变量形成对比，typeof会返回“undefined”。
块作用域变量在块的头部处于“暂时死区”，直到被初始化，在这期间，如果变量被访问将会引发错误。

							- typeof undeclaredVariable === 'undefined';
							- typeof newLetVariable; let newLetVariable; // ReferenceError
							- typeof newConstVariable; const newConstVariable = 'hello'; // ReferenceError

			- Object.prototype.toString.call()

				- JS规范中此方法可以获取到每个对象的类型
而且这个方法更加可靠和具体

					- var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]

				- ES6增加 Symbol.toStringTag

					- Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里
					- 也可以自定义类型标签

	- 实例

- 执行过程（算法）

## 跨平台

### Hybrid

- 简介

	- Hybrid（混合开发）（H5+原生）
这类App里的一部分内容（通常是需要动态变化的部分）是通过H5实现的。利用原生的网页加载控件，如：WebView（安卓）和 WKWebView（IOS8+）/UIWebView（IOS2+）来加载H5页面。
这样的应用称之为Hybrid App，如果App的功能大部分都是H5，也可以叫Web App了。
	- 原生部分原生渲染
H5部分由WebView渲染

- 框架

	- Cordova

	- Ionic

	- 微信小程序

	- UI框架

		- Vant

		- Antd mobile

		- mint UI

- 实现原理

	- WebView JavaScript Bridge（JSBridge）

		- 事实上，你可以不用任何框架就能做出Hybrid App。但重要的是你需要与原生通信的能力，这就是 WebView JavaScript Bridge

			- JS调用Native

				- 注入API

					- 通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的
					- IOS

						- UIWebView

							- IOS

								- code example

								  JSContext *context = [uiWebView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
								  
								  context[@"postBridgeMessage"] = ^(NSArray<NSArray *> *calls) {
								      // Native 逻辑
								  };

							- 前端

								- window.postBridgeMessage(message);

						- WKWebView

							- IOS

								- code example

								  @interface WKWebVIewVC ()<WKScriptMessageHandler>
								  
								  @implementation WKWebVIewVC
								  
								  - (void)viewDidLoad {
								      [super viewDidLoad];
								  
								      WKWebViewConfiguration* configuration = [[WKWebViewConfiguration alloc] init];
								      configuration.userContentController = [[WKUserContentController alloc] init];
								      WKUserContentController *userCC = configuration.userContentController;
								      // 注入对象，前端调用其方法时，Native 可以捕获到
								      [userCC addScriptMessageHandler:self name:@"nativeBridge"];
								  
								      WKWebView wkWebView = [[WKWebView alloc] initWithFrame:self.view.frame configuration:configuration];
								  
								      // TODO 显示 WebView
								  }
								  
								  - (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
								      if ([message.name isEqualToString:@"nativeBridge"]) {
								          NSLog(@"前端传递的数据 %@: ",message.body);
								          // Native 逻辑
								      }
								  }

							- 前端

								- window.webkit.messageHandlers.nativeBridge.postMessage(message);

					- Android

						- Android

							- code example

							  publicclassJavaScriptInterfaceDemoActivityextendsActivity{
							  private WebView Wv;
							  
							      @Override
							      publicvoidonCreate(Bundle savedInstanceState){
							          super.onCreate(savedInstanceState);
							  
							          Wv = (WebView)findViewById(R.id.webView);     
							          final JavaScriptInterface myJavaScriptInterface = new JavaScriptInterface(this);    	 
							  
							          Wv.getSettings().setJavaScriptEnabled(true);
							          Wv.addJavascriptInterface(myJavaScriptInterface, "nativeBridge");
							  
							          // TODO 显示 WebView
							  
							      }
							  
							      publicclassJavaScriptInterface{
							           Context mContext;
							  
							           JavaScriptInterface(Context c) {
							               mContext = c;
							           }
							  
							           publicvoidpostMessage(String webMessage){	    	
							               // Native 逻辑
							           }
							       }
							  }

						- 前端

							- window.nativeBridge.postMessage(message);

				- 拦截URL SCHEME 

					- 原生端拦截web端发起的请求（一般是通过动态生成iframe.src）
请求格式的话一般会自定义协议和host
当然理论上原生能拦截到你所有的请求的
					- 缺点

						- 由于是发送url，所以会有长度的限制
						- 创建iframe再发请求是要耗费时间的，没有注入的方式调用的快

					- 优点？

						- 兼容性通吃，但是低版本现在占比还是太小了

					- 一些补充

						- 有些方案为了规避 url 长度隐患的缺陷，在 iOS 上采用了使用 Ajax 发送同域请求的方式，并将参数放到 head 或 body 里。这样，虽然规避了 url 长度的隐患，但是 WKWebView 并不支持这样的方式
						- 为什么选择 iframe.src 不选择 locaiton.href ？因为如果通过 location.href 连续调用 Native，很容易丢失一些调用

			- Native调用JS

				- Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法
因此 JavaScript 的方法必须在全局的 window 上

			- 关于回调

				- 上述方法都是单向通信的
想要实现回调可以参考JSONP的过程
				- 通过自增id标识回调函数
可以有短期回调池和长期回调池

- 优点

	- 更新快，不走审核
	- web技术资源丰富
	- 分担了原生开发的压力，人力上也只需要web端就可以了

- 缺点

	- 过于复杂的场景下会有性能问题
	- 使用定时器可能会有bug，尤其是在做类似倒计时的需求，导致时间不准
	- 兼容性问题比较多，尤其是国产手机上
	- 慢网情况下页面加载不出来，或者直接白屏。
就算网络好，也是每进一次h5都需要重新请求，比较浪费流量。
	- 设备底层功能（如蓝牙，摄像头等）还是需要原生调用
	- 输入框是个大坑，键盘也是个坑，不过键盘可以让原生弹
	- 对于各种手势的判断也比较麻烦

### 跨平台移动开发（JS开发+原生渲染）

- 简介

	- 主要由于虚拟DOM的存在，使得JS代码可以映射为各个平台的渲染树。所以可以做到跨平台。
但是由于依赖原生组件，所以在不同平台生成的组件并不一致。

- 框架

	- React Native

	- Weex
	- 快应用

- 优点

	- 采用Web开发技术栈，社区庞大、上手快、开发成本相对较低
	- 原生渲染，性能相比H5提高很多
	- 动态化较好，支持热更新

- 缺点

	- 渲染时需要JavaScript和原生之间通信，在有些场景如拖动可能会因为通信频繁导致卡顿
	- JavaScript为脚本语言，执行时需要JIT(Just In Time)，执行效率和AOT(Ahead Of Time)代码仍有差距
	- 由于渲染依赖原生控件，不同平台的控件需要单独维护，并且当系统更新时，社区控件可能会滞后；除此之外，其控件系统也会受到原生UI系统限制，例如，在Android中，手势冲突消歧规则是固定的，这在使用不同人写的控件嵌套时，手势冲突问题将会变得非常棘手

### 自绘引擎 + 原生调用

- 简介

	- 通过在不同平台实现一个统一接口的渲染引擎来绘制UI，而不依赖系统原生控件，所以可以做到不同平台UI的一致性
注意，自绘引擎解决的是UI的跨平台问题，如果涉及其它系统能力调用，依然要涉及原生开发

- 框架

	- QT Mobile

		- 一个没有声音的框架

	- Flutter

		- 最近声音很大，尝鲜必备。问题是环境搭建比较麻烦，必须有梯子

- 优点

	- 由于是自己实现的自会引擎，调用系统api进行渲染，所以理论上要比h5性能好
	- 开发效率上Flutter的热重载可帮助开发者快速地进行测试、构建UI、添加功能并更快地修复错误。在iOS和Android模拟器或真机上可以实现毫秒级热重载，并且不会丢失状态
你要是原生开发过来的话，你会爽的不行
你要是做web的，那当我没说

- 缺点

	- 前者QT已经凉了，不知道Flutter命运如何
	- Flutter的写法有点问题，思路也比较新颖（奇葩）。反正代码的风格你可能一时接受不了
	- 社区还在发展壮大，更多的人还是观望或者玩票

## 网络与浏览器

### 当你输入url按下回车之后

- 精简版

	- 1. 浏览器解析url

		- 解析使用的协议和资源地址
		- 转换非 ASCII 的 Unicode 字符

			- 浏览器检查输入是否含有
不是 a-z， A-Z，0-9， - 或者 . 的字符
			- 如果有，则应用Punycode编码

	- 2.检查 HSTS 列表

		- 浏览器检查自带的“预加载 HSTS（HTTP严格传输安全）”列表
这个列表里包含了那些请求浏览器只使用HTTPS进行连接的网站
		- 如果网站在这个列表里，浏览器会使用 HTTPS 而不是 HTTP 协议，否则，最初的请求会使用HTTP协议发送

	- 3.DNS 查询（将域名解析成ip地址）

		- 浏览器检查域名是否在缓存当中
（要查看 Chrome 当中的缓存， 打开 chrome://net-internals/#dns）
		- 如果缓存中没有，就去调用 gethostbyname 库函数（操作系统不同函数也不同）进行查询。
		- gethostbyname 函数在试图进行DNS解析之前首先检查域名是否在本地 Hosts 里
Hosts 的存储位置，不同的操作系统有所不同

		- 如果 gethostbyname 没有这个域名的缓存记录，也没有在 hosts 里找到，它将会向 DNS 服务器发送一条 DNS 查询请求。
DNS 服务器是由网络通信栈提供的，通常是本地路由器或者 ISP （互联网服务提供商）的缓存 DNS 服务器。
		- 查询本地 DNS 服务器

			- 如果 DNS 服务器和我们的主机在同一个子网内，系统会按照下面的过程对 DNS 服务器进行查询
			- 如果 DNS 服务器和我们的主机在不同的子网，系统会按照下面的过程对默认网关进行查询

	- 4.地址解析（解析ip地址，确定其MAC地址）

		- ARP（IPv4）

			- 在每台安装有TCP/IP协议的计算机或路由器里都有一个ARP缓存表
表里的IP地址与MAC地址是一对应的，如：
A	192.168.38.10	00-AA-00-62-D2-02
B	192.168.38.11	00-BB-00-62-C2-02
			- 以主机A（192.168.38.10）向主机B（192.168.38.11）发送数据为例。
			- 1.当发送数据时，主机A会在自己的ARP缓存表中寻找是否有目标IP地址。
如果找到就知道目标MAC地址为（00-BB-00-62-C2-02），直接把目标MAC地址写入帧里面发送就可。
			- 2.如果在ARP缓存表中没有找到相对应的IP地址，主机A就会在网络上发送一个广播（ARP request），目标MAC地址是“FF.FF.FF.FF.FF.FF”，这表示向同一网段内的所有主机发出这样的询问：“192.168.38.11的MAC地址是什么？”
			- 3.网络上其他主机并不响应ARP询问，只有主机B接收到这个帧时，才向主机A做出这样的回应（ARP response）：“192.168.38.11的MAC地址是00-BB-00-62-C2-02”，此回应以单播方式。
这样，主机A就知道主机B的MAC地址，它就可以向主机B发送信息。同时它还更新自己的ARP高速缓存（ARP cache），下次再向主机B发送信息时，直接从ARP缓存表里查找就可。

		- NDP（IPv6）

- 完整版

## 框架

### React技术栈

- React
- Redux

	- 你什么时候需要Redux

		- UI 需要根据应用程序状态变化
		- 数据并不总是以一种线性的，单向的方式流动
		- 许多不相关的组件以相同的方式更新状态
		- 需要维护一个复杂的状态树
		- 状态以许多不同的方式更新
		- 需要能够撤消以前的用户操作

	- 要点

		- 应用中所有的 state 都以一个对象树的形式存储在一个单一的 store 中。
触发(dispatch) action 是改变 store 的唯一的方法 。
还需要编写 reducer 来描述 action 是如何改变 state 的

	- 3大原则

		- 单一数据源

			- 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

		- State 是只读的

			- 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

		- 使用纯函数来执行修改

			- 为了描述 action 如何改变 state tree ，你需要编写 reducers。而 reducers 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

	- 基本概念

		- Action

			- 定义

				- Action 是把数据从应用传到 store 的有效载荷。
是store唯一的数据来源。

			- 结构

				- 一个包含 type 字段的普通对象

					- {
  type: 'ACTION',
  ... payload
}

				- 约定了 action 内必须要有一个字符串类型的 type 字段 来表示接下来要执行的动作。
				- 社区统一的 Action 规范

			- Action Creator

				- 用来生成action的函数。

			- Action Creator 生成器

				- 生成 Action Creator的生成器，用来减少样板代码， 为Action增加统一的后缀等

		- 中间件

			- 中间件允许我们在 action dispatch 之前进行一系列的操作。

### Vue技术栈

- Vue

	- 源码分析

		- 2.x

			- 项目基础

				- Flow

					- facebook 出品的 JavaScript 静态类型检查工具
					- 为什么要用Flow

						- JavaScript 是动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用是很容易就写出非常隐蔽的隐患代码，在编译期甚至看上去都不会报错，但在运行阶段就可能出现各种奇怪的 bug
						- 类型检查是当前动态类型语言的发展趋势，所谓类型检查，就是在编译期尽早发现（由类型错误引起的）bug，又不影响代码运行（不需要运行时动态检查类型），使编写 JavaScript 具有和编写 Java 等强类型语言相近的体验
						- 项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。 Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码风格之外，也引入了 Flow 做静态类型检查。之所以选择 Flow，主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以支持语法，可以完全沿用现有的构建配置，非常小成本的改动就可以拥有静态类型检查的能力

				- Rollup.js

					- 专门为库打包。致力于将项目整合生成单个文件，用来被其他项目引入。Three sharking的发起者

				- 主要的目录结构

					- flow

						- flow相关配置，主要是一些自定义类型

					- scripts

						- scripts 顾名思义就是一堆可执行的脚本文件。。。
						- build.js

							- 根据package.json里的配置
"build": "node scripts/build.js",
"build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
"build:weex": "npm run build -- weex",
构建时会执行这个文件。主要是根据不同的命令构建不同平台的Vue

						- config.js

							- 各个平台下Vue的构建配置，构建的时候读取
遵循 Rollup 的构建规则
							- 举一个片段：
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.dev.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
  ...
}

								- entry

									- 表示构建的入口JS文件地址

										- resolve函数的实现
先把 resolve 函数传入的参数 p 通过 / 做了分割成数组
然后取数组第一个元素设置为 base。在这个例子中，参数 p 是 web/entry-runtime.js，那么 base 则为 web。
base 并不是实际的路径，它的真实路径借助了别名的配置，别名配置的代码在 scripts/alias 中

										  const aliases = require('./alias')
										  const resolve = p => {
										    const base = p.split('/')[0]
										    if (aliases[base]) {
										      return path.resolve(aliases[base], p.slice(base.length + 1))
										    } else {
										      return path.resolve(__dirname, '../', p)
										    }
										  }

											- scripts/alias配置

											  const path = require('path')
											  
											  module.exports = {
											    vue: path.resolve(__dirname, '../src/platforms/web/entry-runtime-with-compiler'),
											    compiler: path.resolve(__dirname, '../src/compiler'),
											    core: path.resolve(__dirname, '../src/core'),
											    shared: path.resolve(__dirname, '../src/shared'),
											    web: path.resolve(__dirname, '../src/platforms/web'),
											    weex: path.resolve(__dirname, '../src/platforms/weex'),
											    server: path.resolve(__dirname, '../src/server'),
											    entries: path.resolve(__dirname, '../src/entries'),
											    sfc: path.resolve(__dirname, '../src/sfc')
											  }

								- dest

									- 表示打包后生成的文件地址

								- format

									- 构建的格式

										- cjs

											- 表示构建出来的文件遵循 CommonJS 规范

										- es

											- 表示构建后的文件遵守ES Module规范

										- umd

											- 表示构建出来的文件遵循 UMD 规范

								- env

									- 环境变量

								- banner

									- 底部签名

										- const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */'

					- src

						- compiler

							- compiler 目录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能

						- core

							- core 目录包含了 Vue.js 的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等

						- platform

							- Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 native 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js

						- server

							- 服务端渲染相关逻辑

						- sfc

							- 把.vue 文件内容解析成一个 JavaScript 的对象

				- Vue运行版本

					- Runtime Only

						- 在编译阶段就借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript
这样的话，在运行时就没有编译过程，而且
只包含运行时的 Vue.js 代码，因此代码体积也会更轻量

					- Runtime + Compiler

						- 与之对应的就是这个带有编译器的版本
由于没有对代码做预编译，又使用了Vue的模板。
因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本
很显然，这个编译过程对性能会有一定损耗，所以通常我们更推荐使用 Runtime-Only 的 Vue.js

			- Vue构造函数

				- 在使用Vue的时候，要用new操作符进行调用。这证明了Vue是一个构造函数
				- 源码位置

					- vue/src/core/instance/index.js

				- 代码片段

				  // 从五个文件导入五个方法（不包括 warn）
				  import { initMixin } from './init'
				  import { stateMixin } from './state'
				  import { renderMixin } from './render'
				  import { eventsMixin } from './events'
				  import { lifecycleMixin } from './lifecycle'
				  import { warn } from '../util/index'
				  
				  // 定义 Vue 构造函数
				  function Vue (options) {
				    if (process.env.NODE_ENV !== 'production' &&
				      !(this instanceof Vue)
				    ) {
				      warn('Vue is a constructor and should be called with the `new` keyword')
				    }
				    this._init(options)
				  }
				  
				  // 将 Vue 作为参数传递给导入的五个方法
				  initMixin(Vue)
				  stateMixin(Vue)
				  eventsMixin(Vue)
				  lifecycleMixin(Vue)
				  renderMixin(Vue)
				  
				  // 导出 Vue
				  export default Vue

					- // 从五个文件导入五个方法（不包括 warn）
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 Vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 将 Vue 作为参数传递给导入的五个方法
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

// 导出 Vue
export default Vue

## 动态类型

JavaScript 是一种弱类型或者说动态语言。
这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。
这也意味着你可以使用同一个变量保存不同类型的数据。

## JS如何处理基本类型MDN示例

*XMind - Trial Version*