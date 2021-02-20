const cmp6 = {
    template: `<div>
        <h3>$children实现父子组件通信</h3>
        <cmp3 v-bind="...$attrs"></cmp3>
        <hr />
        <h2>provide & inject实现祖先和后代之间的传值</h2>
        <p>{{txt}}</p>
    </div>`,
    components: {
        cmp3
    },
    inject: ['txt'],
    mounted() {
        console.log('this.$children :>> ', this.$children);
        this.$children[0].hi()
    },
    methods: {

    }
}