class EventBus {
  constructor() {
    // null 不需要原型 {'click': [fn1,fn2]}
    this.subs = Object.create(null);
  }
  // 注册事件
  $on(eventType, fn) {
    //   if (!this.subs[eventType]) {
    //       this.subs[eventType] = [fn]
    //   } else  {
    //       this.subs[eventType].push(fn)
    //   }
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(fn);
  }
  // 触发事件
  $emit(eventType,args) {
      if (this.subs[eventType]) {
        this.subs[eventType].map(handler => handler(args))
      }
  }
}
