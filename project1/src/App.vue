<template>
  <div id="app">
    <ul>
    <tree :model="data"></tree>
    </ul>
  </div>
</template>

<script>
import tree from "./components/tree/tree.vue"

export default {
  name: 'App',
  components:{
    tree
  },
  data(){
    return{
      data:data
    }
  }
}

var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}
</script>

<style>

</style>