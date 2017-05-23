<template>
 <div>
  <el-row :gutter="10">
    <h1>{{ msg }}</h1>
    <div class="m-panel">
        <el-button @click="toggleListAll">Скрыть/показать все списки</el-button>
    </div>
    </el-row>    
    
<el-row :gutter="10" class="r-row">    
     <transition name="fade" mode="out-in">
         <el-col :span="16" v-show="hideBlock" >
             <el-col :span="12">
                  <listsall></listsall>
              </el-col>
              <el-col :span="12">
                  <listevnt v-bind:listsAll="listsAll"></listevnt>
              </el-col>
         </el-col>      
        </transition>
        <transition name="fade" mode="out-in">
         <el-col :span="16" v-show="!hideBlock" >
             <el-col :span="8">
                  <listnew></listnew>
              </el-col>
              <el-col :span="16">
                  <apath v-bind:selectedList="listNew"></apath>
              </el-col>
         </el-col>      
        </transition>    
      <el-col :span="8" key="ln" class="m-abslt">
          <listevnt v-bind:listsAll="listNew"></listevnt>
      </el-col>    
    </el-row>  
      </div>
</template>

<script>
    import Listsall from 'src/components/lists/Listsall.vue'
    import Listevnt from 'src/components/lists/Listevnt.vue'
    import Listnew from 'src/components/lists/Listnew.vue'
    import Apath from 'src/components/lists/Apath.vue'
    //import Mmap from 'src/components/Mmap.vue'
    
    //:class="{ slideInRight: slide}"
    //v-on:after-leave="afterLeave"  v-on:before-enter="beforeEnter"
    
    
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
    
    .r-row{
        position:relative;
    }
    .m-abslt{
        position:absolute;
        top:0;
        right: 0;
    }
    
    .hideblock{
        display: none;
    }
    .fade-transition {
  opacity: 1;
  transition: all .5s linear;
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