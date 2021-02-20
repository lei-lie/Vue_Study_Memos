/*
 * @Author: your name
 * @Date: 2021-02-19 18:05:39
 * @LastEditTime: 2021-02-20 16:01:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ecosystem\src\router\index.js
 */
import Vue from 'vue';
import KVueRouter from '../kVueRouter/kVueRouter';
Vue.use(KVueRouter);
import Index from '../views/index/index.vue';
import Front from '../views/front/index.vue';
import Financial from '../views/fincial/index.vue';
import Spoken from '../views/spoken/index.vue';
const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path:'/spoken',
        component:Spoken
    },
    {
        path:'/front',
        component:Front
    },
    {
        path:'/financial',
        component:Financial
    }
]

export default new KVueRouter({
    routes
})