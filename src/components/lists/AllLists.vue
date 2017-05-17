<template>
  <el-row :gutter="10">
    <h1>{{ msg }}</h1>
      
     <transition name="fade">
      <el-col :span="8" >
          <listsall></listsall>
      </el-col>
    </transition>
     <transition name="fade" >
      <el-col :span="8" >
          <listevnt v-bind:createPathBtn="false"></listevnt>
      </el-col>
    </transition>
      

    </el-row>
</template>

<script>
    import Listsall from 'src/components/lists/Listsall.vue'
    import Listevnt from 'src/components/lists/Listevnt.vue'

    export default {
        name: 'alllists',
        components: {
          //  Mmap,
            Listevnt,
            Listsall
        },
        data() {
            return {
                //msg: 'lists'
                hideBlock:false,
                slide:false
            }
        },
        props:['msg'],
        mounted() {
            
            this.$store.dispatch('getListsAll');
            this.$store.dispatch('getUsers');
        },
        methods:{
            
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
     .m-panel
    {
        padding-left: 15px;
        padding-right: 15px;
    }
   
</style>