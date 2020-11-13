## Virtual DOM 概述

### 学习目标

* 了解什么是虚拟`DOM`，以及虚拟`DOM`的作用
* `Snabbdom`的基本使用
* `Snabbdom`的源码解析

### 虚拟DOM(Virtual DOM)

#### 定义

> 虚拟`DOM`不是真实的`DOM`，它是由普通的`JS`对象来描述`DOM`对象

即： 虚拟`DOM`就是一个普通的`JavaScript`对象，用于描述真实的`DOM`

#### 为什么使用虚拟DOM

1. 创建成本角度

- 真实`DOM`对象它的成员非常多，所以创建真实`DOM`的成本非常高。

```javascript
let ele = document.querySelector('#app');
let s = '';
for (let key in ele) {
    s += key+',';
}
console.log(s);
```



- 创建一个虚拟`DOM`（普通的`JavaScript`对象）的属性非常少，所以创建一个虚拟`DOM`的成本比真实`DOM`要小很多

```javascript
{
	sel: 'div',// 标签
	data: {},
	children: undefined,
	text:'Hello Virtual DOM', // 标签文本内容
	elm:undefined,
	key: undefined
}
```

2. 前端开发发展的角度

- 手动操作`DOM`比较麻烦，还需要考虑浏览器兼容性问题，虽然有`jQuery`等库简化了`DOM`操作，但随着项目的复杂程度提升，`DOM`操作也跟着提升了
- 为了简化`DOM`的复杂操作，于是出现了各种`MVVM`框架，`MVVM`框架解决了视图和状态的同步问题
- 为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是`Virtual DOM`出现了
- `Virtual DOM`的好处是当前状态改变时不需要立即更新`DOM`，只需要创建一个虚拟树来描述`DOM`，`Virtual DOM`内部将弄清楚如何有效（`diff`）的更新`DOM`
- 参考`GitHub`上的`Virtual DOM`的描述
  - `Virtual DOM`可以维护程序的状态，跟踪上一次的状态
  - 通过比较前后两次状态的差异更新真实的`DOM`



![image-20201113145823512](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201113145823512.png)





## 参考

[虚拟DOM（Virtual DOM）](http://www.mamicode.com/info-detail-3059000.html)

[VirtualDOM Git地址](https://github.com/Matt-Esch/virtual-dom)

