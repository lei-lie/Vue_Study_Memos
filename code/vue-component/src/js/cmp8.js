const cmp8 = {
    template: `<div>
        <h2>爷爷传递的非props属性:{{$attrs.hello}}</h2>
        <button @click="hey">hey</button>
    </div>`,
    data() {
        return {

        }
    },
    methods: {
        hey() {
            this.$emit('hey', 'yo parent~')
        },
    }
}