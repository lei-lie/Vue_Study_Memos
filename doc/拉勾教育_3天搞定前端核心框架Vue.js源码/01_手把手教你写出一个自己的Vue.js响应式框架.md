## 数据响应式概述

### 课程目标

* 模拟一个最小版本的`Vue`

* 响应式原理在面试中的常问问题
* 学习别人优秀的经验，转换为自己的
* 实际项目中出问题的原理层面的解决
  * 给Vue实例新增一个成员是否是响应式的？
  * 给属性重新赋值成对象，是否是响应式的？
* 为学习Vue源码做铺垫

### 数据驱动

`Vue`中重要的概念：

* 数据驱动
* 响应式核心原理
* 发布订阅这模式和观察者模式

#### 数据驱动涉及的三个名词

##### 数据响应式：

数据指的是数据模型

数据模型就是普通的JavaScript对象，

数据响应式的核心：当我们修改数据时，视图会进行更新，避免了繁琐的DOM操作，提高开发效率

##### 双向绑定：

数据发生改变，视图也会发生改变

视图发生改变，数据也随之改变

`Vue`中可以通过`v-model`在表单元素上创建双向绑定

##### 数据驱动: 

`Vue`最独特的特性之一

开发过程中仅仅需要关心数据本身，你需要关心数据是如何渲染到视图上的

即是：开发者只需要提供视图需要的数据，至于数据如何渲染到视图上不需要关心



### Vue2.x 数据响应式核心原理 

`Vue2.x` 数据响应式核心原理: 通过`Object.defineProperty`做数据劫持

[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

使用`Object.defineProperty`修改数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Object.defineProperty()使用实例</title>
</head>
<body>
    <div id="app">hello Object.defineProperty()</div>
    <script>
        let data = {
            title: 'hello Object.defineProperty()'
        }
        // 模拟Vue实例
        let vm = {}
        // 数据劫持：当访问或设置vm中成员的时候，做一些干预
        Object.defineProperty(vm,'title',{
            enumerable: true,// 可枚举（可遍历）
            configurable: true,// 可配置（可以使用delete删除，可以通过defineProperty更新定义）,
            // 当获取值得时候执行
            get() {
                console.log('get :>> ', data.title);
                return data.title
            },
            // 当设置值的时候执行
            set(newVal) {
                console.log('set :>> ', newVal);
                if (newVal === data.title) {
                    return
                }
                data.title = newVal;
                // 数据更新时，更新DOM数据
                document.querySelector('#app').textContent = data.title;
            },

        })
        // 测试
        vm.title = 'hello reactivity'
        console.log('vm.title :>> ', vm.title);
    </script>
</body>
</html>
```

结果：

![image-20201126191434412](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201126191434412.png)

Vue2.x中实现响应式的基本原理：

当开发者将一个普通的`JavaScript`对象传入`Vue`实例并作为data选项时，`Vue `会遍历传入的`JavaScript`对象，并且通过`Object.defineProperty`把对象中的属性全部转换为`getter/setter`，便于当对象的属性被访问或者修改时，`Vue`能够追踪依赖

官网：

![image-20201126192928843](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201126192928843.png)

### Vue3.x数据响应式核心原理

[MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

[Vue3.0](https://v3.vuejs.org/guide/introduction.html)数据响应式核心原理: `Vue3.0`中通过使用`ES6`中的`Proxy`来实现数据劫持

`Proxy`:是直接监听对象，而非属性

## 发布订阅模式&观察者模式

### 发布-订阅模式（Publish-Subscribe Pattern, pub-sub）

三要素： 订阅者、发布者，事件中心

> **发布 - 订阅模式** （Publish-Subscribe Pattern, pub-sub）又叫观察者模式（Observer Pattern），它定义了一种一对多的关系，让多个订阅者对象同时监听某一个发布者，或者叫主题对象，这个主题对象的状态发生变化时就会通知所有订阅自己的订阅者对象，使得它们能够自动更新自己。

现实生活中的例子：

小白（订阅者）想要买一本考试参考书，于是去了某书店，书店的老板（发布者）告诉小明，参考书暂时缺货，如果小明想要的话，可以留下联系方式，等参考书补货后会通知小明，于是小明留下了自己的联系方式，几天后，小明接到书店老板的电话说参考书到了，可以到店购买了（订阅的消息），这就是一个发布-订阅的过程



[Vue中的自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)以及[Node.js](https://nodejs.org/dist/latest-v14.x/docs/api/events.html)中的事件机制都采用了发布-订阅模式

#### 模拟Vue中自定义事件的实现

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vue中自定义事件的使用</title>
    </head>

    <body>
        <div id="app">
        </div>
        <script>
        class EventBus {
            constructor() {
                // null 不需要原型 {'click': [fn1,fn2]}
                this.subs = Object.create(null);
            }
            // 注册事件
            $on(eventType, fn) {
                //   if (!this.subs[eventType]) {
                //       this.subs[eventType] = [fn]
                //   } else  {
                //       this.subs[eventType].push(fn)
                //   }
                this.subs[eventType] = this.subs[eventType] || [];
                this.subs[eventType].push(fn);
            }
            // 触发事件
            $emit(eventType, args) {
                if (this.subs[eventType]) {
                    this.subs[eventType].map(handler => handler(args))
                }
            }
        }
        let bus = new EventBus()
        bus.$on('click-event', (param) => {
            console.log('click-event >> ', param);
        })
        bus.$on('change-event', (param) => {
            console.log('change-event >> ', param);
        })

        bus.$emit('click-event', 'clicked')
        bus.$emit('change-event', 'changed')
    </script>
    </body>

</html>
```



### 观察者模式（Observer Pattern ,Watcher）

观察者(订阅者)--`Watcher`

`update`: 每个观察者都有一个update方法，当事件发生时，具体要做的事情

目标（发布者）--`Dep`

`subs`数组：存储所有的观察者

`addSubs`: 添加观察者

`notify()`: 当事件发生，调用所有观察者的`update`()方法

##### 实现简单的观察者模式



观察者模式和发布-订阅模式的区别：

观察者模式没有事件中心，只有发布者和订阅者，并且发布者需要知道订阅者的存在



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>观察查者模式</title>
</head>

<body>
    <div id="app">
    </div>
    <script>
        //发布者-目标 dependence
        class Dep {
            constructor() {
                // 存储所有的观察者
                this.subs = []
            }
            // 添加观察者
            addSub(sub) {
                if (sub && sub.update) {
                    this.subs.push(sub)
                }
            }
            // 通知所有的观察者
            notify() {
                this.subs.map(sub => sub.update())
            }
        }
        // 订阅者--观察者
        class Watcher {
            constructor() {}
            // 更新视图
            update() {
                console.log('update');
            }
        }
        let dep  = new Dep()
        let watcher = new Watcher()
        dep.addSub(watcher)
        dep.notify()
    </script>
</body>

</html>
```



### 总结

观察者模式：

是由具体的目标，例如当事件触发，发布者就会去调用观察者的方法，所以观察者模式的订阅者和发布者之间存在依赖关系

发布订阅模式：

由统一的调度中心（中间桥梁）调用，因此发布者和订阅者不需要知道对方的存在

![发布-订阅模式 vs 观察者模式](D:\00_workspace\00_mine\Vue_Study_Memos\doc\拉勾教育_3天搞定前端核心框架Vue.js源码\发布-订阅模式 vs 观察者模式.png)



## 手写Vue.js响应式原理

### Vue响应式模拟

最小版本的`Vue`需要的功能

![image-20201127165057264](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201127165057264.png)

##### Vue

![image-20201127165658374](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201127165658374.png)

实现：

```js
class Vue {
  constructor(options) {
    // 1.通过属性保存选项的数据
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
    // 2.把data中的属性转换成getter/setter,注入Vue实例
    this._proxyData(this.$data);
    // 3.调用observer对象，监听数据的变化
    new Observer(this.$data);
    // 调用complier属性解析指令和插值表达式
    new Compiler(this)
  }

  // 代理数据
  _proxyData(data) {
    if (data && Object.keys(data).length > 0) {
      // 遍历data中的所有属性
      Object.keys(data).map((key) => {
        // 把data中的属性转换成getter/setter
        Object.defineProperty(this, key, {
          enumerable: true, // 可枚举（可遍历）
          configurable: true, // 可配置（可以使用delete删除，可以通过defineProperty更新定义）,
          get() {
            return data[key];
          },
          set(newVal) {
            if (newVal === data[key]) {
              return;
            }
            data[key] = newVal;
          },
        });
      });
      // 把data中的属性注入vue实例
    }
  }
}

```

##### Observer

![image-20201127173623579](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201127173623579.png)

实现：

```js
class Observer {
  constructor(data) {
    this.walk(data);
  }
  // 遍历对象的所有属性
  walk(data) {
    // 1.判断data是否是对象
    if (!data && !Object.prototype.toString.call(data) === '[object Object]') {
      return;
    }
    if (Object.keys(data).length > 0) {
      // 2.遍历data对象的所有属性
      Object.keys(data).map((key) => {
        this.defineReactivity(data, key, data[key]);
      });
    }
  }
  // 将属性转换成响应式数据:getter/setter
  defineReactivity(data, key, val) {
    let that = this;
    if (Object.prototype.toString.call(val) === '[object Object]') {
      // 如果val是对象，遍历val对象中的所有属性转换为响应式数据
      this.walk(val);
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        //return data[key] 不能在`defineReactivity`的`get`中通过`data[key]`的方式返回数据，原因是`data[key]`会一直调用`get`方法，形成死递归，导致栈溢出
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        // 如果newVal是对象，遍历newVal对象中的所有属性转换为响应式数据
        if (Object.prototype.toString.call(newVal) === '[object Object]') {
          that.walk(newVal);
        }
        val = newVal;
        // 发送通知
      },
    });
  }
}

```



注意：

不能在`defineReactivity`的`get`中通过`data[key]`的方式返回数据，原因是`data[key]`会一直调用`get`方法，形成死递归，导致栈溢出

![image-20201127173513749](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201127173513749.png)

##### Compiler

![image-20201127175536714](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201127175536714.png)

实现：

```js
class Compiler {
  constructor(vm) {
    // 缓存el,vm
    this.el = vm.$el;
    this.vm = vm;
    // 
    this.compile(this.el)
  }
  // 编译模板，处理元素节点和文本节点
  compile(el) {
      // 变量el中 所有节点
      let childNodes = el.childNodes
      Array.from(childNodes).map(node => {
          // 判断node节点是否存在子节点，存在则递归调用compiler
          if(node.childNodes && node.childNodes.length > 0) {
              this.compile(node)
          }
          // 判断是否是文本节点
          if (this.isTextNode(node)) {
              // 编译文本节点
              this.compileText(node)
          }
          // 判断是否是元素节点
          if (this.isElementNode(node)) {
              // 编译元素节点
              this.compileElement(node)
          }
      })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    let attrs = node.attributes
    console.log(attrs);
    // 遍历所有属性节点
    Array.from(attrs).map(attr => {
        let attrName = attr.name
        // 判断是否是指令
        if (this.isDirective(attrName)) {
            // v-text --> text
            attrName = attrName.substr(2)
            let key = attr.value
            this.update(node,key,attrName)
        }
    })
  }
  // 处理v-text和v-model指令
  update(node,key,attrName) {
      // 指令对应的方法
      let updateFn = this[attrName+'Updater']
      updateFn && updateFn(node,this.vm[key])
  }
  // 处理v-text,获取对应的值赋给DOM元素
  textUpdater(node,val) {
      node.textContent = val
  }
  // 处理v-model
  modelUpdater(node,val) {
      node.value = val
  }
  // 编译文本节点，处理插值表达式,替换为真实数据
  compileText(node) {
      console.dir(node);
      // {{ msg }}
      let reg = /\{\{(.+?)\}\}/
      let text = node.textContent
      if (reg.test(text)) {
        let key = RegExp.$1.trim()
        node.textContent = text.replace(reg,this.vm[key])
      }
  }
  // 判断元素属性的名称是否是指令
  isDirective(attrName) {
    return attrName.startsWidth('v-');
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}

```

##### Dep

![image-20201130102319374](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201130102319374.png)

```js
class Dep {
    constructor() {
        // 存储所有观察者
        this.subs = []
    }
    // 添加watcher
    addSub(sub) {
        // 判断是否是watcher
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 发布通知
    notify () {
        // 遍历所有的watcher，调用自身的update操作
        if (this.subs.length > 0) {
            this.subs.map(sub => {
                sub.update()
            })
        }
    }
}


```



##### Watcher

![image-20201130102308410](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201130102308410.png)



```js
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数负责更新视图
        this.cb = cb
        // 将当前的Watcher记录到Dep的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中调用addSub
        this.oldValue = vm[key]
        // 防止重复添加
        Dep.target = null
    }

    // 当数据发生变化时更新视图
    update() {
        debugger
        let newValue = this.vm[this.key]
        if (newValue === this.oldValue) {
            return
        }
        this.cb(newValue)
    }
}
```



##### 双向绑定

数据发生改变更新视图，视图发生变化更新数据

## 参考

[Javascript中理解发布--订阅模式](https://www.cnblogs.com/itgezhu/p/10947405.html)

[javascript设计模式精讲]|(https://www.imooc.com/read/38/article/493)