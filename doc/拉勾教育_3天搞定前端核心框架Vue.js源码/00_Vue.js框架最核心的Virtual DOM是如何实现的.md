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

```javascript
align,title,lang,translate,dir,hidden,accessKey,draggable,spellcheck,autocapitalize,contentEditable,isContentEditable,inputMode,offsetParent,offsetTop,offsetLeft,offsetWidth,offsetHeight,style,innerText,outerText,onabort,onblur,oncancel,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onerror,onfocus,onformdata,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onpause,onplay,onplaying,onprogress,onratechange,onreset,onresize,onscroll,onseeked,onseeking,onselect,onstalled,onsubmit,onsuspend,ontimeupdate,ontoggle,onvolumechange,onwaiting,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend,onwheel,onauxclick,ongotpointercapture,onlostpointercapture,onpointerdown,onpointermove,onpointerup,onpointercancel,onpointerover,onpointerout,onpointerenter,onpointerleave,onselectstart,onselectionchange,onanimationend,onanimationiteration,onanimationstart,ontransitionrun,ontransitionstart,ontransitionend,ontransitioncancel,oncopy,oncut,onpaste,dataset,nonce,autofocus,tabIndex,attachInternals,blur,click,focus,onpointerrawupdate,enterKeyHint,namespaceURI,prefix,localName,tagName,id,className,classList,slot,attributes,shadowRoot,part,assignedSlot,innerHTML,outerHTML,scrollTop,scrollLeft,scrollWidth,scrollHeight,clientTop,clientLeft,clientWidth,clientHeight,attributeStyleMap,onbeforecopy,onbeforecut,onbeforepaste,onsearch,elementTiming,onfullscreenchange,onfullscreenerror,onwebkitfullscreenchange,onwebkitfullscreenerror,onbeforexrselect,children,firstElementChild,lastElementChild,childElementCount,previousElementSibling,nextElementSibling,after,animate,append,attachShadow,before,closest,computedStyleMap,getAttribute,getAttributeNS,getAttributeNames,getAttributeNode,getAttributeNodeNS,getBoundingClientRect,getClientRects,getElementsByClassName,getElementsByTagName,getElementsByTagNameNS,hasAttribute,hasAttributeNS,hasAttributes,hasPointerCapture,insertAdjacentElement,insertAdjacentHTML,insertAdjacentText,matches,prepend,querySelector,querySelectorAll,releasePointerCapture,remove,removeAttribute,removeAttributeNS,removeAttributeNode,replaceWith,requestFullscreen,requestPointerLock,scroll,scrollBy,scrollIntoView,scrollIntoViewIfNeeded,scrollTo,setAttribute,setAttributeNS,setAttributeNode,setAttributeNodeNS,setPointerCapture,toggleAttribute,webkitMatchesSelector,webkitRequestFullScreen,webkitRequestFullscreen,ariaAtomic,ariaAutoComplete,ariaBusy,ariaChecked,ariaColCount,ariaColIndex,ariaColSpan,ariaCurrent,ariaDescription,ariaDisabled,ariaExpanded,ariaHasPopup,ariaHidden,ariaKeyShortcuts,ariaLabel,ariaLevel,ariaLive,ariaModal,ariaMultiLine,ariaMultiSelectable,ariaOrientation,ariaPlaceholder,ariaPosInSet,ariaPressed,ariaReadOnly,ariaRelevant,ariaRequired,ariaRoleDescription,ariaRowCount,ariaRowIndex,ariaRowSpan,ariaSelected,ariaSetSize,ariaSort,ariaValueMax,ariaValueMin,ariaValueNow,ariaValueText,getAnimations,replaceChildren,createShadowRoot,getDestinationInsertionPoints,nodeType,nodeName,baseURI,isConnected,ownerDocument,parentNode,parentElement,childNodes,firstChild,lastChild,previousSibling,nextSibling,nodeValue,textContent,ELEMENT_NODE,ATTRIBUTE_NODE,TEXT_NODE,CDATA_SECTION_NODE,ENTITY_REFERENCE_NODE,ENTITY_NODE,PROCESSING_INSTRUCTION_NODE,COMMENT_NODE,DOCUMENT_NODE,DOCUMENT_TYPE_NODE,DOCUMENT_FRAGMENT_NODE,NOTATION_NODE,DOCUMENT_POSITION_DISCONNECTED,DOCUMENT_POSITION_PRECEDING,DOCUMENT_POSITION_FOLLOWING,DOCUMENT_POSITION_CONTAINS,DOCUMENT_POSITION_CONTAINED_BY,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC,appendChild,cloneNode,compareDocumentPosition,contains,getRootNode,hasChildNodes,insertBefore,isDefaultNamespace,isEqualNode,isSameNode,lookupNamespaceURI,lookupPrefix,normalize,removeChild,replaceChild,addEventListener,dispatchEvent,removeEventListener,
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



#### 虚拟DOM的作用

- 维护视图和状态的关系,使用虚拟DOM可以记录上一次的状态，只更新状态改变的位置
- （只有）在复杂视图的情况下（才会）提升性能
- 除了渲染DOM以外，还可以实现服务端渲染如SSR（Nuxt.js/Next.js），或可以通过特殊手段把虚拟DOM转化成原生应用（Weex/React Native）以及小程序（mpvue/uni-app）等

#### Virtual DOM开源库

- [Snabbdom](https://github.com/snabbdom/snabbdom)
  - Vue2.x内部使用的Virtual DOM就是改造的Snabbdom
  - 大约2000SLOC（single line of code）
  - 通过模块可扩展
  - 源码使用TypeScript（基于TypeScript开发的）
  - 最快的Virtual DOM之一
- virtual-dom

## Snabbdom基本使用

### 创建项目

1. 创建项目并安装parcel(打包工具)

```javascript
# 创建项目目录
mkdir snabbdom-demo
# 进入项目
cd snabbdom-demo
# 创建package.json
npm init -y
# 安装本地的parcel
npm install parcel-bundler --save-dev
```

2. 配置package.json的scripts

```javascript
"scripts": {
    "dev": "parcel index.html --open",
    "build": "parcel build index.html"
  },
```

3. 创建目录结构

```javascript

```

4. 安装`snabbdom`

```javascript
npm install snabbdom --save
```



### 导入snabbdom



`snabbdom`核心，仅仅是提供基本功能，只导出三个函数	

`init()`: 一个高阶函数，返回`patch`

`h()`： 返回虚拟节点`VNode`

```javascript
new Vue({
router,
store,
render: h => h(App)
}).$mount('#app')
```



`thunk()`: 一种优化策略，可以在处理不可变数据时使用

`patch`的作用:

对比两个虚拟`DOM`，把差异更新到真实`DOM`

#### snabbdom模块

`snabbdom`的核心库并不能处理元素的属性/样式/事件等，需要单独引入相应的模块

常用模块：

* attributes
  * 设置DOM元素的属性，使用setAttribute()
  * 处理布尔类型的属性
* props
  * 和attributes模块相似，设置DOM元素的属性element[attr]=value
  * 不处理布尔类型的属性
* class
  * 切换类样式
  * 给元素设置类样式是通过sel选择器
* dataset
  * 设置data-*自定义属性
* eventlisteners
  * 注册和移除事件
* style
  * 设置行内样式，支持动画
  * delayed/remove/destory





#### 案例1

```javascript
// 导入snabbdom模块
import { init } from 'snabbdom/build/package/init';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { h } from 'snabbdom/build/package/h'; // helper function for creating vnodes
/**
 * 功能： helloworld div中放置h1,p
 */
// 1.初始化patch函数以及出入需要的模块
let patch = init([
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);
// 2.获取根节点
let app = document.getElementById('app');

// 3.创建Vnode
/* 
h()只传递两个参数
第一个参数： 标签+选择器
第二个参数：如果是字符串的话就是标签的内容
 */
let vnode = h('div#container.cls','hello world')

// 4.对比两个虚拟DOM
/*
    第一个参数：patch中传入真实DOM作为参数，则patch在执行时会把真实DOM转换为Vnode，然后再和第二个参数进行对比，并且返回一个Vnode
    第二个参数: Vnode
    返回值： Vnode
*/
let oldVnode = patch(app,vnode);

console.log(oldVnode);
// 假设的时刻，从服务器上获取数据，并把数据放到创建的div中
let vnode1 = h('div','hello snabbdom')


patch(oldVnode,vnode1)
```

结果：

![image-20201124185121605](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201124185121605.png)

#### 案例2

```javascript
// 导入snabbdom模块
import { init } from 'snabbdom/build/package/init';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { h } from 'snabbdom/build/package/h'; // helper function for creating vnodes
/**
 * 功能： helloworld div中放置h1,p
 */
// 1.初始化patch函数以及出入需要的模块
let patch = init([
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);
// 2.获取根节点
let app = document.getElementById('app');

// 3.创建Vnode
/* 
h()只传递两个参数
第一个参数： 标签+选择器
第二个参数：数组，放置的子元素
 */
let vnode = h('div#container.cls',[
    h('h1','hello snabbdom'),
    h('p','this is a paragraph')
])

// 4.对比两个虚拟DOM
/*
    第一个参数：patch中传入真实DOM作为参数，则patch在执行时会把真实DOM转换为Vnode，然后再和第二个参数进行对比，并且返回一个Vnode
    第二个参数: Vnode
    返回值： Vnode
*/
let oldVnode = patch(app,vnode);
console.log(oldVnode);
// 假设的时刻，从服务器上获取数据，并更新h1和p标签的内容

setTimeout(function() {
console.log('2s后更改内容');
    vnode = h('div#container.cls',[
        h('h1','hello world'),
        h('p','hello p')
    ])
    patch(oldVnode,vnode)
    // 清空内容
    // patch(oldVnode,null) // 报错
    patch(oldVnode, h('!'))
},2000)
```





清空页面内容通过`patch(oldVnode, null)`，会出现如下错误

![image-20201124185937793](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20201124185937793.png)

解决方案，将null通过h()创建注释节点的方式实现

```javascript
 patch(oldVnode, h('!'))
```

#### 案例3

```javascript
// 导入snabbdom模块
import { init } from 'snabbdom/build/package/init';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { h } from 'snabbdom/build/package/h'; // helper function for creating vnodes

// 初始化并注册模块
let patch = init([classModule, propsModule, styleModule, eventListenersModule]);
let app = document.getElementById('app')
// h函数的第二个参数已对象的方式使用模块
let vnode = h('div#container.cls',{
    style: {
        backgroundColor: 'orange',
        padding:'10px'

    },
    on:{
        click: clickHandler
    }
},[
    h('h1','hello snabbdom'),
    h('p','hello p')
])
let oldVnode = patch(app,vnode)

function clickHandler(e) {
    alert('clicked')
}
```

#### 总结

`snabbdom`核心

1.调用`init`函数返回`patch`函数

2.通过`h`函数创建虚拟节点

3.通过`patch`函数比较两个虚拟节点，计算差异，并将差异更新到真实`DOM`上

## snabbdom源码解析

### 如何学习源码

1. 先宏观了解，即是对一个库做整体的了解，即是了解一个库的核心执行过程

2. 然后带着目标看源码
3. 看源码过程要求不求甚解，即是看源码的过程要围绕核心目标，先把主线逻辑走通，涉及分支的部分先不看
4. 调试，主线逻辑走通之后，还可以写一个小的demo，对代码进行调试，加深理解
5. 参考别人写文章

### snabbdom的核心执行流程

1. 使用`h()`创建`JavaScript`对象（`Vnode`）来，描述真实`DOM`

2. 通过`init()`注册模块，返回`patch()`

3. 通过`patch()`比较两个`Vnode`

4. 把变化的内容更新到真实`DOM`上



### snabbdom源码结构

源码位置：https://github.com/snabbdom/snabbdom

#### src目录结构

```javascript
h.ts # h(),用来创建vnode
hooks.ts # 所有钩子函数的定义
htmldomapi.te # dom api 的封装
init.ts # init函数
is.ts # 定义是否是数组，字符串或数字
jsx-global.ts # jsx相关
jsx.ts # jsx相关
thunk.ts # thunk函数
tovnode.ts # 转化为Vnode
vnode.ts # Vnode定义
helpers # 
	attachto.ts # 定义类型，Vnode.ts中使用
modules # 模块
	attributes.ts # 属性模块
	class.ts # 类样式模块
	dataset.ts # dataset模块
	eventlistener.ts # 绑定，删除事件模块
	hero.ts # 
	module.ts # 模块中要使用的钩子函数
	props.ts # 属性
	style.ts # 行内样式模块

```



#### h函数

###### h()介绍

在日常使用`Vue`来开发项目时，见过`h()`

```javascript
new Vue({
router,
store,
render: h => h(App)
}).$mount('#app')
```

`h()`最早见于`hyperscript`，使用`JavaScript`创建的超文本

`snabbdom`中的`h()`不是用来创建超文本，而是用于创建`vnode`

函数的重载

概念

参数个数或类型不同的函数

JavaScript中没有重载的概念

typescript中有重载，不过重载的实现还是通过代码调整参数

```javascript
import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement = VNode | string | number | undefined | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

function addNS(
  data: any,
  children: VNodes | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data;
      if (childData !== undefined) {
        addNS(
          childData,
          (children[i] as VNode).children as VNodes,
          children[i].sel
        );
      }
    }
  }
}
/* h函数的重载  都返回vnode*/
// 一个参数：元素
export function h(sel: string): VNode;
// 两个参数：第一个参数元素，第二个参数：
export function h(sel: string, data: VNodeData | null): VNode;
// 两个参数
export function h(sel: string, children: VNodeChildren): VNode;
// 三个参数
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;
// 三个参数
export function h(sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {};
  var children: any;
  var text: any;
  var i: number;
  
  // 处理参数实现重载
  if (c !== undefined) {// c有值的话是传入了三个参数，即是处理三个参数的情况sel、data、children/text
    if (b !== null) {// 传入了b则将b值存放到data中，模块处理时需要的数据
      data = b;
    }
    if (is.array(c)) {// 如果c为数组类型，则将c的值存放到children中，表示c是子节点
      children = c;
    } else if (is.primitive(c)) {// 如果c是字符串或数字，则c存放到text中，即c是元素的内容
      text = c;
    } else if (c && c.sel) {// 如果c是vnode（判断c是否具有sel属性），则将c转换成数组，设置给children
      children = [c];
    }
  } else if (b !== undefined && b !== null) {// 如果b有值，表示有两个参数

    if (is.array(b)) {// 如果b是数组，则表示b是子节点，将b设置给children
      children = b;
    } else if (is.primitive(b)) {// 如果b是字符串或者数字，表示b是元素的内容，则将b设置给text
      text = b;
    } else if (b && b.sel) {// 如果b是Vnode,则将b转换为数组,设置给children
      children = [b];
    } else {// 如果b是对象，则将b设置给data,
      data = b;
    }
  }
  // 判断children是否有值
  if (children !== undefined) {
    // 有值，则遍历children,处理children中的原始值（String|Number）
    for (i = 0; i < children.length; ++i) {
      // 判断每一个元素是否是字符串或者数字，如果是原始类型，则创建文本节点
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }
  // 处理SVG
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    // 给svg添加命名空间
    addNS(data, children, sel);
  }
  // 返回vnode
  return vnode(sel, data, children, text, undefined);
}

```



`h()`的核心是调用`vnode`函数来返回一个`vnode`节点

![h函数的实现](D:\00_workspace\00_mine\Vue_Study_Memos\doc\拉勾教育_3天搞定前端核心框架Vue.js源码\h函数的实现.png)

### Vnode

```javascript
// 导入VNodeData需要的模块
import { Hooks } from './hooks'
import { AttachData } from './helpers/attachto'
import { VNodeStyle } from './modules/style'
import { On } from './modules/eventlisteners'
import { Attrs } from './modules/attributes'
import { Classes } from './modules/class'
import { Props } from './modules/props'
import { Dataset } from './modules/dataset'
import { Hero } from './modules/hero'

export type Key = string | number

// 定义VNode接口：约束实现这个接口对象(VNode)都拥有相同的属性
export interface VNode {
  sel: string | undefined // 选择器
  data: VNodeData | undefined // 节点数据：属性、样式、事件等
  children: Array<VNode | string> | undefined // 子节点，和text互斥(vnode和text二选一)
  elm: Node | undefined // 记录vnode对应的真实DOM（当把Vnode转换为真实DOM后，会把真实DOM存放在elm上）
  text: string | undefined // 节点中的内容，和vnode互斥(vnode和text二选一)
  key: Key | undefined // 用于优化的key
}
// 定义VNodeData接口，VNode接口中data属性的类型数据
export interface VNodeData {
  props?: Props // 属性
  attrs?: Attrs // 属性
  class?: Classes // 类样式
  style?: VNodeStyle // 行内样式
  dataset?: Dataset // 自定义属性data-*
  on?: On // 事件
  hero?: Hero
  attachData?: AttachData
  hook?: Hooks // 声明周期
  key?: Key 
  ns?: string // for SVGs
  fn?: () => VNode // for thunks
  args?: any[] // for thunks
  [key: string]: any // for any other 3rd party module
}


/**
 * @description 定义Vnode
 * @author xialei
 * @date 25/11/2020
 * @export
 * @param {(string | undefined)} sel 元素
 * @param {(any | undefined)} data 节点属性
 * @param {(Array<VNode | string> | undefined)} children 子节点
 * @param {(string | undefined)} text 节点内容
 * @param {(Element | Text | undefined)} elm 真实DOM
 * @return {Object}  {VNode} 返回虚拟节点
 */
export function vnode (sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined): VNode {
  const key = data === undefined ? undefined : data.key
  return { sel, data, children, text, elm, key }
}

```

![vnode (1)](D:\00_workspace\00_mine\Vue_Study_Memos\doc\拉勾教育_3天搞定前端核心框架Vue.js源码\vnode (1).jpg)

### patch(oldVnode,newVnode)

俗称打补丁，把新节点中变化的内容渲染到真实DOM，最后返回新节点作为下一次处理的旧节点；

#### patch的整体执行过程

1.对比新旧vnode，判断是否是相同节点（两个节点的key和sel相同）

2.如果不是相同节点，则删除之前的内容，重新渲染

3.如果是相同节点，则判断新的vnode是否有text，如果有text并且和oldVNode的text不同，则直接更新新文本内容

4.如果新的VNode有children，判断子节点是否有变化，判断子节点的过程就是diff算法，diff只进行同层级比较



### init

```javascript
// 导入Module接口，VNode，DOMAPI等
import { Module } from './modules/module'
import { vnode, VNode } from './vnode'
import * as is from './is'
import { htmlDomApi, DOMAPI } from './htmldomapi'

type NonUndefined<T> = T extends undefined ? never : T

function isUndef (s: any): boolean {
  return s === undefined
}
function isDef<A> (s: A): s is NonUndefined<A> {
  return s !== undefined
}

type VNodeQueue = VNode[]

const emptyNode = vnode('', {}, [], undefined, undefined)

/**
 * @description 判断两个新旧节点是否是相同节点
 * @author xialei
 * @date 25/11/2020
 * @param {VNode} vnode1 旧节点
 * @param {VNode} vnode2 新节点
 * @return {Boolean}  {boolean}
 */
function sameVnode (vnode1: VNode, vnode2: VNode): boolean {
  // 判断两个节点的key和sel是否相同
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}

/**
 * @description 判断用户传入的节点是否是Vnode
 * @author xialei
 * @date 25/11/2020
 * @param {*} vnode
 * @return {*}  {vnode is VNode}
 */
function isVnode (vnode: any): vnode is VNode {
  // 判断是否是VNode,只需要判断VNode是否存在sel属性，存在则表示是虚拟节点，反之是真实DOM
  return vnode.sel !== undefined
}

type KeyToIndexMap = {[key: string]: number}

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
}

type ModuleHooks = ArraysOf<Required<Module>>

function createKeyToOldIdx (children: VNode[], beginIdx: number, endIdx: number): KeyToIndexMap {
  const map: KeyToIndexMap = {}
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key
    if (key !== undefined) {
      map[key] = i
    }
  }
  return map
}

// 钩子函数
const hooks: Array<keyof Module> = ['create', 'update', 'remove', 'destroy', 'pre', 'post']

/**
 * @description init实现
 * @author xialei
 * @date 25/11/2020
 * @export
 * @param {Array<Partial<Module>>} modules 模块 处理元素的属性，样式等
 * @param {DOMAPI} [domApi] DOM 操作API
 * @return {Function} patch 返回patch函数  
 */
export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number
  let j: number
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }
  // 初始化转换虚拟节点的api，domApi是将虚拟DOM转换为HTML字符串或其他内容，htmlDOMApi是将真实DOM转换为虚拟DOM
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi
  // 把传入的所有模块的钩子函数，统一存放到cbs对象中
  // 最终构建的cbs对象的形式cbs={create: [fn1,fn2],update:[fn1,fn2],...}
  for (i = 0; i < hooks.length; ++i) {
    // cbs.create = [],cbs.update = [],...
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      // modules传入的模块数组
      // 获取模块中的hook函数
      // hook = modules[0][create]
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        // 把获取到的hook函数存放到cbs对应的钩子函数数组中
        (cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }

  /**
   * @description 将真实DOM转换为空的VNode
   * @author xialei
   * @date 25/11/2020
   * @param {Element} elm
   * @return {Object} vnode 返回一个空的vnode  
   */
  function emptyNodeAt (elm: Element) {
    // 获取真实DOM的id
    const id = elm.id ? '#' + elm.id : ''
    // 获取真实DOM的className,并给这些className前面加上.
    const c = elm.className ? '.' + elm.className.split(' ').join('.') : ''
    // 将标签的名称，id，class连接上作为vnode的第一个参数
    return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm)
  }

  function createRmCb (childElm: Node, listeners: number) {
    return function rmCb () {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm) as Node
        api.removeChild(parent, childElm)
      }
    }
  }

  /**
   * @description 将Vnode转换成真实的DOM
   * @author xialei
   * @date 25/11/2020
   * @param {VNode} vnode
   * @param {VNodeQueue} insertedVnodeQueue
   * @return {*}  {Node}
   */
  function createElm (vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any
    let data = vnode.data
    if (data !== undefined) {
      const init = data.hook?.init
      if (isDef(init)) {
        init(vnode)
        data = vnode.data
      }
    }
    const children = vnode.children
    const sel = vnode.sel
    if (sel === '!') {
      if (isUndef(vnode.text)) {
        vnode.text = ''
      }
      vnode.elm = api.createComment(vnode.text!)
    } else if (sel !== undefined) {
      // Parse selector
      const hashIdx = sel.indexOf('#')
      const dotIdx = sel.indexOf('.', hashIdx)
      const hash = hashIdx > 0 ? hashIdx : sel.length
      const dot = dotIdx > 0 ? dotIdx : sel.length
      const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel
      const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
        ? api.createElementNS(i, tag)
        : api.createElement(tag)
      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot))
      if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '))
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i]
          if (ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue))
          }
        }
      } else if (is.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text))
      }
      const hook = vnode.data!.hook
      if (isDef(hook)) {
        hook.create?.(emptyNode, vnode)
        if (hook.insert) {
          insertedVnodeQueue.push(vnode)
        }
      }
    } else {
      vnode.elm = api.createTextNode(vnode.text!)
    }
    return vnode.elm
  }

  function addVnodes (
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before)
      }
    }
  }

  function invokeDestroyHook (vnode: VNode) {
    const data = vnode.data
    if (data !== undefined) {
      data?.hook?.destroy?.(vnode)
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j]
          if (child != null && typeof child !== 'string') {
            invokeDestroyHook(child)
          }
        }
      }
    }
  }

  function removeVnodes (parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number
      let rm: () => void
      const ch = vnodes[startIdx]
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch)
          listeners = cbs.remove.length + 1
          rm = createRmCb(ch.elm!, listeners)
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm)
          const removeHook = ch?.data?.hook?.remove
          if (isDef(removeHook)) {
            removeHook(ch, rm)
          } else {
            rm()
          }
        } else { // Text node
          api.removeChild(parentElm, ch.elm!)
        }
      }
    }
  }

  function updateChildren (parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx: KeyToIndexMap | undefined
    let idxInOld: number
    let elmToMove: VNode
    let before: any

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx]
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string]
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
        } else {
          elmToMove = oldCh[idxInOld]
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined as any
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
      }
    }
  }

  function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    const hook = vnode.data?.hook
    hook?.prepatch?.(oldVnode, vnode)
    const elm = vnode.elm = oldVnode.elm!
    const oldCh = oldVnode.children as VNode[]
    const ch = vnode.children as VNode[]
    if (oldVnode === vnode) return
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      vnode.data.hook?.update?.(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue)
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      }
      api.setTextContent(elm, vnode.text!)
    }
    hook?.postpatch?.(oldVnode, vnode)
  }
  // init函数内部返回patch函数，把vnode渲染成真实DOM，并返回vnode
  // 高阶函数的好处：
  return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
    // 定义i,elm,parent变量
    let i: number, elm: Node, parent: Node
    // 保存新插入节点的队列，目的是为了触发节点上设置的钩子函数
    const insertedVnodeQueue: VNodeQueue = []
    // 执行模块的pre钩子函数
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()
    // 如果oldVndoe不是Vnode，则创建VNode并设置elm，oldVNode可以是VNode，也可以是真实DOM
    if (!isVnode(oldVnode)) {
      // 把真实DOM转换成空的VNode
      oldVnode = emptyNodeAt(oldVnode)
    }
    // 如果两个新旧节点是相同的节点(key和sel相同)
    if (sameVnode(oldVnode, vnode)) {
      // 找两个节点之间的差异，并更新真实DOM
      patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {// 如果新旧节点不相同，把新的Vnode渲染成DOM，并且插入到文档中，并且删除老节点
      // 获取oldVNode中的真实DOM
      elm = oldVnode.elm!
      // 获取父节点
      parent = api.parentNode(elm) as Node
      // 把Vnode转换为真实的DOM
      createElm(vnode, insertedVnodeQueue)
      // 如果parent存在，则把VNode对应的DOM插入文档流中
      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
        // 移除老节点
        removeVnodes(parent, [oldVnode], 0, 0)
      }
    }
    // 执行用户设置的insert钩子函数
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
    // 执行cbs的post钩子函数
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
  }
}

```



## vscode中看源码必备的快捷键

查看某个函数的定义位置：`Alt+鼠标左键`，返回原位置: `Alt+←`

鼠标放到目前位置按F12

## 参考

[虚拟DOM（Virtual DOM）](http://www.mamicode.com/info-detail-3059000.html)

[VirtualDOM Git地址](https://github.com/Matt-Esch/virtual-dom)

[parcel](https://parceljs.org/)

## 问题参考



[Cannot resolve dependency ‘snabbdom‘ or ‘snabbdom/init‘](https://blog.csdn.net/weixin_40664145/article/details/109677074)