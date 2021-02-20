<template>
    <div>
        <h1>parent</h1>
        <child1></child1>
    </div>
</template>
<script>
import child1   from "../child1"
export default {
    name:'parent',
    components:{
        child1
    }
}
</script>