class Compiler {
  constructor(vm) {
    // 缓存el,vm
    this.el = vm.$el;
    this.vm = vm;
    //
    this.compile(this.el);
  }
  // 编译模板，处理元素节点和文本节点
  compile(el) {
    // 变量el中 所有节点
    let childNodes = el.childNodes;
    Array.from(childNodes).map((node) => {
      // 判断node节点是否存在子节点，存在则递归调用compiler
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
      // 判断是否是文本节点
      if (this.isTextNode(node)) {
        // 编译文本节点
        this.compileText(node);
      }
      // 判断是否是元素节点
      if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node);
      }
    });
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    let attrs = node.attributes;
    console.log(attrs);
    // 遍历所有属性节点
    Array.from(attrs).map((attr) => {
      let attrName = attr.name;
      // 判断是否是指令
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2);
        let key = attr.value;
        this.update(node, key, attrName);
      }
    });
  }
  // 处理v-text和v-model指令
  update(node, key, attrName) {
    // 指令对应的方法
    let updateFn = this[attrName + 'Updater'];
    // this指向compiler对象
    updateFn && updateFn.call(this,node, this.vm[key],key);
  }
  // 处理v-text,获取对应的值赋给DOM元素
  textUpdater(node, val,key) {
    node.textContent = val;
    new Watcher(this.vm,key,(newVal) => {
      node.textContent = newVal
    })
  }
  // 处理v-model
  modelUpdater(node, val,key) {
    node.value = val;
    new Watcher(this.vm,key,(newVal) => {
      node.value = newVal
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  // 编译文本节点，处理插值表达式,替换为真实数据
  compileText(node) {
    console.dir(node);
    // {{ msg }}
    let reg = /\{\{(.+?)\}\}/;
    let text = node.textContent;
    if (reg.test(text)) {
      let key = RegExp.$1.trim();
      node.textContent = text.replace(reg, this.vm[key]);
      // 创建Watcher对象，当数据改变更新视图
      new Watcher(this.vm, key,(newVal) => {
        node.textContent = newVal
      });
    }
  }
  // 判断元素属性的名称是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
