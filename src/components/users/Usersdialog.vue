<template>
<!-- new user modal-->
<el-dialog title="Создание нового пользователя" :visible.sync="show" size="tiny" @close="onClose">
         <el-form :model="currUser" :rules="rules" ref="currUser" label-width="120px" class="user-ruleForm">
              <el-form-item label="Login" prop="login">
                <el-input v-model="currUser.login"></el-input>
              </el-form-item>
              <el-form-item label="pass" prop="pass">
                <el-input v-model="currUser.pass" auto-complete="off" type="password"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="currUser.email"></el-input>
              </el-form-item>
              <el-form-item label="роль" prop="role">
                <el-input v-model="currUser.role"></el-input>
              </el-form-item>
              <el-form-item label="ФИО" prop="fio">
                <el-input v-model="currUser.fio"></el-input>
              </el-form-item>
           </el-form>                    
            <span slot="footer" class="dialog-footer">            
            <el-button @click="updateUser">Сохранить изменение</el-button>
            <el-button @click="deleteUser">Удалить</el-button>
            <el-button @click="resetForm('currUser')">Очистить</el-button>
            <el-button @click="show = false">Закрыть</el-button>
          </span>
 </el-dialog>
    
</template>
<script>
    import moment from 'moment'
    moment().locale('ru');

    export default {
        name: 'userdialog',
        data() {
            var validatePass = (rule, val, callback) => {
                if (val === ''){
                    callback(new Error('Введите пароль'));
            } else {
                //дополнительные условия и проверки при удачном прохождении callback() else callback(new Error('какая-то ошибка'));
                callback();
            }
            };
            return {
                show: false,
                currUser: {
                    _id:"",
                    email: "",
                    pass: "",
                    role: "",
                    login: "",
                    fio: ""
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }]
                }
            }
        },
        props:["user"],
        mounted() {
            //console.log(this.showNewEvnt);
        },
        computed: {
            showUserDialog: function() {
                return this.$store.state.showUserDialog
            }            
        },
        watch: {
            showUserDialog(_show) {
                /*-if (_show) {
                    this.show = true;
                }*/
                this.show=_show;
            },
            user:function(n){
                console.log('whatcher user', n);
                this.currUser= {
                            _id:n._id,
                            email: n.email,
                            pass: n.pass,
                            role: n.role,
                            login: n.login,
                            fio: n.fio
                        };
            }
        },
        methods: {
            onClose() {
                this.$store.commit('SHOW_USER_DIALOG', false);
            },
            updateUser: function() {
                this.$refs.currUser.validate(valid => {
                    if (valid) {                        
                        this.$store.dispatch('updateUser', this.currUser);
                        
                    } else {
                        console.log('ошибка валидации формы "пользователь"');
                        return false;
                    }
                })
            },
            deleteUser(){
                this.$store.dispatch('deleteUser', this.currUser);
            },
            resetForm(formName) {
                this.$refs.currUser.resetFields();
                this.currUser= {                            
                            email: "",
                            pass: "",
                            role: "",
                            login: "",
                            fio: ""
                        };                        
            }
        }
    }
</script>