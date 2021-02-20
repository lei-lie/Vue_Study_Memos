const cmp3 = {
    template: `<div class="cmp3">
        <h3>组件3</h3>
        <p style="color:#00a0e6;">监听组件2传递的消息：<strong>{{msg}}</strong></p>
    </div>`,
    data() {
        return {
            msg: '还没有接收到消息哟~'
        }
    },
    mounted() {
        this.$bus.$on('hello', (msg) => {
            this.msg = msg;
        })
    },
    methods: {
        hi() {
            alert('hello parent')
        },
    }
}