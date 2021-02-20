## 搭建环境

1.到`GitHub`上下载`vue`源码

* 源码地址：https://github.com/vuejs/vue.git

2.安装依赖

```js
npm install
```



3.下载`rollup`

```
npm install rollup -g
```

4.修改`package.json`

修改`dev`脚本,添加`--source-map`

```json
"scripts": {
        "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
        "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
        "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
        "dev:test": "karma start test/unit/karma.dev.config.js",
        "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
        "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-compiler ",
        "dev:weex": "rollup -w -c scripts/config.js --environment TARGET:weex-framework",
        "dev:weex:factory": "rollup -w -c scripts/config.js --environment TARGET:weex-factory",
        "dev:weex:compiler": "rollup -w -c scripts/config.js --environment TARGET:weex-compiler ",
        "build": "node scripts/build.js",
        "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
        "build:weex": "npm run build -- weex",
        "test": "npm run lint && flow check && npm run test:types && npm run test:cover && npm run test:e2e -- --env phantomjs && npm run test:ssr && npm run test:weex",
        "test:unit": "karma start test/unit/karma.unit.config.js",
        "test:cover": "karma start test/unit/karma.cover.config.js",
        "test:e2e": "npm run build -- web-full-prod,web-server-basic-renderer && node test/e2e/runner.js",
        "test:weex": "npm run build:weex && jasmine JASMINE_CONFIG_PATH=test/weex/jasmine.js",
        "test:ssr": "npm run build:ssr && jasmine JASMINE_CONFIG_PATH=test/ssr/jasmine.js",
        "test:sauce": "npm run sauce -- 0 && npm run sauce -- 1 && npm run sauce -- 2",
        "test:types": "tsc -p ./types/test/tsconfig.json",
        "lint": "eslint src scripts test",
        "flow": "flow check",
        "sauce": "karma start test/unit/karma.sauce.config.js",
        "bench:ssr": "npm run build:ssr && node benchmarks/ssr/renderToString.js && node benchmarks/ssr/renderToStream.js",
        "release": "bash scripts/release.sh",
        "release:weex": "bash scripts/release-weex.sh",
        "release:note": "node scripts/gen-release-note.js",
        "commit": "git-cz"
    },
```

5.运行

```js
npm run dev
```

## 浏览器调试代码的技巧

* 打开指定文件
  * 浏览器在开启开发者工具时打开指定文件，通过`ctrl+p`快捷键打开搜索，然后输入自己要查询的文件
* 断点调试
  * 在需要进行断点调试的代码行打一个断点
  * 单步执行
  * 单步进入
  * 查看调用栈`call stack`
* 定位源文件所在位置，鼠标右键选择`reveal in sidebar`

## Vue2.x源码解析

`e2e`下载时间长，可以终止下载

### 文件结构

![image-20210110180641905](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210110180641905.png)

### 源码目录

```js
├───compiler # 编译相关
│   ├───codegen
│   ├───directives
│   └───parser
├───core # 核心代码
│   ├───components # 通用组件，例如keep-alive
│   ├───global-api # 全局API
│   ├───instance # 构造函数等
│   │   └───render-helpers
│   ├───observer # 响应式相关
│   ├───util
│   └───vdom # 虚拟DOM
│       ├───helpers
│       └───modules
├───platforms # 跨平台
│   ├───web # web端
│   │   ├───compiler # 编译
│   │   │   ├───directives
│   │   │   └───modules
│   │   ├───runtime # 运行时
│   │   │   ├───components
│   │   │   ├───directives
│   │   │   └───modules
│   │   ├───server # 服务器
│   │   │   ├───directives
│   │   │   └───modules
│   │   └───util
│   └───weex # weex
│       ├───compiler
│       │   ├───directives
│       │   └───modules
│       │       └───recycle-list
│       ├───runtime
│       │   ├───components
│       │   ├───directives
│       │   ├───modules
│       │   └───recycle-list
│       └───util
├───server # 服务器端渲染
│   ├───bundle-renderer
│   ├───optimizing-compiler
│   ├───template-renderer
│   └───webpack-plugin
├───sfc # 单文件组件的解析
└───shared # 客户端和服务端渲染共用代码
```

### 术语

![image-20210110182340722](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210110182340722.png)

构建出来的`Vue.js`版本，没有携带`runtime`的则是带编译器的版本

`runtime`: 仅仅包含运行时，不包含编译器

`common`: `cjs`规范，用于`webpack1`

`cjs`  :` commonJS`规范

`esm`: `ES`模块,用于`webpack2+`

`umd`:`universal module from definition`,兼容`cjs`和`amd`,用于浏览器

`ssr` -- 服务端渲染

`weex` -- `weex`平台

`complier` -- 编译版本`runtime + complier`

![image-20210110182421058](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210110182421058.png)

### 入口

#### 入口查找

在`package.json`文件的`scripts`脚本模块中根据启动命令查找，例如,`dev`命令对应的入口是`scripts/config.js`中键值为`web-full-dev`对应的入口

![image-20210111112027563](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111112027563.png)

`entry`中的`web`并不是真实的文件路径，而是通过resolve方法从定义的`aliases`中解析得到真实的文件路径

`resolve`方法说明

```js
const resolve = p => {
   // 把传入的路径参数a按照`/`截取，然后拿到第一字符串
  const base = p.split('/')[0]
  // 判断能否从aliases中获取到对应的文件路径，没有则往上以及查找
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
```

`alias.js`

```js
const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}

```

最终得到`dev`命令对应的入口文件位置`src/platforms/web/entry-runtime-with-compiler.js`

### entry-runtime-with-compiler.js 核心功能

`entry-runtime-with-compiler.js`核心功能是对`Vue`原型上定义的`$mount`方法进行扩展,覆盖原来的`$mount`方法

#### 扩展后的$mount实现的功能

1.通过用户传入的`el`获取对应的`DOM`元素

```js
 el = el && query(el)
```

`query`

```js
/**
 * @description
 * @date 11/01/2021
 * @param {(string | Element)} el 用户传入的元素选择器或者DOM元素
 * @return {Element}  Element 返回对应的DOM元素
 */
export function query(el: string | Element): Element {
    // 判断用户传入的是字符串还是DOM元素
    if (typeof el === 'string') {
        /*
          如果用户传入的是字符串，则通过querySelector方法获取对应的DOM元素
          如果没有获取到对应的DOM元素则抛出异常， 并创建一个空的div元素然后返回
          如果获取到对应的DOM元素，则直接返回获取到的DOM元素
        */
        const selected = document.querySelector(el)
        if (!selected) {
            process.env.NODE_ENV !== 'production' && warn(
                'Cannot find element: ' + el
            )
            return document.createElement('div')
        }
        return selected
    } else {
        // 如果用户传入的是DOM元素则直接返回该DOM元素
        return el
    }
}
```

2.判断用户传入的`el`是不是`body,html`这样的根元素,如果传入的是`body|html`，则抛出异常

```js
/* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
            `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }
```

即是不允许挂载到`html`或者`body`这样的根元素上，因为元素挂载的过程会覆盖原来的元素

3.获取传入的`options`并缓存

4.判断`options`中是否有`render`方法，没有则将`template`或者`el`编译转换得到一个`render`函数

* 没有`render`选项,则判断是否定义了`tempalte`
  * 定义了`tempalte`,则对`template`进行编译得到`render`函数
    * 如果`template`是字符串类型，则判断是否是`Id`选择器,是则根据Id选择器获取对应的`DOM`元素，然后获取`DOM`元素的`innerHTML`作为`template`
    * 如果`template`是`DOM`元素（存在`nodeType`），则将`DOM`元素的`innerHTML`作为`template`
    * 如果`template`既不是元素选择器，又不是`DOM`元素，则在开发环境抛出异常
  * 没有定义`template`，则判断是够定义`el`
    * 定义了`el`,则根据el获取其`outerHTML`内容作为模板
  * 将通过`template`获取`el`获取到的`template`进行编译得到`render`函数,并将`render`函数重新设置到`options`上

5. 进行挂载操作，将`render`函数返回的虚拟`DOM`转换为真实`DOM`

```js
/* @flow */

import config from 'core/config'
import {
    warn,
    cached
} from 'core/util/index'
import {
    mark,
    measure
} from 'core/util/perf'
// 引入Vue
import Vue from './runtime/index'
import {
    query
} from './util/index'
import {
    compileToFunctions
} from './compiler/index'
import {
    shouldDecodeNewlines,
    shouldDecodeNewlinesForHref
} from './util/compat'

/**
 * @description 通过Id获取元素，并返回对应的innerHTML
 */
const idToTemplate = cached(id => {
        const el = query(id)
        return el && el.innerHTML
    })
    // 从Vue原型上获取$mount方法，重新定义（扩展覆盖原来的方法），返回一个组件
const mount = Vue.prototype.$mount
    /**
     * @description 重新定义$mount方法，返回虚拟节点
     * @date 11/01/2021
     * @param {String | Element}  el 用户传入元素选择器或者DOM元素
     * @param {Boolean} hydrating
     */
Vue.prototype.$mount = function(
    el ? : string | Element, // flow语法，el可以是字符串或者DOM元素
    hydrating ? : boolean
): Component {
    // 获取用户传入的el获取对应的DOM元素
    el = el && query(el)

    /* istanbul ignore if */
    // 判断用户传入的el是不是body,html这样的根元素,如果传入的是body|html，则抛出异常
    if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
            `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }
    // 获取$options并缓存
    const options = this.$options
        // resolve template/el and convert to render function
        //
    if (!options.render) {
        let template = options.template
            // 将template编译成渲染函数
        if (template) {
            // 如果传入的template是字符串
            if (typeof template === 'string') {
                // 判断是不是Id选择器
                if (template.charAt(0) === '#') {
                    // 是则根据Id获取到对应的DOM元素然后获取其innerHTML内容作为模板
                    template = idToTemplate(template)
                        /* istanbul ignore if */
                        // 没有获取到对应的innerHTML，开发环境下抛出
                    if (process.env.NODE_ENV !== 'production' && !template) {
                        warn(
                            `Template element not found or is empty: ${options.template}`,
                            this
                        )
                    }
                }
            } else if (template.nodeType) { // 判断传入的是否是DOM元素，是则获取template的innerHTML内容作为模板
                template = template.innerHTML
            } else { // 如果template既不是元素选择器，又不是DOM元素，则在开发环境抛出异常
                if (process.env.NODE_ENV !== 'production') {
                    warn('invalid template option:' + template, this)
                }
                return this
            }
        } else if (el) { // 如果用户没有定义template,但定义了el,则根据el获取对应的outerHTML作为模板内容
            template = getOuterHTML(el)
        }
        // template存在，则将template编译为render函数
        if (template) {
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                mark('compile')
            }
            // 将template编译为render函数
            const {
                render,
                staticRenderFns
            } = compileToFunctions(template, {
                    outputSourceRange: process.env.NODE_ENV !== 'production',
                    shouldDecodeNewlines,
                    shouldDecodeNewlinesForHref,
                    delimiters: options.delimiters,
                    comments: options.comments
                }, this)
                // 将render方法重新设置到选项上
            options.render = render
            options.staticRenderFns = staticRenderFns

            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                mark('compile end')
                measure(`vue ${this._name} compile`, 'compile', 'compile end')
            }
        }
    }
    // 进行挂载：将VDOM转换为真实DOM
    return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el: Element): string {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}

Vue.compile = compileToFunctions

export default Vue

```



`vue2.0`中组件的渲染必须通过`render`函数

`$mount`方法核心功能：将`template`或者`el`编译为`render`函数

### src/platforms/web/runtime/index.js 核心功能

1.安装`patch`函数

```js
// 安装web平台的补丁函数 patch（比较两个新旧虚拟DOM的差异，根据差异更新真实DOM）,初始化和更新的时使用
Vue.prototype.__patch__ = inBrowser ? patch : noop
```



2.实现`$mount`

```js
// 默认的$mount：将虚拟DOM转换为真实DOM
Vue.prototype.$mount = function(
    el ? : string | Element,
    hydrating ? : boolean
): Component {
    el = el && inBrowser ? query(el) : undefined
        // 真正的挂载函数
    return mountComponent(this, el, hydrating)
}
```

### src/core/index.js 核心功能

* 初始化全局`API`

### src/core/instance/index.js 核心功能

* 定义`Vue`的构造函数
* 定义`Vue`实例的属性和方法

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 定义`Vue`的构造函数
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    // 初始化
    this._init(options)
}
// 定义实例的属性和方法

initMixin(Vue) // 定义_init

stateMixin(Vue) // 定义$data,$props,$set,$delete,$watch

eventsMixin(Vue) // 定义$on,$once,$off,$emit

lifecycleMixin(Vue) // 定义_update,$forceUpdate,$destroy

renderMixin(Vue) // 定义 $nextTick, _render

export default Vue

```



#### _init的实现

位置：`src/core/instance/init.js`

* 合并选项
* `$parent，$root，$children，$refs`等的初始化
* 事件的监听
* 初始化插槽`$slots,$scopedSlots`，声明`_c,$createElement`,定义`$attrs,$listeners`
* 调用`beforeCreate`方法
* 注入父辈传入的参数，开发者通过`inject`注入父辈元素通过`provide`提供的数据
*  初始化状态`：props,data,methods,watch,computed`
*  向后代提供数据（`provide`中提供的数据）
* 调用`created`方法
* 如果定义了`el`选项直接掉调用`$mount`方法

```js
export function initMixin(Vue: Class < Component > ) {
    Vue.prototype._init = function(options ? : Object) {
        const vm: Component = this
            // a uid
        vm._uid = uid++

            let startTag, endTag
                /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            startTag = `vue-perf-start:${vm._uid}`
            endTag = `vue-perf-end:${vm._uid}`
            mark(startTag)
        }

        // a flag to avoid this being observed
        vm._isVue = true
            // merge options
            // 合并选项
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options)
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            )
        }
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            initProxy(vm)
        } else {
            vm._renderProxy = vm
        }
        // expose real self

        // 初始化流程
        vm._self = vm
        initLifecycle(vm) // $parent，$root，$children，$refs等的初始化
        initEvents(vm) // 事件的监听
        initRender(vm) // 初始化插槽$slots,$scopedSlots，声明_c,$createElement,定义$attrs,$listeners
        callHook(vm, 'beforeCreate') // 调用beforeCreate方法
        initInjections(vm) // resolve injections before data/props 注入父辈传入的参数，开发者通过inject注入父辈元素通过provide提供的数据
        initState(vm) // 初始化状态：props,data,methods,watch,computed
        initProvide(vm) // resolve provide after data/props 向后代提供数据（provide中提供的数据）
            // 为什么先注入(inject)再提供(provide)
        callHook(vm, 'created') //调用created方法

        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            vm._name = formatComponentName(vm, false)
            mark(endTag)
            measure(`vue ${vm._name} init`, startTag, endTag)
        }
        // 如果定义了el选项直接掉调用$mount方法
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}

```

`$mount`做了什么事情？

`$mount() `==>` mountComponent()` ==>`updateComponent()` ==>` _render()`==> _`update()`

### 数据响应式

数据响应式是`MVVM`框架的一大特点，通过某种策略可以感知数据的变化。`Vue`中利用了`JS`语言特性[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，通过定义对象属性`getter/setter`拦截属性的访问

具体实现是在`Vue`初始化是，会调用`initState`，它会初始化`data,props`等，这里着重关注`data`初始化

`initState`位置:`src/core/instance/state.js`

`vue2.x`中一个组件一个watcher



#### 整体流程



## 问题

1.当用户实例化`vue`时，同时传入传入了`render,template,el`,谁会生效？谁的优先级更高呢？

`render --> template -->el`

2.通过`vue-cli`创建的项目，为什么初始化`Vue`时设置`el`或者`template`会报错,只能写`render`函数？

因为通过`vue-cli`创建的项目使用的`Vue`版本时`runtime only`版本，没有`compiler`功能



## 学习资料

[vue源码git地址](https://github.com/vuejs/vue)

[rollup](http://rollupjs.org/guide/en/)