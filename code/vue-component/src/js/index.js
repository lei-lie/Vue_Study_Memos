const vm = new Vue({
    el: '#app',
    components: {
        "cmp1": cmp1
    },
    data() {
        return {
            count: 0,
            btns: [{
                    id: 'plus',
                    name: '加一',
                    callback: 'plus'
                },
                {
                    id: 'minus',
                    name: '减一',
                    callback: 'minus'
                }
            ],
            btns1: [{
                    id: 'multiply',
                    name: '乘一',
                    callback: 'multiply'
                },
                {
                    id: 'divided',
                    name: '减一',
                    callback: 'divided'
                }
            ],
            list: [{
                    id: 'front',
                    name: '前端培训'
                },
                {
                    id: 'server',
                    name: '服务端培训'
                },
                {
                    id: 'product',
                    name: '产品培训'
                }
            ],
            list1: [{
                    id: 'html',
                    name: 'html培训'
                },
                {
                    id: 'css',
                    name: 'css培训'
                },
                {
                    id: 'js',
                    name: 'js培训'
                }
            ],
            inputVal: ''
        }
    },
    methods: {
        btnClickFn(fn) {
            this[fn]();
        },
        plus() {
            this.count++
        },
        minus() {
            this.count--;
        },
        multiply() {
            this.count *= 10;
        },
        divided() {
            this.count /= 10;
        },
        inputHandler(val) {
            this.inputVal = val;
        }
    }
})