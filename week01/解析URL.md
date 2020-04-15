# 解析 URL

## url 组成

完成的 URL 组成如下：

```
    foo://example.com:8042/over/there?name=ferret#nose
    \_/   \______________/\_________/ \_________/ \__/
     |           |            |            |        |
  scheme     authority       path        query   fragment
     |   _____________________|__
    / \ /                        \
    urn:example:animal:ferret:nose

```

authority 由 userinfo、host、port 组成，表达式为：
`authority = [ userinfo "@" ] host [ ":" port ]`

完整 URL 可表示为：
**[scheme:]//[username[:password]@]host[:port][/path][?query][#fragment]**

## 如何解析 url

现代浏览器提供了 URL 和 URLSearchParams 来解析 url 地址

利用 URL 对象简单解析 url：

```javascript
/**
 *
 * @param {string} url
 * 利用URL对象简单解析url
 * @returns {href,origin,protocol,username,password,host,hostname,port,pathname,search,searchParams,hash}
 */
function parseURL(url) {
  const urlObj = new URL(url);
  return urlObj;
}
```

## 参考链接

[rfc3986](https://tools.ietf.org/html/rfc3986)
[URI.js](https://github.com/medialize/URI.js)
