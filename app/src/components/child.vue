<template>
  <div>
      {{con}}  ===>  {{txt}}
      <button @click="add"></button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            con:'组件通信 -- 子组件',
            count:"同级通信 -- 兄弟组件"
        }
    },
    props:["txt"],
    created(){
        this.$emit('child',this.con)
    },
    methods:{
        add(){
            this.$bus.$emit('add',this.count)
        }
    }
}
</script>

<style>

</style>