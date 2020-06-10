# week08

## 作业

1. 编写一个 match 函数

```javascript
function _match(selector, element) {
  let matched = true;
  let attributes = [...element.attributes];
  // tag, id, cls, attr
  selector.match(/^([a-z]+)?(#[a-z]+)?(\.[a-z]+)?(\[[a-z]+=[a-z]+\])?$/);
  const tag = RegExp.$1;
  const id = RegExp.$2;
  const cls = RegExp.$3;
  const attr = RegExp.$4;
  // tag
  if (tag) {
    if (element.tagName !== tag.toUpperCase()) {
      matched = false;
    }
  }
  if (id) {
    // id
    let attr = attributes.filter((attr) => attr.name === 'id')[0];
    if (!attr || !attr.value.includes(id.replace('#', ''))) {
      matched = false;
    }
  }
  if (cls) {
    let attr = attributes.filter((attr) => attr.name === 'class')[0];
    if (!attr || !attr.value.includes(cls.replace('.', ''))) {
      matched = false;
    }
  }
  if (attr) {
  }

  return matched;
}

// 元素和简单选择器是否匹配
function match(selector, element) {
  if (!selector || !element.attributes) {
    return false;
  }

  let selectorArr = selector.split(' ').reverse();

  return selectorArr.every((sel, index) => {
    index && (element = element.parentElement);
    return _match(sel, element);
  });
}

match('div#a.b .c', document.getElementById('x'));
```

[match](./match.html)

## 总结

### 选择器

#### 选择器语法

- 简单选择器
  - \*
  - div svg|a
  - .class
  - #id
  - [attr=value]
  - :hover
  - ::before
- 复合选择器(与的关系)

  - <简单选择器><简单选择器><简单选择器>
  - \* 或者 div 必须写在最前面

- 复杂选择器
  - <复合选择器><复合选择器> 子孙关系
  - <复合选择器>">"<复合选择器> 父子关系
  - <复合选择器>"~"<复合选择器> sibling
  - <复合选择器>"+"<复合选择器> sibling
  - <复合选择器>"||"<复合选择器> leve4，兼容性不好

#### 选择器优先级

[specificity](https://www.w3.org/TR/2016/WD-CSS22-20160412/cascade.html#specificity)

#### 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty 没有子元素
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑型
  - :not 伪类
  - :where :has

#### 伪元素

- ::before
- ::after
- ::first-line
- ::first-letter

### 排版

1. 盒(Box)模型
2. 排版

Vertical-align：

- Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline
- Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“
- vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom
