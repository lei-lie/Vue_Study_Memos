<template>
    <div>
        <input :type="type" :value="currentValue" @input="inputHandler" @blur="blurHandler">
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter'
export default {
    name:'cInput',
    mixins:[Emitter],
    props: {
        type: {
            type:String,
            default:'text'
        },
        value: {
            type:String,
            value:''
        }
    },
    watch: {
        value(value) {
            this.currentValue= value;
        }
    },
    data(){
        return {
            currentValue: this.value
        }
    },
    methods:{
        inputHandler(e) {
            const value = e.target.value;
            // v-model实现
            this.currentValue = value;
            this.$emit('input',value);
            // 向父级派发事件，触发校验
            this.dispatch('cFormItem','on-form-change',value)
        },
        blurHandler(e) {
             // 向父级派发事件，触发校验
            this.dispatch('cFormItem','on-form-blur',this.currentValue)
        },
    }
}
</script>