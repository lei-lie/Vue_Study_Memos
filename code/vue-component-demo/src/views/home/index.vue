<template>
    <div>
        <!-- <parent></parent> -->
        <cForm :model="form" :rules="rules" ref="form">
            <cFormItem label="用户名" prop="userName">
                <cInput type="text" v-model="form.userName"></cInput>
            </cFormItem>
            <cFormItem label="密码" prop="password">
                <cInput type="password" v-model="form.password"></cInput>
            </cFormItem>
            <cFormItem style="margin:10px 0;">
            
                <button @click="handleSubmit" style="margin:0 10px;">提交</button>
                <button @click="handleReset">重置</button>
            </cFormItem>
        </cForm>
    </div>
</template>
<script>
// import parent from '../../components/parent'
import cForm from '../../components/cForm/cForm'
import cFormItem from '../../components/cForm/cFormItem'
import cInput from '../../components/cForm/cInput'
export default {
    name:"homeCmp",
    components:{
       // parent,
        cForm,
        cFormItem,
        cInput,
    },
    data() {
        return {
            form: {
                userName:'',
                password:''
            },
            rules:{
                userName: {
                    required:true,
                    message:'用户名不为空',
                    trigger:'blur'
                },
                password: {
                    required:true,
                    message:'密码不为空',
                    trigger:'blur'
                }
            }
        }
    },
    methods: {
        handleReset () {
        this.$refs.form.resetFields();
      },
        handleSubmit() {
            this.$refs.form.validate((valid) => {
            if (valid) {
                window.alert('提交成功');
            } else {
                window.alert('表单校验失败');
            }
            })
        }
    }
}
</script>
<style scoped>

</style>