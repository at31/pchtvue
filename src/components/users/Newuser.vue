<template>
<!-- new user modal-->
<el-dialog title="Создание нового пользователя" :visible.sync="show" size="tiny" @close="onClose">
         <el-form :model="newUser" :rules="rules" ref="newUserForm" label-width="120px" class="user-ruleForm">
              <el-form-item label="Login" prop="login">
                <el-input v-model="newUser.login"></el-input>
              </el-form-item>
              <el-form-item label="pass" prop="pass">
                <el-input v-model="newUser.pass"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="newUser.email"></el-input>
              </el-form-item>
              <el-form-item label="роль" prop="role">
                <el-input v-model="newUser.role"></el-input>
              </el-form-item>
              <el-form-item label="ФИО" prop="fio">
                <el-input v-model="newUser.fio"></el-input>
              </el-form-item>
           </el-form>                    
            <span slot="footer" class="dialog-footer">
            <el-button @click="show = false">Закрыть</el-button>
            <el-button @click="saveNewUser">Сохранить</el-button>                        
          </span>
 </el-dialog>
    
</template>
<script>
    import moment from 'moment'
    moment().locale('ru');

    export default {
        name: 'newuser',
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
                newUser: {
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
        mounted() {
            //console.log(this.showNewEvnt);
        },
        computed: {
            showNewUserDialog: function() {
                return this.$store.state.showNewUser
            }
        },
        watch: {
            showNewUserDialog(_show) {            
                    this.show = _show;
            }
        },
        methods: {
            onClose() {
                this.$store.commit('SHOW_NEW_USER_DIALOG', false);
            },
            saveNewUser: function() {
                this.$refs.newUserForm.validate(valid => {
                    if (valid) {                        
                        this.$store.dispatch('saveNewUser', this.newUser);
                    } else {
                        console.log('ошибка валидации формы "новый пользователь"');
                        return false;
                    }
                })
            },
            resetForm() {
                this.$refs.newUserForm.resetFields();
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