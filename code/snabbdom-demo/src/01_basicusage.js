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