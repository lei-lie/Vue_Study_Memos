// 导入snabbdom模块
import { init } from 'snabbdom/build/package/init';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { h } from 'snabbdom/build/package/h'; // helper function for creating vnodes

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
let vnode = h('div#container.cls',{
  hook: {
    init(vnode) {
      console.log('vnode :>> ', vnode);
    },
    create(emptyVnode,vnode) {
     console.log('vnode.elm :>> ', vnode.elm);
    }
  }
},'hello world')

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