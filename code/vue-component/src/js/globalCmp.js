// 全局注册
Vue.component('operator-cmp', {
    template: `<div class="operator-btns">
            <button v-for="btn in btns" :key="btn.id" @click="btnClickHandler(btn)" style="margin-right:10px;">{{btn.name}}</button>  
        </div>`,
    props: {
        btns: {
            type: Array,
            default: []
        }
    },
    data() {

        return {

        }
    },
    methods: {
        btnClickHandler(btn) {
            this.$emit('btn-click', btn.callback)
        }
    }
})

Vue.component('headercmp', {
    template: `<header><h1 style="color:orange;">PascalCase方式命名组件</h1></header>`
})

Vue.component(`input-cmp`, {
    template: `<div class="custom-input">
        <h4>当前输入的值：{{currentVal}}</h4>
        <hr>
        <input :value="value" @input="$emit('input', $event.target.value)" @keyup="keyupHandler" />
    </div>`,
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentVal: ''
        }
    },
    methods: {
        keyupHandler(e) {
            this.currentVal = e.target.value;
        }
    }
})

Vue.component('slot-cmp', {
    template: `<div class="slot-cmp">
    <h4>插槽</h4>
    <slot></slot>
    <slot name="name1"></slot>
</div>`
})