<!--
 * @Author: your name
 * @Date: 2021-01-25 18:38:56
 * @LastEditTime: 2021-02-20 16:56:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ecosystem\src\App.vue
-->
<template>
  <div id="app">
    <!-- <homeCmp></homeCmp> -->
    <router-link to="/">首页</router-link>
    <br>
    <router-link to="/front">前端提升笔记</router-link>
    <br>
    <router-link to="/spoken">口语提升笔记</router-link>
    <br>
    <router-link to="/financial">财商提升笔记</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import homeCmp from "@/views/home/index.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    homeCmp,
  },
  methods: {},
};
</script>

<style >
body,
html,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  font-family: "Microsoft YaHei";
}
</style>
