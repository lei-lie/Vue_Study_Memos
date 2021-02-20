<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        model:{
            type: Object,
            required:true
        },
        rules:{
            type: Object,
        }
    },
    // 通过provide 的方式项后代元素提供数据的原因：用户在定义表单时，可能会插入一些非表单元素包裹表单项，在子组件中通过$parent的方式获取父级数据比较麻烦
    provide() {
        return {
            // 直接提供当前表单：避免传入多个provide值
            form: this
        }
    },
    methods: {
        // 全局校验
        validate(cb) {
            // 执行内部全部item的validate方法是否全部通过
            // 获取promise构成的数组
            let tasks = this.$children.filter(item => item.prop).map(item => item.validate())
            // 检查校验结果
            Promise.all(tasks).then(() => {cb(true)}).catch(() => {cb(false)}) 
        }
    },
}
</script>