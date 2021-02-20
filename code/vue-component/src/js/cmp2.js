const cmp2 = {
    template: `<div class="cmp2">
    <h2>组件2</h2>
    <div >
        <button @click="sayHello">say hello</button>
    </div>
    </div>`,
    data() {
        return {
            msg: 'hello cmp3, it is me cmp2!'
        }
    },
    methods: {
        sayHello() {
            this.$bus.$emit('hello', this.msg)
        }
    },
    beforeDestroy() {
        this.$bus.$off('hello')
    },
}