const cmp1 = {
    template: `<ul class="course-list">
       <li class="course" v-for="item in list" :key="item.id"> {{item.name}}</li>  
    </ul>`,
    props: {
        list: {
            type: Array,
            default: []
        }
    }
}