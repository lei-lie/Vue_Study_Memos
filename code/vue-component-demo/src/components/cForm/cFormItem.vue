<template>
    <div class="c-form-item">
        <label v-if="label" :class="{ 'c-form-item-label-required': isRequired }">{{label}}</label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="c-form-item-message">{{ validateMessage }}</div>
        </div>
        
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import AsyncValidator from 'async-validator';
export default {
    name:'cFormItem',
    mixins:[Emitter],
    inject:['form'],
    props:{
        label:{
            type:String,
            default:''
        },
        prop: {
            type:String,
        }
    },
    data() {
        return {
            isRequired: false,  // 是否为必填
            validateState:'',// 校验状态
            validateMessage:'',// 校验不通过时的提示信息
        }
    },
    computed:{
        // 从 Form 的 model 中动态得到当前表单组件的数据
        fieldValue() {
            return this.form.model[this.prop]
        }
    },
    // 组件渲染时，将实例缓存在 Form 中
    mounted() {
        if (this.prop) {
             // 如果没有传入 prop，则无需校验，也就无需缓存
            this.dispatch('cForm','on-form-item-add',this);
            // 设置初始值，以便在重置时恢复默认值
        this.initialValue = this.fieldValue;
           this.setRules();
        }
    },
    methods:{
        // 触发校验
        setRules() {
             let rules = this.getRules();
            if (rules.length) {
                rules.every((rule) => {
                    // 如果当前校验规则中有必填项，则标记出来
                    this.isRequired = rule.required;
                });
            }
            // 监听表单组件改变事件
            this.$on('on-form-change',(val) => {
                this.onFieldChange()
            })
            // 监听表单组件失去焦点事件
            this.$on('on-form-blur',(val) => {
                this.onFieldBlur()
            })
        },
        // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
        getRules() {
            // 获取所有的规则
            let formRules = this.form.rules;
            // 获取当前prop对应的规则
            formRules = formRules ? formRules[this.prop] : [];
            return [].concat(formRules || []);
        },
        // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
        getFilteredRule (trigger) {
            const rules = this.getRules();
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
       /**
         * 校验数据
         * @param trigger 校验类型
         * @param callback 回调函数
         */
        validate(trigger,callback = function() {}) {
            let rules = this.getFilteredRule(trigger);
            if (!rules || rules.length === 0) {
                return true;
            }
            // 设置状态为校验中
            this.validateState = 'validating';
            let descriptor = {};
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor);
            let model = {};
            model[this.prop] = this.fieldValue;
            validator.validate(model,{firstFields:true}, errors => {
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage);
            })
        },
        // 重置数据
        resetField () {
            this.validateState = '';
            this.validateMessage = '';

            this.form.model[this.prop] = this.initialValue;
        },
        // 表单元素change事件处理
        onFieldChange() {
            this.validate('change')
        },
        // 表单元素blur事件处理
        onFieldBlur() {
            this.validate('blur')
        },
       
    },
    beforeDestroy() {
         this.dispatch('cForm','on-form-item-remove',this);
    }
}
</script>
<style scoped>
.c-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .c-form-item-message {
    color: red;
  }
</style>