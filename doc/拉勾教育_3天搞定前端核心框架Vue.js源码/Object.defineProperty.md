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