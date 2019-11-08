<template>
  <div>
      列表
  </div>
</template>

<script>
export default {
    created(){
        this.$bus.$on('add',(info) => {
            console.log(info)
        })
    }
}
</script>

<style>

</style>