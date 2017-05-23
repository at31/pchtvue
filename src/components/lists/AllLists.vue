<template>
  <el-row :gutter="10">
    <h1>{{ msg }}</h1>
     <el-col :span="24">
         <el-button-group>
             <el-button @click="onEditList">
                 <icon name="edit"></icon>
                 <span>Редактировать список</span>
             </el-button>
             <el-button @click="onDeleteList">
                 <icon name="trash"></icon>
                 <span>Удалить список</span>
             </el-button>
             <el-button @click="">
                 <icon name="edit"></icon>
                 <span>Редактировать событие</span>
             </el-button>
             <el-button @click="">
                 <icon name="trash"></icon>
                 <span>Удалить событие</span>
             </el-button>
         </el-button-group>
     </el-col>
     <transition name="fade">
      <el-col :span="8" >
          <listsall></listsall>
      </el-col>
    </transition>
     <transition name="fade" >
      <el-col :span="8" >
          <listevnt v-bind:listsAll="listsAll"></listevnt>
      </el-col>
    </transition>
     <transition name="fade" >
      <el-col :span="8" v-if="showPathMap">
          <apath v-bind:selectedList="listsAll"></apath>
      </el-col>
    </transition>      
    
    <listsdialog v-bind:editMode="editMode" ></listsdialog>
    
    </el-row>        
</template>

<script>
    import Listsall from 'src/components/lists/Listsall.vue'
    import Listevnt from 'src/components/lists/Listevnt.vue'
    import Apath from 'src/components/lists/Apath.vue'
    import Listsdialog from 'src/components/lists/Listsdialog.vue'

    export default {
        name: 'alllists',
        components: {
          //  Mmap,
            Listevnt,
            Listsall,
            Apath,
            Listsdialog
        },
        data() {
            return {
                //msg: 'lists'
                hideBlock:false,
                slide:false,
                editMode:true,
                show:false
            }
        },
        props:['msg'],
        mounted() {                        
        },
        watch:{
            postOffice:function(){
                /*this.$store.dispatch('getListsAll');
                this.$store.dispatch('getUsers');*/
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
            }
        },
        methods:{
            onEditList(){
                this.editMode=true;
                this.$store.commit('SHOW_LIST_DIALOG',true);
            },
            onDeleteList(){
                this.editMode=false;
                this.$store.commit('SHOW_LIST_DIALOG',true);
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
   
</style>