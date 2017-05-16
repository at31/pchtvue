<template>
  <div class="listcreate">
    <h1>{{ msg }}</h1>
      <el-col :span="8">
          <listsall></listsall>
      </el-col>
      <el-col :span="8">
          <listevnt v-bind:createPathBtn="false"></listevnt>
      </el-col>    
  </div>
</template>

<script>
    import Listsall from 'src/components/lists/Listsall.vue'
    import Listevnt from 'src/components/lists/Listevnt.vue'
    //import Mmap from 'src/components/Mmap.vue'

    export default {
        name: 'at1',
        components: {
          //  Mmap,
            Listevnt,
            Listsall
        },
        data() {
            return {
                //msg: 'lists'
            }
        },
        props:['msg'],
        mounted() {
            
            //console.log('ymapstart dispatch');
            //console.log(JSON.stringify(this.$store.state.route));
            this.$store.dispatch('getListsAll');
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }

</style>