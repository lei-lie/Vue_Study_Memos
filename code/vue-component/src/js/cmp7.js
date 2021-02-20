const cmp7 = {
    template: `<div>
        <h2>$attrs & $listeners</h2>
        <cmp8 v-bind="$attrs" v-on="$listeners"></cmp8>
    </div>`,
    data() {
        return {

        }
    },
    methods: {},
    components: {
        cmp8
    }
}