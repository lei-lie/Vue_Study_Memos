class Bus {
    constructor() {
            this.callbacks = {};
        }
        // 事件监听
    $on(name, fn) {
            this.callbacks[name] = this.callbacks[name] || [];
            this.callbacks[name].push(fn);
        }
        // 事件派发
    $emit(name, args) {
        if (this.callbacks[name]) {
            this.callbacks[name].map(cb => cb(args))
        }
    }
}