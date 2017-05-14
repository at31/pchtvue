<template>
<!-- new evnt modal-->
<el-dialog title="Создание нового события" :visible.sync="show" size="tiny" @close="onClose">
         <span>Заголовок</span>
          <el-input v-model="newEvnt.title" placeholder=""></el-input>
           <el-input v-model="newEvnt.postalCode" placeholder=""></el-input>
            <el-date-picker v-model="newEvnt.start" type="datetime" placeholder="Select date and time">
    </el-date-picker>
           <el-date-picker v-model="newEvnt.end" type="datetime" placeholder="Select date and time">
    </el-date-picker>
            <el-input v-model="newEvnt.status" placeholder=""></el-input>
            <el-input v-model="newEvnt.description" placeholder=""></el-input>            
            <el-input v-model="newEvnt.executor" placeholder=""></el-input>                       
            <span slot="footer" class="dialog-footer">
            <el-button @click="show = false">Закрыть</el-button>
            <el-button @click="saveNewEvnt">Сохранить</el-button>                        
          </span>
 </el-dialog>
    
</template>
<script>
    import moment from 'moment'
    moment().locale('ru');

    export default {
        name: 'newevnt',
        data() {
      return {
        show:false,        
        newEvnt:{start:'',end:''},               
        }
      },
     mounted() {         
            //console.log(this.showNewEvnt);
     },    
    //props:{createPathBtn:Boolean},
    //props:["showNewEvnt"],    
    computed:{
        showNewEvntDialog:function(){            
            return this.$store.state.showCreateNew;
        }
    },
    watch:{
        showNewEvntDialog(_show){
            if(_show){
                this.show=true;
            }
        }
    },    
    methods: {
    onClose(){
        this.$store.commit('SHOW_NEW_EVNT_DIALOG',false);
    },    
    saveNewEvnt:function(){ 
            var nevnt={
                title:this.newEvnt.title,
                start:this.newEvnt.start,
                end:this.newEvnt.end,            
                status:this.newEvnt.status,
                description:this.newEvnt.description,
                executor:this.newEvnt.executor  
            };
        this.$store.dispatch('saveNewEvnt',nevnt);
                         
        }
    }
  }
    
</script>
