<template>
<!-- new evnt modal-->
<el-dialog title="Создание нового события" :visible.sync="show" size="tiny" @close="onClose">
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="Login" prop="name">
                <el-input v-model="newUser.login"></el-input>
              </el-form-item>
              <el-form-item label="pass" prop="name">
                <el-input v-model="newUser.pass"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="name">
                <el-input v-model="newUser.email"></el-input>
              </el-form-item>
              <el-form-item label="роль" prop="name">
                <el-input v-model="newUser.role"></el-input>
              </el-form-item>
              <el-form-item label="ФИО" prop="name">
                <el-input v-model="newUser.fio"></el-input>
              </el-form-item>
           </el-form>                    
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
        name: 'newuser',
        data() {
      return {
        show:false,        
        newUser:{
            email: "",
			pass: "",
			role: "",
			login: "",
			fio: ""
        },               
        }
      },
     mounted() {         
            //console.log(this.showNewEvnt);
     },    
    //props:{createPathBtn:Boolean},
    //props:["showNewEvnt"],    
    computed:{
        showNewUserDialog:function(){            
            return this.$store.state.showNewUser
        }
    },
    watch:{
        showNewUserDialog(_show){
            if(_show){
                this.show=true;
            }
        }
    },    
    methods: {
    onClose(){
        this.$store.commit('SHOW_NEW_USER_DIALOG',false);
    },    
    saveNewEvnt:function(){ 
        console.log(this.newEvnt.end);
            var nuser={          
			email: this.email,
			pass: this.pass,
			role: this.role,
			login: this.login,
			fio: this.fio
            };
        this.$store.dispatch('saveNewUser',nuser);
                         
        }
    }
  }
    
</script>
