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



## 参考

[虚拟DOM（Virtual DOM）](http://www.mamicode.com/info-detail-3059000.html)

[VirtualDOM Git地址](https://github.com/Matt-Esch/virtual-dom)

[parcel](https://parceljs.org/)

[Cannot resolve dependency ‘snabbdom‘ or ‘snabbdom/init‘](https://blog.csdn.net/weixin_40664145/article/details/109677074)