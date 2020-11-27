## Vue中的自定义事件

### 事件名

* 不同于组件和`prop`,事件名不存在任何自动化的大小写转换，而是触发的事件名需要完全匹配监听这个事件所使用的的名称，例如触发一个`camelCase`名字的事件：

```javascript
this.$emit('changeValue')
```

则监听这个事件的名称如果是`kebab-case`写法，则事件不会被触发：

```javascript
<InputCmp v-on:change-value="changeValueHandler"></InputCmp>
```

即是：触发的事件名和监听的事件名必须保持一致

* 不同于组件和 `prop`，事件名不会被用作一个 `JavaScript `变量名或` property` 名，所以就没有理由使用 `camelCase` 或 `PascalCase` 了。并且 `v-on`事件监听器在 `DOM` 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent`将会变成 `v-on:myevent`导致 `myEvent`不可能被监听到。推荐**始终使用 kebab-case 的事件名**



## 参考

[自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)