<template>
    <div class="c-form">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'cFrom',
    props: {
        model:{
            type:Object,
            required:true
        },
        rules: {
            type: Object,
            default:null
        }
    },
    provide() {
        return {
            form:this
        }
    },
    data() {
        return {
        fields:[]

        }
    },
    created() {
        this.$on('on-form-item-add', (field) =>{
            if (field) {
                this.fields.push(field)
            }
        })
        this.$on('on-form-item-remove', (field) =>{
            if (field.prop) {
                if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
            }
        })
    },
    methods: {
         // 公开方法：全部重置数据
        resetFields() {
            this.fields.forEach(field => {
                field.resetField();
            });
        },
         // 公开方法：全部校验数据，支持 Promise
        validate(callback) {
            return new Promise(resolve => {

                let valid = true;
                let count = 0;
                this.fields.forEach(field => {
                    field.validate('', errors => {
                        if (errors) {
                            valid = false;
                        }
                        if (++count === this.fields.length) {
                            // 全部完成
                            resolve(valid);
                            if (typeof callback === 'function') {
                                callback(valid);
                            }
                        }
                    });
                });
            });
        }
    }
}
</script>