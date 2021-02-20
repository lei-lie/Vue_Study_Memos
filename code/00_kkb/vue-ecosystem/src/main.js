/*
 * @Author: your name
 * @Date: 2021-01-25 18:38:56
 * @LastEditTime: 2021-02-20 15:30:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ecosystem\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')