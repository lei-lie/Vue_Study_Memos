class Observer {
  constructor(data) {
    this.walk(data);
  }
  // 遍历对象的所有属性
  walk(data) {
    // 1.判断data是否是对象
    if (!data && !Object.prototype.toString.call(data) === '[object Object]') {
      return;
    }
    if (Object.keys(data).length > 0) {
      // 2.遍历data对象的所有属性
      Object.keys(data).map((key) => {
        this.defineReactivity(data, key, data[key]);
      });
    }
  }
  // 将属性转换成响应式数据:getter/setter
  defineReactivity(data, key, val) {
    let that = this;
    if (Object.prototype.toString.call(val) === '[object Object]') {
      // 如果val是对象，遍历val对象中的所有属性转换为响应式数据
      this.walk(val);
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        //return data[key] 不能在`defineReactivity`的`get`中通过`data[key]`的方式返回数据，原因是`data[key]`会一直调用`get`方法，形成死递归，导致栈溢出
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        // 如果newVal是对象，遍历newVal对象中的所有属性转换为响应式数据
        if (Object.prototype.toString.call(newVal) === '[object Object]') {
          that.walk(newVal);
        }
        val = newVal;
        // 发送通知
      },
    });
  }
}
