<template>
  <el-row :gutter="10">
    <h1>{{ msg }}</h1>
    <div class="m-panel">
        <el-button @click="toggleListAll">Скрыть/показать все списки</el-button>
    </div>    
     <transition name="fade">
      <el-col :span="8" v-show="hideBlock">
          <listsall></listsall>
      </el-col>
    </transition>
     <transition name="fade" v-on:after-leave="afterLeave"  v-on:before-enter="beforeEnter">
      <el-col :span="8" v-show="hideBlock">
          <listevnt v-bind:listsAll="listsAll"></listevnt>
      </el-col>
    </transition>

      <el-col :span="8" :class="{ slideInRight: slide}">
          <listnew></listnew>
      </el-col>
      <el-col :span="8" v-if="!hideBlock">
          <apath v-bind:path="listNew.path"></apath>
      </el-col>
      <transition name="fade" v-on:after-leave="afterLeave"  v-on:before-enter="beforeEnter">
      <el-col :span="8" v-show="!hideBlock">
          <listevnt v-bind:listsAll="listNew"></listevnt>
      </el-col>
    </transition>

    </el-row>
</template>

<script>
    import Listsall from 'src/components/lists/Listsall.vue'
    import Listevnt from 'src/components/lists/Listevnt.vue'
    import Listnew from 'src/components/lists/Listnew.vue'
    import Apath from 'src/components/lists/Apath.vue'
    //import Mmap from 'src/components/Mmap.vue'

    export default {
        name: 'at1',
        components: {
          //  Mmap,
            Listevnt,
            Listsall,
            Listnew,
            Apath
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
           
        },
        watch:{
            postOffice:function(){
                //this.$store.dispatch('getListsAll');
                //this.$store.dispatch('getUsers');
            }            
        },
        computed:{
            listsAll:function(){                
                return this.$store.state.selectedlistsAll;
            },
            postOffice:function(){
                return this.$store.state.postOffice;
            },
            showPathMap:function(){
                return this.$store.state.showPathMap;
            },
            listNew:function(){                
                return this.$store.state.listNew;
            }
        },
        methods:{
            toggleListAll(){
                this.hideBlock=!this.hideBlock;
            },
            afterLeave: function (el) {                
                this.slide=true;
            },
            beforeEnter:function(el){
                this.slide=false;
            }
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
    .hideblock{
        display: none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active для <2.1.8 */ {
        opacity: 0
    }
    
    
   .slideInRight {
  -webkit-animation-name: slideInRight;
  animation-name: slideInRight;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes slideInRight {
  0% {
  -webkit-transform: translateX(110%);
  transform: translateX(110%);
  visibility: visible;
  }
  100% {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  }
  }
  @keyframes slideInRight {
  0% {
  -webkit-transform: translateX(110%);
  transform: translateX(110%);
  visibility: visible;
  }
  100% {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  }
  } 

</style>