const cmp4 = {
    template: `<div class="cmp3">
        <h3>组件4：通过$parent派发事件给组件5</h3>
        <button style="color:red;" @click="dispatchEvent">派发事件</button>
    </div>`,
    data() {
        return {
            msg: 'hello cmp5~'
        }
    },
    methods: {
        dispatchEvent() {
            this.$parent.$emit('say-hello', this.msg)
        },
    }
}