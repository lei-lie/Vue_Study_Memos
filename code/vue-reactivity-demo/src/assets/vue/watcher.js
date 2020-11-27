//发布者-目标 dependence
class Dep {
    constructor() {
        // 存储所有的观察者
        this.subs = []
    }
    // 添加观察者
    addSub(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 通知所有的观察者
    notify() {
        this.subs.map(sub => sub.update())
    }
}
// 订阅者--观察者
class Watcher {
    constructor() {}
    // 更新视图
    update() {
        console.log('update');
    }
}