Vue.prototype.$bus = new Bus();
let vm = new Vue({
    el: '#app',
    components: {
        cmp2,
        cmp3,
        cmp4,
        cmp5,
        cmp6
    },
    provide: {
        txt: 'Hello I am your ancestors'
    }
})