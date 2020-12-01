class Dep {
    constructor() {
        // 存储所有观察者
        this.subs = []
    }
    // 添加watcher
    addSub(sub) {
        // 判断是否是watcher
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 发布通知
    notify () {
        // 遍历所有的watcher，调用自身的update操作
        if (this.subs.length > 0) {
            this.subs.map(sub => {
                sub.update()
            })
        }
    }
}

