## 组件

### 定义

官方定义：

> 可复用的`Vue`实例，并且带有一个名字，我们可以在一个通过`new Vue`创建的`Vue`根实例中，把这个组件作为自定义元素来使用。

其中

组件的名字，即是在声明组件时，开发者根据组件实际用途命名的。

可复用的`Vue`实例，即是组件也是一个`Vue`实例，与`new Vue()`接收相同的选项,例如`data,props,watch,computed,methods,components`以及声明周期等选项。

### 组件的使用场景

组件分类:

* 通用组件：实现最近本的功能，具有通用性和复用性，例如按钮组件，输入框组件等。
* 业务组件：完成具体的业务功能，具有一定的复用性，例如地图渲染，轮播组件等。
* 页面组件：组织应用各部分独立内容，需要时在不同页面组件间切换，例如列表页，详情页等。

### 组件的特点

* 可复用
  * 一旦注册，可以进行任意次数的复用
  * 组件的每次复用，都会创建一个新的组件实例，即是组件复用时，创建的组件是独立的，互不影响。
* 可维护性，代码可读性高
* 可测试性



### 组件的注册

组件的注册方式：

* 全局注册
* 局部注册

#### 全局注册

全局注册的组件，一旦注册成功后，可以在任何新创建的`Vue（new Vue）`根实例以及该实例对应的组件树中的子组件中使用。

##### 语法

```js
Vue.component(name,options)
```

参数说明：

`name`： 组件名称，即是在引用组件时使用的组件名称

`options`: 组件包含的属性选项，例如`data,props,methods,watch,computed`和声明周期等

注意：在自定的组件中不能使用`el`选项，因为`el`选项是根实例特有属性.

###### 组件名

组件名的命名方式：

* `kebab-case`,短横线命名法,例如
  * 引用组件时，组件名只能是`kebab-case`方式，即是组件名怎么定义的就怎么引用
* `PasecalCase`,首字母大写法
  * 引用时可以使用`kebab-case`或者`PascalCase`方式，但是在`DOM`中使用时只能使用`kebab-case`

##### 栗子

`kebab-case`方式:

```js
// 全局注册
Vue.component('operator-cmp', {
    template: `<div class="operator-btns">
            <button v-for="btn in btns" :key="btn.id" @click="btnClickHandler(btn)" style="margin-right:10px;">{{btn.name}}</button>  
        </div>`,
    props: {
        btns: {
            type: Array,
            default: []
        }
    },
    data() {

        return {

        }
    },
    methods: {
        btnClickHandler(btn) {
            this.$emit('btn-click', btn.callback)
        }
    }
})
```

引用：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2.x组件学习</title>
</head>

<body>
    <div id="app">
        <h1>组件学习</h1>
        <hr/>
        <h2>全局组件</h2>
        <div>{{count}}</div>
        <operator-cmp :btns="btns" v-on:btn-click="btnClickFn"></operator-cmp>
        <h3>全局组件的复用</h3>
        <operator-cmp :btns="btns1" v-on:btn-click="btnClickFn"></operator-cmp>
    </div>

    <script src="./js/vue.js"></script>
    <script src="./js/globalCmp.js"></script>
    <script src="./js/index.js"></script>
</body>

</html>
```

结果展示：

![image-20210204121026565](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210204121026565.png)

#### 局部注册

不通过`Vue.component`的方式注册组件，而是通过普通`javascript`对象的方式定义组件内容，然后在父组件的`components`属性中注入。

##### 栗子

局部组件：

```js
const cmp1 = {
    template: `<ul class="course-list">
       <li class="course" v-for="item in list" :key="item.id"> {{item.name}}</li>  
    </ul>`,
    props: {
        list: {
            type: Array,
            default: []
        }
    }
}
```

引用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2.x组件学习</title>
</head>

<body>
    <div id="app">
        <h1>组件学习</h1>
        <h2>局部组件</h2>
        <cmp1 :list="list"></cmp1>
        <h3>局部组件复用</h3>
        <cmp1 :list="list1"></cmp1>

    </div>

    <script src="./js/vue.js"></script>
    <script src="./js/cmp1.js"></script>
    <script src="./js/index.js"></script>
</body>

</html>
```

```js
const vm = new Vue({
    el: '#app',
    components: {
        "cmp1": cmp1
    },
    data() {
        return {
            count: 0,
            list: [{
                    id: 'front',
                    name: '前端培训'
                },
                {
                    id: 'server',
                    name: '服务端培训'
                },
                {
                    id: 'product',
                    name: '产品培训'
                }
            ],
            list1: [{
                    id: 'html',
                    name: 'html培训'
                },
                {
                    id: 'css',
                    name: 'css培训'
                },
                {
                    id: 'js',
                    name: 'js培训'
                }
            ]
        }
    }
})
```

结果展示：

![image-20210204121431567](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210204121431567.png)

### 在自定义组件中使用v-model

在自定义组件中使用`v-model`实现原理

`input`中使用`v-model`

```html
<input v-model="inputVal" />
```

等价于

```html
<input :value="inputVal" @input="inputVal = $event.target.value"/>
```

即是在自定义组件上使用`v-model`,为了让自定义组件中的`v-model`生效，那么，需要进行如下操作

组件内的 `<input>` 必须：

- 将`input`的 `value` 绑定到一个名叫 `value` 的`prop `上
- 在`input`的 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

##### 栗子

```js
Vue.component(`input-cmp`, {
    template: `<div class="custom-input">
        <h4>当前输入的值：{{currentVal}}</h4>
        <hr>
        <input :value="value" @input="$emit('input', $event.target.value)" @keyup="keyupHandler" />
    </div>`,
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentVal: ''
        }
    },
    methods: {
        keyupHandler(e) {
            this.currentVal = e.target.value;
        }
    }
})
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2.x组件学习</title>
</head>

<body>
    <div id="app">
        <h3>在自定义组件中使用v-model</h3>
        <input-cmp v-model="inputVal" @input="inputHandler"></input-cmp>
    </div>

    <script src="./js/vue.js"></script>
    <script src="./js/globalCmp.js"></script>
    <script src="./js/index.js"></script>
</body>

</html>
```

```js
const vm = new Vue({
    el: '#app',
    data() {
        return {
          
            inputVal: ''
        }
    },
    methods: {
        
        inputHandler(val) {
            this.inputVal = val;
        }
    }
})
```

结果展示：

![image-20210204152747943](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210204152747943.png)

### 自定义组件中使用插槽

#### 插槽

在组建中起到一个占位的作用，用于渲染特定的内容，当自定义组件有具体内容传过来时，插槽区域将被替换为对应的内容。

##### 具名插槽

自定义组件内部`slot`标签加上`name`属性

引用自定义组件时，具体的内容通过在`template`标签上加上`v-slot:name`来控制具体的插槽内容

#### 栗子

```js
Vue.component('slot-cmp', {
    template: `<div class="slot-cmp">
    <h4>插槽</h4>
    <slot></slot>
    <slot name="name1"></slot>
</div>`
})
```



```html
 <slot-cmp>
     <p>哈哈哈，这是插槽内容</p>
     <template v-slot:name1>
         <p>具名插槽</p>
     </template>

</slot-cmp>
```

结果展示：

![image-20210204154502489](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210204154502489.png)

## 组件通信方式

### 常见通信方式

* `props& $emit`
* `$emit/$on`
* `event bus`
* `vuex`

#### props & $emit

父子组件之间的通信方式：

* 父组件通过`props`给子组件传递数据
* 子组件通过`$emit`派发自定义事件然后监听该事件，通知父组件进行相关操作

组件事件的派发和监听发生在同一组件上,即是子组件通过$emit派发的事件，监听这个事件发生的主体也是在父组件中引用的改子组件，只不过事件的回调方法定义在父组件中。



##### 栗子

父组件：

```vue
<template>
  <div class="home-page">
   <div class="tabs">
      <div :class="['tab',curTab === tab.id ? 'active' : '']" @click="changeTab(tab)" v-for="tab in tabs"  :key="tab.id">{{tab.text}}</div>
   </div>
   <div class="tab-content">
    <component :is="curTab" :curText="curText" @notifyParent="notifyParentHandler"></component>
    <div v-if="childMsg">父组件我接受到您传递的信息：{{childMsg}}</div>
   </div>
  </div>
</template>

<script>

import frontCmp from '@/views/front/index.vue';
import spokenCmp from '@/views/spoken/index.vue';
import fincialCmp from '@/views/fincial/index.vue';
export default {
  name: 'App',
  data() {
    return {
      curTab:'frontCmp',
      tabs: [{
        id:'frontCmp',
        text:'前端提升笔记'
      },
      {
        id:'spokenCmp',
        text:'口语提升笔记'
      },
      {
        id:'fincialCmp',
        text:'财商提升笔记'
      }],
      curText: '前端提升笔记',
      childMsg:''
    }
  },
  components: {
    frontCmp,
    spokenCmp,
    fincialCmp
  },
  methods:{
    // 改变tab
    changeTab(tab) {
      this.curTab = tab.id;
      this.curText = tab.text;
      this.childMsg= '';
    },
    notifyParentHandler(msg) {
      this.childMsg = msg;
    }
  }
}
</script>

<style>
.home-page {
   width:100%;
   height:100%;
   padding: 0 20px;  
     box-sizing:border-box;
}
.tabs {
  width:100%;
  height:50px;
  line-height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  border-bottom: 1px solid #fb631a;


  margin-bottom:10px;
}
.tab {
  position:relative;
  font-size: 14px;
  font-weight:400;
  color:#fb631a;
  transition:all 0.3s;
  cursor:pointer;

}
.active {
  font-size:16px;
  font-weight:700;
}
.active:after{
  content:'';
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
  height:2px;
  background:#fb631a;
}
.tab-content {
  width:100%;
  height: calc(100% - 50px - 10px);
  padding: 20px;
  box-sizing:border-box;
}
</style>

```

子组件：

```vue
<template>
    <div class="page-container">
        <h2>父组件传递的信息prop</h2>
        <p>{{curText}}</p>
     <div>
      <button @click="$emit('notifyParent',curText)">给父组件打招呼</button>
     </div>
       
    </div>
</template>
<script>
export default {
    props:{
        curText: {
            type:String,
            default:''
        }
    }
}
</script>
<style lang="less" scope>
    
</style>
```

#### 事件总线

任意两个组件之间的通信方式

原理：观察者模式

对于没有直接亲缘关系的组件`A`，`B`，在组件`A`和组件`B`之间建立一个中心桥梁，来监听和派发事件

即是组件`A与B`之间的通信通过`bus`作为中间人来传递信息

![image-20210205113808032](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205113808032.png)

`bus`相当于一个存储事件的事件中心，当组件`A`派发事件则将相应的事件缓存,当组件`B`要和`A`通信，则`B`会通过`bus`的监听方法监听`A`派发的事件进行相关的操作

##### 实现

`bus.js`内容：

```js
/**
 * @description 事件总线： 对于没有直接亲缘关系的组件A，B，在组件A和组件B之间建立一个中心桥梁，来监听和派发事件
 * @author xialei
 * @date 05/02/2021
 * @class Bus
 */
class Bus {
    constructor() {
            // 缓存组件派发的事件
            this.callbacks = [];
        }
        // 事件监听: 
    $on(name, fn) {
            if (!this.callbacks[name]) {
                this.callbacks[name] = []
            }
            this.callbacks[name].push(fn)
        }
        // 事件派发
    $emit(name, args) {
            if (this.callbacks[name]) {
                this.callbacks[name].map(cb => { cb(args) });
            }
        }
        // 销毁事件
    $off(name) {
        if (this.callbacks[name]) {
            this.callbacks[name] = [];
        }
    }
}
```

###### 栗子

父组件：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件的通信方式</title>
</head>

<body>
    <div id="app">
        <h1>组件通信方式</h1>

        <hr>
        <h2>事件总线</h2>
        <cmp2></cmp2>
        <div style="border-bottom: 1px dashed #000;margin: 10px 0;"></div>
        <cmp3></cmp3>
    </div>
    <script src="./js/bus.js"></script>
    <script src="./js/vue.js"></script>
    <script src="./js/cmp2.js"></script>
    <script src="./js/cmp3.js"></script>
    <script src="./js/index2.js"></script>
</body>

</html>
```

子组件：`cmp2`派发事件到事件中心`bus`

```js
const cmp2 = {
    template: `<div class="cmp2">
    <h2>组件2</h2>
    <div >
        <button @click="sayHello">say hello</button>
    </div>
    </div>`,
    data() {
        return {
            msg: 'hello cmp3, it is me cmp2!'
        }
    },
    methods: {
        sayHello() {
            this.$bus.$emit('hello', this.msg)
        }
    },
    beforeDestroy() {
        this.$bus.$off('hello')
    },
}
```

子组件：`cmp3`监听`cmp2`派发到事件中心`bus`中的事件`hello`

```js
const cmp3 = {
    template: `<div class="cmp3">
        <h3>组件3</h3>
        <p style="color:#00a0e6;">监听组件2传递的消息：<strong>{{msg}}</strong></p>
    </div>`,
    data() {
        return {
            msg: '还没有接收到消息哟~'
        }
    },
    mounted() {
        this.$bus.$on('hello', (msg) => {
            this.msg = msg;
        })
    },
}
```

结果展示：

![image-20210205114309118](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205114309118.png)

### 边界通信方式

* `$parent`
* `$children`
* `$root`
* `$refs`
* `provide/inject`
* 非`props`属性
  * `$attrs`
  * `$listeners`

#### $root & $parent & $children

##### $root & $parent

兄弟组件之间通信,可以把共同的祖辈元素作为中间桥梁来进行通信

组件`A`通过父辈的`$emit`派发事件:

```js
this.$parent.$emit(eventName,params)
```

组件`B`通过父辈元素的`$on`监听组件A派发的事件:

```js
this.$parent.$on(eventName,callback)
```

###### 栗子

父组件：

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件的通信方式</title>
</head>

<body>
    <div id="app">
        <h1>组件通信方式</h1>
    
        <div style="border-bottom: 1px dashed #000;margin: 10px 0;"></div>
        <h3>$parent & $root</h3>
        <cmp4></cmp4>
        <cmp5></cmp5>
    </div>
    <script src="./js/bus.js"></script>
    <script src="./js/vue.js"></script>
    <script src="./js/cmp4.js"></script>
    <script src="./js/cmp5.js"></script>
    <script src="./js/index2.js"></script>
</body>

</html>
```

子组件：`cmp4`

```js
const cmp4 = {
    template: `<div class="cmp3">
        <h3>组件4：通过$parent派发事件给组件5</h3>
        <button style="color:red;" @click="dispatchEvent">派发事件</button>
    </div>`,
    data() {
        return {
            msg: 'hello cmp5~'
        }
    },
    methods: {
        dispatchEvent() {
            this.$parent.$emit('say-hello', this.msg)
        },
    }
}
```



子组件：`cmp5`

```js
const cmp5 = {
    template: `<div class="cmp3">
        <h3>组件5</h3>
        <p style="color:orange;">接收cmp4的信息：{{msg}}</p>
    </div>`,
    data() {
        return {
            msg: '暂时还没有收到消息哟~'
        }
    },
    mounted() {
        this.$parent.$on('say-hello', (msg) => {
            this.msg = msg;
        })
    },
}
```



结果展示：

![image-20210205120207485](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205120207485.png)

#### $children

父组件可以通过`$children`访问子组件实例实现父子组件的通信



##### 栗子

根组件：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件的通信方式</title>
</head>

<body>
    <div id="app">
        <h1>组件通信方式</h1>

        <hr>
        <h2>事件总线</h2>
        <cmp2></cmp2>
        <div style="border-bottom: 1px dashed #000;margin: 10px 0;"></div>
        <cmp3></cmp3>
        <div style="border-bottom: 1px dashed #000;margin: 10px 0;"></div>
        <h3>$parent & $root</h3>
        <cmp4></cmp4>
        <cmp5></cmp5>
        <div style="border-bottom: 1px dashed #000;margin: 10px 0;"></div>
        <h3>$children</h3>
        <cmp6></cmp6>
    </div>
    <script src="./js/bus.js"></script>
    <script src="./js/vue.js"></script>
    <script src="./js/cmp3.js"></script>
    <script src="./js/cmp6.js"></script>
    <script src="./js/index2.js"></script>
</body>

</html>
```

父组件：

```js
const cmp6 = {
    template: `<div>
        <h3>$children实现父子组件通信</h3>
        <cmp3></cmp3>
    </div>`,
    components: {
        cmp3
    },

    mounted() {
        console.log('this.$children :>> ', this.$children);
        this.$children[0].hi()
    },
    methods: {

    }
}
```



子组件

```js
const cmp3 = {
    template: `<div class="cmp3">
        <h3>组件3</h3>
        <p style="color:#00a0e6;">监听组件2传递的消息：<strong>{{msg}}</strong></p>
    </div>`,
    data() {
        return {
            msg: '还没有接收到消息哟~'
        }
    },
    mounted() {
        this.$bus.$on('hello', (msg) => {
            this.msg = msg;
        })
    },
    methods: {
        hi() {
            alert('hello parent')
        },
    }
}
```



展示效果

![image-20210205144531526](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205144531526.png)

#### provide & inject

祖先和后代

使用场景：祖先和后代之间的传值

`provide`注入的基本类型的数据是非响应式的，如果传入的引用类型是非响应式的也是非响应式的，但如果传入的是响应式的是那么就是响应式的。

##### 栗子

祖先：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件的通信方式</title>
</head>

<body>
    <div id="app">
        <h1>组件通信方式</h1>
        <cmp6></cmp6>
    </div>
    <script src="./js/bus.js"></script>
    <script src="./js/vue.js"></script>
    <script src="./js/cmp6.js"></script>
    <script src="./js/index2.js"></script>
</body>

</html>
```

index2.js:

```js
Vue.prototype.$bus = new Bus();
let vm = new Vue({
    el: '#app',
    components: {
        cmp6
    },
    provide: {
        txt: 'Hello I am your ancestors'
20    }
})
```

后代：

```js
const cmp6 = {
    template: `<div>
        <h3>$children实现父子组件通信</h3>
        <cmp3></cmp3>
        <hr />
        <h2>provide & inject实现祖先和后代之间的传值</h2>
        <p>{{txt}}</p>
    </div>`,
    components: {
        cmp3
    },
    inject: ['txt'],
    mounted() {
        console.log('this.$children :>> ', this.$children);
        this.$children[0].hi()
    },
    methods: {

    }
}
```



实现效果：



![image-20210205145636349](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205145636349.png)

#### 非props属性：$attrs &  $listeners

祖孙通信

非`props`属性：

> 包含了父作用域中不作为prop被识别（且获取）的绑定特性（`class`和`style`除外），当一个组件没有声明任何`prop`时，这里会包含所有父作用域的绑定(`class、style`除外),并且可以通过`v-bind="Sattrs"`传入内部组件。--在创建高级别的组件时非常有用。



从父组件中传递的属性,不需要子组件的`props`中声明

`$attrs`:父辈元素传递的非`prop`属性,`v-bind="$attrs"`

`$listeners`: 监听后代元素派发的事件,`v-on="$listeners"`

`$attrs`: 爷爷传递数据，爸爸转发数据，孙子接收数据

`$listeners`: 孙子派发事件，爸爸转发事件，爷爷接收事件

![image-20210205160909571](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205160909571.png)

##### 栗子

祖先：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$attrs & $listeners</title>
</head>

<body>
    <div id="app">
        <h1>非属性的特性：$attrs & $listeners</h1>
        <cmp7 hello="hello generation" @hey="heyFn"></cmp7>
        <p>收到来自后代元素的消息：{{txt}}</p>
    </div>
    <script src="./js/vue.js"></script>
    <script src="./js/cmp8.js"></script>
    <script src="./js/cmp7.js"></script>
    <script src="./js/index3.js"></script>
</body>

</html>
```

`index3.js`

```js
let vm = new Vue({
    el: '#app',
    components: {
        cmp7
    },
    data() {
        return {
            txt: '暂未收到后代元素的消息哟'
        }
    },
    methods: {
        heyFn(msg) {
            this.txt = msg;
        }
    }
})
```



父组件:

```js
const cmp7 = {
    template: `<div>
        <h2>$attrs & $listeners</h2>
        <cmp8 v-bind="$attrs" v-on="$listeners"></cmp8>
    </div>`,
    data() {
        return {

        }
    },
    methods: {},
    components: {
        cmp8
    }
}
```



后代组件：

```js
const cmp8 = {
    template: `<div>
        <h2>爷爷传递的非props属性:{{$attrs.hello}}</h2>
        <button @click="hey">hey</button>
    </div>`,
    data() {
        return {

        }
    },
    methods: {
        hey() {
            this.$emit('hey', 'yo parent~')
        },
    }
}
```



结果展示：

![image-20210205155812886](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210205155812886.png)

## 实战

### 表单组件



## 参考资料

[vue篇之事件总线（EventBus）](https://www.cnblogs.com/lst619247/p/14281782.html)

[组件基础](https://cn.vuejs.org/v2/guide/components.html)

[组件化应用构建](https://cn.vuejs.org/v2/guide/index.html#组件化应用构建)

[前端：组件化开发和模块化开发的区别到底在哪？？？](https://blog.csdn.net/zichen_jiang/article/details/108441491)

[组件、模块的区别是什么？](https://www.cnblogs.com/sunww/p/11301258.html)

[组件注册](https://cn.vuejs.org/v2/guide/components-registration.html)

[插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

[provide&inject](https://cn.vuejs.org/v2/api/#provide-inject)

[vue篇之事件总线（EventBus）](https://blog.csdn.net/q3254421/article/details/82927860)

[边界情况处理](https://cn.vuejs.org/v2/guide/components-edge-cases.html)

[async-validator](https://github.com/yiminghe/async-validator)