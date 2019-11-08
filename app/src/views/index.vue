<template>
  <div>
      <Child v-bind:txt="txt" ref='child' @child="child"></Child>
      <List></List>
  </div>
</template>

<script>
import Child from "../components/child.vue";
import List from "../components/list.vue";
export default {
    data(){
        return {
            txt:'组件通信 -- 父组件',
        }
    },
    components:{
        Child,
        List
    },
    mounted(){
        // console.log(this.$refs.child.con)
        console.log(this.$root)
    },
    methods:{
        child(con){
            console.log(con)
        }
    }
}
</script>

<style>

</style>