# 每周总结可以写在这里

## 作业

1. 使用状态机完成'abababx'的处理

```javascript
function match(string) {
  let state = start;
  for (let c of string) {
    console.log('c', c);
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === 'a') {
    return foundA;
  } else {
    return start;
  }
}

function end(c) {
  return end;
}

function foundA(c) {
  if (c === 'b') {
    return foundB;
  } else {
    return start(c);
  }
}

function foundB(c) {
  if (c === 'a') {
    return foundA2;
  } else {
    return start(c);
  }
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2;
  } else {
    return start(c);
  }
}

function foundB2(c) {
  if (c === 'a') {
    return foundA3;
  } else {
    return start(c);
  }
}

function foundA3(c) {
  if (c === 'b') {
    return foundB3;
  } else {
    return start(c);
  }
}

function foundB3(c) {
  if (c === 'x') {
    return end;
  } else {
    return foundB2(c);
  }
}
```

2. 跟上课堂内容，完成 DOM 树构建

[html-parse](./html-parse)

## 总结

学习了**状态机**、**HTML 解析**、**CSS 解析**

### 有限状态机处理字符串

#### 有限状态机

- 每个状态都是一个机器
- 每个机器知道下一个状态

### HTML 解析

步骤：

1. 拆分文件
   把 parser 单独拆到文件，parser 接收 HTML 文本作为参数，返回一颗 DOM 树
2. 创建状态机
   用状态机实现 HTML 的分析
3. 解析标签
   匹配开始标签、结束标签、自封闭标签
4. 创建元素
   在标签结束状态提交标签 token
5. 处理属性
   属性值需要处理单引号、双引号、无引号三种写法。属性结束时，需要把属性标签写到标签 token 上
6. 构建 DOM 树
   使用栈
7. 文本节点
   多个文本节点需要合并

### CSS 解析

步骤：

1. 收集 CSS 规则
   匹配 style 标签，将 css 规则保存起来；调用 css parser 来分析 css 规则
2. 添加调用
   创建一个元素后，立即计算 css
3. 获取父元素序列
   首先获取的是“当前元素”，所以获得和计算父元素匹配的顺序是从内向外 divdiv#myid 不知道匹配哪个元素一定匹配当前元素
4. 拆分选择器
   选择器也要从当前元素向外排列
5. 计算选择器与元素匹配
   根据选择器的类型和元素属性，计算是否与当前元素匹配
6. 生成 computed 属性
   一旦选择匹配，就应用选择器到元素上，形成 computedStyle
7. 确定规则覆盖关系
   CSS 规则根据 specificity 和后来优先规则覆盖
   specificity 是个四元组，越左边权重越高
