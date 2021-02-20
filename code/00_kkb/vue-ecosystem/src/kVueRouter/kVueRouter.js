/*
 * @Author: xl
 * @Date: 2021-02-20 14:58:13
 * @LastEditTime: 2021-02-20 16:25:15
 * @LastEditors: Please set LastEditors
 * @Description: 自己实现Router
 * @FilePath: \vue-ecosystem\src\kVueRouter\kVueRouter.js
 */

let Vue;

// 声明类
class KVueRouter {
  constructor(options) {
    this.options = options;
    // 响应式数据，响应式实现依赖于Vue
    // current用于保存当前的url
    // defineReactive给一个obj定义一个响应式属性
    let initial  = window.location.hash.slice(1) || '/';
    Vue.util.defineReactive(this,'current',initial);

    // 监控URL的变化
    window.addEventListener('hashchange',this.onHashChange.bind(this))
  }
  onHashChange() {
      this.current = window.location.hash.slice(1);
  }
}

// 参数1：Vue构造函数，install方法会在use的时候调用
KVueRouter.install = function(_Vue,options) {
  Vue = _Vue;
  // 1.挂载router实例，让我们的子组件中可以使用它
  // 为了解决install先执行，还要在这里访问router实例
  // 做一个全局的混入，在beforeCreate钩子里面去做这件事
  Vue.mixin({
      beforeCreate() {
        // 此时上下问已经是组件实例了
        // 如果this是根实例，则他的$options中会有路由的实例
        if (this.$options.router) {
            Vue.prototype.$router = this.$options.router;
        }
      },
  })
  // 2.实现两个全局组件：router-link 、router-view
  // <router-link to="/about"></router-link>
  // <a href="#/about"></a>
  Vue.component('router-link',{
      props:{
          to:{
              type:String,
              required:true
          }
      },
    render: function(h) {
        return h('a',{
            attrs:{
                href:`#${this.to}`
            }
        },[this.$slots.default])
    }
  });

  Vue.component('router-view',{
      render: function(h){
          // 获取current对应的组件并渲染
          console.log('this.$router :>> ',this.$router);
          console.log('this.$router.current :>> ',this.$router.current);
          let routes = this.$router.options.routes;
          let component = null,cur = this.$router.current;
          let route  = routes.find(route => {
              return route.path === cur;
          })
          if (route) {
              component = route.component;
          }
          return h(component)
      }
  });
};

export default KVueRouter;