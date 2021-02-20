/**
 * @description 事件总线： 对于没有直接亲缘关系的组件A，B，在组件A和组件B之间建立一个中心桥梁，来监听和派发事件
 * @author xialei
 * @date 05/02/2021
 * @class Bus
 */
class Bus {
    constructor() {
            // 缓存组件派发的事件
            this.callbacks = [];
        }
        // 事件监听: 
    $on(name, fn) {
            if (!this.callbacks[name]) {
                this.callbacks[name] = []
            }
            this.callbacks[name].push(fn)
        }
        // 事件派发
    $emit(name, args) {
            if (this.callbacks[name]) {
                this.callbacks[name].map(cb => { cb(args) });
            }
        }
        // 销毁事件
    $off(name) {
        if (this.callbacks[name]) {
            this.callbacks[name] = [];
        }
    }
}