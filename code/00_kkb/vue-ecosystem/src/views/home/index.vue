<template>
  <!--<div class="home-page">
   <div class="tabs">
      <div :class="['tab',curTab === tab.id ? 'active' : '']" @click="changeTab(tab)" v-for="tab in tabs"  :key="tab.id">{{tab.text}}</div>
   </div>
   <div class="tab-content">
    <component :is="curTab" :curText="curText" @notifyParent="notifyParentHandler"></component>
    <div v-if="childMsg">父组件我接受到您传递的信息：{{childMsg}}</div>
   </div>
  </div>-->
  <div class="home-page">
    <!-- 在Kform中传入model、rules的原因：表单项不止一项，需要统一管理这些表单项的数据和状态 -->
    <kForm :model="form" :rules="formRules" ref="kFrom">
      <kFormItem label="用户名" prop="user">
        <kInput v-model="form.name"></kInput>
      </kFormItem>
       <kFormItem>
        <button @click="submit">submit</button>
      </kFormItem>
    </kForm>
  
  </div>
</template>

<script>

import frontCmp from '@/views/front/index.vue';
import spokenCmp from '@/views/spoken/index.vue';
import fincialCmp from '@/views/fincial/index.vue';
import kInput from '@/components/kForm/kInput';
import kFormItem from '@/components/kForm/kFormItem';
import kForm from '@/components/kForm/kForm';
export default {
  name: 'App',
  data() {
    return {
      form:{
        name:''
      },
      formRules:{
        name:{
          required:true,
          message:'请输入用户名'
        }
      },
      curTab:'frontCmp',
      tabs: [{
        id:'frontCmp',
        text:'前端提升笔记'
      },
      {
        id:'spokenCmp',
        text:'口语提升笔记'
      },
      {
        id:'fincialCmp',
        text:'财商提升笔记'
      }],
      curText: '前端提升笔记',
      childMsg:''
    }
  },
  components: {
    frontCmp,
    spokenCmp,
    fincialCmp,
    kInput,
    kFormItem,
    kForm
  },
  methods:{
    // 改变tab
    changeTab(tab) {
      this.curTab = tab.id;
      this.curText = tab.text;
      this.childMsg= '';
    },
    notifyParentHandler(msg) {
      this.childMsg = msg;
    },
    submit() {
      this.$refs.kFrom.validate(isValid => {
        if (isValid) {
          console.log('passed')
        } else {
          console.log('failed')
        }
      });
    },
  }
}
</script>

<style>
.home-page {
   width:100%;
   height:100%;
   padding: 0 20px;  
     box-sizing:border-box;
}
.tabs {
  width:100%;
  height:50px;
  line-height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  border-bottom: 1px solid #fb631a;


  margin-bottom:10px;
}
.tab {
  position:relative;
  font-size: 14px;
  font-weight:400;
  color:#fb631a;
  transition:all 0.3s;
  cursor:pointer;

}
.active {
  font-size:16px;
  font-weight:700;
}
.active:after{
  content:'';
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
  height:2px;
  background:#fb631a;
}
.tab-content {
  width:100%;
  height: calc(100% - 50px - 10px);
  padding: 20px;
  box-sizing:border-box;
}
</style>
