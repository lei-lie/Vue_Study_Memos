<template>
<div>
    <!-- 自定义组件的双向绑定：v-model语法糖： value , input -->
    <input :type="type" :value="value" @input="inputHandler" v-bind="$attrs">
</div>
</template>
<script>

export default {
    inheritAttrs:false,
    props: {
        value:{
            type: String,
            default:''
        },
        type: {
            type: String,
            default:'text'
        }
    },
    data() {
        return {

        }
    },
    methods: {
        inputHandler(e) {
            this.$emit('input', e.target.value);
            // 触发校验:每当值发生变化，都需要告诉父级组件执行一次校验
            this.$parent.$emit('validate')
        }
    }
}
</script>
<style scoped lang="less">

</style>