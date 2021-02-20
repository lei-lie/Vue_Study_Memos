<template>
    <div>
        <h1>child1</h1>
        <grandson></grandson>
    </div>
</template>
<script>
import grandson from "../grandsom"
export default {
    name:'child1',
    components:{
        grandson
    }
}
</script>