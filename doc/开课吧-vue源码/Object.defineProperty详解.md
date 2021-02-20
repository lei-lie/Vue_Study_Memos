# Object.defineProperty()使用详解

## 作用

`Object.defineProperty()`是用于给目标对象`obj`新增属性，修改已经存在的属性，并返回该目标对象的方法，并且可以跟踪对象属性值的变化状态；



## 语法

```js
Object.defineProperty(obj, prop, descriptor)
```

### 参数说明

`obj`： 需要进行增加属性，修改属性值，删除属性操作的对象

`prop`: 给对象添加的新属性名，或者需要进行修改的原有属性名名

`descriptor`: 添加或修改的属性具有的特性

#### descriptor

##### 作用

* 让添加的属性可以被`for..in`,`Object.keys`等方法枚举到，即是通过`for..in`,`Object.keys`等方法可以得到这个属性,然后机型操作（修改属性值，删除属性等）
* 限定属性是否可修改
* 限定属性是否可以被操作
* 以不同的方式存储或获取属性值

##### 属性&方法

* `configurable`
  * 限制属性值是否可以被修改，以及限制属性是否可以被删除
  * 取值：`true | false`，默认值:`false`
    * `true` : 表示属性的特性在第一次设置之后可以被被重新定义特性，属性可以被删除,
    * `false`： 表示属性值不允许被修改，属性不允许被删除

* `enumerable`
  * 限制属性是否可以被枚举到，即是当使用`for...in`或者`Object.keys()`等方法遍历对象时，目标属性是否会出现在遍历结果中
  * 取值： `true | false`, 默认值:`false`
    * `true`: 属性可以出现在枚举结果中
    * `false`：属性不可以出现在枚举结果中
* `value`
  * 属性对应的值
  * 值的类型可以是JavaScript中任意有效的类型`Number,String,Boolean,Null,Undefined,Symbol,Object,Function,Array`等
  * 默认值:`undefined`
* `writable`
  * 限制属性值是否可以被修改
  * 取值：`true | false`，默认`false`
    * `true` ： 属性值可以被修改
    * `false`: 属性值不允许被修改
* `get`
  * 属性的`getter`方法，用户获取属性的值
  * 没有定义`getter`，则为`undefined`
* `set`
  * 属性的`setter`方法，用于修改属性值
  * 没有定义`setter`方法，则为`undefined`

###### descriptor可拥有的键值

![image-20210114105628533](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114105628533.png)

## 栗子

### 给目标对象新增属性

#### 通过value的方式设置属性值并改变该属性的值，枚举该属性

前面学习了`Object.defineProerpty`的基础知识，下面我们来实际操作下，首先定义一个空对象，然后通过`Object.defineProperty`方法给对象添加新属性，如下

```js
let obj = new Object();

Object.defineProperty(obj, 'name', {
    value: '设属性name'
})
console.log('obj :>> ', obj);
let app = document.querySelector('#app')
app.innerHTML = obj.name
```

![image-20210114185642579](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114185642579.png)

通过验证，可以知道通过`Object.defineProperty`可以给对象设置新属性并赋值，接下来我们试试修改刚设置的`name`属性的值，如下

```js
obj.name = '修改name属性的值'
console.log('obj :>> ', obj);
```

运行结果如下图

![image-20210114185857185](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114185857185.png)

图中展示的结果还是原来的数据，说明新设置的值没有生效，这是为什么呢？

原来是因为没有给属性设置`writable`属性，默认情况下属性的属性值是不能被更改，所以我们给新增的属性添加`writable`，重新测试，如下

```js
let obj = new Object();

Object.defineProperty(obj, 'name', {
    value: '设置属性name',
    writable: true, // 允许属性值可以被修改
})
console.log('obj :>> ', obj);
let app = document.querySelector('#app')
app.innerHTML = obj.name
obj.name = '修改name属性的值'
app.innerHTML = obj.name
console.log('obj :>> ', obj);
```

得到的结果如下图

![image-20210114190203330](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114190203330.png)

由图可知，这一次属性值被修改了，说明通过`vaule`设置属性值时，如果需要再次修改这个属性值，就需要设置`writable:true`，现在给对象新增属性和修改属性值的功能实现了，然后在实际的开发中，我们常常需要遍历对象的属性，进行相关的操作，那么接下来，我们试一下遍历下这个对象，看能不能得到我们刚才设置的属性，如下

```js
// 遍历对象，获取属性
let keys = Object.keys(obj)
console.log('keys :>> ', keys);
```

得到如图所示的结果

![image-20210114191552915](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114191552915.png)

我们并没有得到设置的`name`属性，这是为什么呢？

因为如果要让属性可枚举，需要给属性设置`enumerable:true`,默认情况下新增属性是不能被枚举到的，我们给`name`,设置`enumerable:true`然后来看看结果

````js
let obj = new Object();

Object.defineProperty(obj, 'name', {
    value: '设置属性name',
    writable: true, // 允许属性值可以被修改
    enumerable: true, // 属性允许被枚举到
})
console.log('obj :>> ', obj);
let app = document.querySelector('#app')
app.innerHTML = obj.name
obj.name = '修改name属性的值'
app.innerHTML = obj.name
console.log('obj :>> ', obj);
// 遍历对象，获取属性
let keys = Object.keys(obj)
console.log('keys :>> ', keys);
````



结果如下图：

![image-20210114191911721](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114191911721.png)

由图可知，设置`enumerable: true`后，我们就可以枚举到添加的属性了

实际开发中，有时候我们会涉及到删除属性的操作，接下来我们试一下能不能删除添加的`name`属性呢？

```js
delete obj.name
console.log('keys :>> ', keys);
```



结果如下：

![image-20210114192334929](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114192334929.png)

设置的name属性，并没有被删除，这是为什么呢？

原因是如果要删除新添加的属性，需要给属性设置`configurable:true`，如果设置为`false`，则重新定义属性会报错

```js
let obj = new Object();

Object.defineProperty(obj, 'name', {
    value: '设置属性name',
    writable: true, // 允许属性值可以被修改
    enumerable: true, // 属性允许被枚举到
    configurable: false, // 允许删除属性和重新定义属性
})
console.log('obj :>> ', obj);
let app = document.querySelector('#app')
app.innerHTML = obj.name
obj.name = '修改name属性的值'
app.innerHTML = obj.name
console.log('obj :>> ', obj);
// 遍历对象，获取属性
let keys = Object.keys(obj)
console.log('keys :>> ', keys);

Object.defineProperty(obj, 'name', {
    value: '设置属性name',
    writable: true, // 允许属性值可以被修改
    enumerable: true, // 属性允许被枚举到
    configurable: true, // 允许删除属性和重新定义属性
})

```



![image-20210114192843924](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210114192843924.png)





## 学习

[Object.defineProperty详解](https://www.cnblogs.com/ldq678/p/13854113.html)