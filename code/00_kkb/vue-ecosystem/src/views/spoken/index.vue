<template>
    <div class="page-container">
        <h2>父组件传递的信息prop</h2>
        <p>{{curText}}</p>
     <div>
      <button @click="$emit('notifyParent',curText)">给父组件打招呼</button>
     </div>
        <hr/>
    </div>
</template>
<script>
export default {
    props:{
        curText: {
            type:String,
            default:''
        }
    }
}
</script>
<style lang="less" scope>
    
</style>