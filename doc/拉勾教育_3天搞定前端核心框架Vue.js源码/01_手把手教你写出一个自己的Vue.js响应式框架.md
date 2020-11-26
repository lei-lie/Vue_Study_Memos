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

[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

使用`Object.defineProperty`修改数据

```javascript
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



## 发布订阅模式

## 手写Vue.js响应式原理

