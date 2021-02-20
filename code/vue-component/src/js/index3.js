let vm = new Vue({
    el: '#app',
    components: {
        cmp7
    },
    data() {
        return {
            txt: '暂未收到后代元素的消息哟'
        }
    },
    methods: {
        heyFn(msg) {
            this.txt = msg;
        }
    }
})