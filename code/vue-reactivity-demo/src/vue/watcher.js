class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数负责更新视图
        this.cb = cb
        // 将当前的Watcher记录到Dep的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中调用addSub
        this.oldValue = vm[key]
        // 防止重复添加
        Dep.target = null
    }

    // 当数据发生变化时更新视图
    update() {
        let newValue = this.vm[this.key]
        if (newValue === this.oldValue) {
            return
        }
        this.cb(newValue)
    }
}