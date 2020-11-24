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