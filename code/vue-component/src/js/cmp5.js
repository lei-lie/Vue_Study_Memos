const cmp5 = {
    template: `<div class="cmp3">
        <h3>组件5</h3>
        <p style="color:orange;">接收cmp4的信息：{{msg}}</p>
    </div>`,
    data() {
        return {
            msg: '暂时还没有收到消息哟~'
        }
    },
    mounted() {
        this.$parent.$on('say-hello', (msg) => {
            this.msg = msg;
        })
    },
}