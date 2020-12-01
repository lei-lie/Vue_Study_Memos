class Vue {
  constructor(options) {
    // 1.通过属性保存选项的数据
    this.$options = options || {};
    this.$data = options.data || {};
    // 如果传递的是选择器，那么通过选择器获取对应的DOM
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
    // 2.把data中的属性转换成getter/setter,注入Vue实例
    this._proxyData(this.$data);
    // 3.调用observer对象，监听数据的变化
    new Observer(this.$data);
    // 调用complier属性解析指令和插值表达式
    new Compiler(this)
  }

  // 代理数据
  _proxyData(data) {
    if (data && Object.keys(data).length > 0) {
      // 遍历data中的所有属性
      Object.keys(data).map((key) => {
        // 把data中的属性转换成getter/setter
        Object.defineProperty(this, key, {
          enumerable: true, // 可枚举（可遍历）
          configurable: true, // 可配置（可以使用delete删除，可以通过defineProperty更新定义）,
          get() {
            return data[key];
          },
          set(newVal) {
            if (newVal === data[key]) {
              return;
            }
            data[key] = newVal;
          },
        });
      });
      // 把data中的属性注入vue实例
    }
  }
}
