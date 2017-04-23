<template>
  <div>
    <h1>{{ msg }}</h1>    
  </div>
</template>

<script>
  
    
export default {
  name: 'hello',
props: ['show'],
  data () {
    return {
      msg: 'HI )'
    }
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>