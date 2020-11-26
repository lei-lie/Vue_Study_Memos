## Object.defineProperty()

### 作用

直接在一个对象上定义一个新属性或者修改这个对象的已存在的属性，并且返回此对象

### 语法

```javascript
Object.defineProperty(obj, prop, descriptor)
```

 

参数说明： 

`obj`: 用于定义新属性或修改已有属性的对象

`prop`: 新增的属性或者需要修改的属性名称

`descriptor`: 新增或修改属性的具体实现



#### descriptor中的属性

`enumerable`:决定属性是否可枚举

`configurable`: 属性是否可配置，即是是否可以使用delete删除或者通过`defineProperty`重新定义

`writable`: 决定属性的值否可以被改变

`value`: 属性对应的值

`get`: 属性的`getter`函数，如果没有`getter`,则为`undefined`,当属性被访问时调用，执行时不传入任何参数，但是会传入`this`对象

`set`: 属性的`setter`函数，如果没有`setter`，则为`undefined`，单属性值值被修改时调用，接受一个参数（被赋予的新值），也会传入`this`

