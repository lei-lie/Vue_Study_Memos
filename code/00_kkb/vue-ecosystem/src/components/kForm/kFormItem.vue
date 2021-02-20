<template>
    <div>
        <!-- label -->
        <label v-if="label">{{label}}</label>
        <!-- 容器-->
        <slot></slot>
         <!-- 校验信息 -->
        <p v-if="error" style="color:#f00;">{{error}}</p>
    </div>
</template>
<script>
import Schema from 'async-validator';
export default {
    inject:['form'],
    props: {
        label: {
            type:String,
            default:''
        },
        prop: {
            type: String,
            default:''
        }
        
    },
    data() {
        return {
            error:''
        }
    },
    mounted() {
        // 监听validate事件
        this.$on('validate',() => {
            // 执行校验
            this.validate();
        })
    },
    methods:{
        // 执行校验--async-validator
        validate() {
            console.log('校验开始 :>> ', '校验开始');
            // 获取校验规则
            let rule = this.form.rules[this.prop];
            // 获取值
            let value = this.form.model[this.prop];
            // 构造一个validator实例
            const validator = new Schema({
                // 动态
                [this.prop]:rule
            });
            return validator.validate({
                [this.prop]:value
            },errors => {
                console.log('errors==>',errors)
                // errors数组存在，则校验错误
                if (errors) {
                    this.error = errors[0].message;
                } else {
                     this.error = '';
                }
                
            })
        }
    }
}
</script>