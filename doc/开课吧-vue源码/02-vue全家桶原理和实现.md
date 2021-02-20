## 知识点

* vue-router原理

* vuex原理

知识储备：

* vue plugin--自定义插件
* render函数
* vue.util.defineReactive | new Vue
* ES6 class



## Vue插件

插件的作用：

* 用于为Vue添加全局功能

插件使用场景

* 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
* 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)
* 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
* 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
* 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)

### 插件的使用

通过`Vue.use(plugin,options)`来使用插件，这一步骤需要在调用`new Vue()`启动应用前完成；

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...
})
```

`Vue.use` 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件

### 开发插件

`Vue.js`的插件应该向外暴露一个`install`方法，这个方法的第一个参数是`Vue`构造器,第二个参数是一个可选的选项对象

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```



## 渲染函数

### createElement接收参数

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

#### 数据对象

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```



## class

**class 声明**创建一个基于原型继承的具有给定名称的新类

语法

```js
class name [extends] {
  // class body
}
```



## Vue-Router

### Router的诉求

* 当浏览器地址来的`URL`变化时，
  * 知道`URL`发生了变化
  * 页面内容会重新渲染
  * 不能离开当前页面(`SPA`)

#### 解决方案

当`URL`发生变化，能够监听到URL的变化并且不离开当前页面的解决方案：

* `url`的`hash`模式`http://xxx.com/#/`
  * 监听`hash change`,匹配路由表，找到匹配的路由对应的组件，然后渲染，执行组件的render方法，把匹配到的component作为参数
* `H5` `History`的`State`

### Vue-router

#### 使用

安装:`vue add router`

核心步骤：

* 使用vue-router插件，引入插件	`import vueRouter from 'vue-router'`

* 定义路由表

  ```js
  const routes = [{
   	path:'/foo',
      component: ComponentA
  }]
  ```

  

* 创建`Router`实例并导出,`export default new vueRouter({routes})`

* 在根组件上添加实例，`main.js`

  ```js
  import Router from './router'
  new Vue({
      router
  }).$mount('#app')
  ```



* 添加路由视图，`App.vue`

  ```js
  <router-view></router-view>
  ```

#### 源码

地址：https://github.com/vuejs/vue-router

### kRouter源码实现

单页应用程序中，`url`发生变化时，页面不能刷新，但是显示内容要变化

#### 需求分析

* `SPA`页面不能刷新
  * `hash #/about`
  * `history API /about`
* 根据`URL`显示对应的内容
  * `router-view`
  * 数据响应式：`current`变量持有`url`地址，一旦变化，动态执行`render`

#### 实现

实现一个插件

实现VueRouter类

* 处理路由变化选项
* 监听url变化。hashchange
* y响应这个变化

实现install方法

* $router注册
* 两个全局组件

什么是响应式

响应式的实现方式

## Vuex



## 学习资料

[History](https://developer.mozilla.org/zh-CN/docs/Web/API/History)

[HTML5 History模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

[插件](https://cn.vuejs.org/v2/guide/plugins.html)

[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

[class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)