<template>
<!-- new user modal-->
<el-dialog title="Редактирование списка" :visible.sync="show" size="tiny" @close="onClose">
         <el-form :model="currList" :rules="rules" ref="currList" label-width="120px" class="user-ruleForm">
              <el-form-item label="Заголовок" prop="title">
                <el-input v-model="currList.title"></el-input>
              </el-form-item>
              <el-form-item label="Описание" prop="description">
                <el-input v-model="currList.description" ></el-input>
              </el-form-item>
              <el-form-item label="Исполнитель">
                    <el-select v-model="currList.executor.fio" placeholder="Выберите исполнителя">
                        <el-option v-for="user in users" :key="user._id" :label="user.fio" :value="user._id"></el-option>                 
                    </el-select>
                </el-form-item> 
           </el-form>                    
            <span slot="footer" class="dialog-footer">            
            <el-button v-if="editMode" @click="updateList">Сохранить изменение</el-button>
            <el-button v-if="!editMode" @click="deleteList">Удалить</el-button>
            <el-button @click="resetForm">Очистить</el-button>
            <el-button @click="show = false">Закрыть</el-button>
          </span>
 </el-dialog>
    
</template>
<script>
    import moment from 'moment'
    moment().locale('ru');

    export default {
        name: 'listdialog',
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
                //show: false,
                /*currList: {
                    _id:"",
                    title:"",
                    description:"",
                    executor:{fio:""}
                },*/
                currUser:{_id:"",
                          fio:""},
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }]
                }
            }
        },
        props:["editMode","show"], 
        mounted() {
            //console.log(this.showNewEvnt);
        },
        computed: {
            showListEditDialog: function() {
                return this.$store.state.showListEditDialog
            },
            currList:function(){                
                return this.$store.state.selectedlistsAll;
            },
            users:function(){
                return this.$store.state.users;
            }
        },
        watch: {
            showListEditDialog(_show) {
                /*-if (_show) {
                    this.show = true;
                }*/
                this.show=_show;
            },
            user:function(n){
                console.log('whatcher user', n);
                this.currList= {
                            _id:n._id,
                            
                        };
            }
        },
        methods: {
            onClose() {
                this.show=false;
            },
            updateList: function() {
                this.$refs.currList.validate(valid => {
                    if (valid) {                        
                        this.$store.dispatch('updateList', this.currList);
                        
                    } else {
                        console.log('ошибка валидации формы "редактирование удаление спискоа"');
                        return false;
                    }
                })
            },
            deleteList(){
                this.$store.dispatch('deleteList', this.currList);
            },
            resetForm(formName) {
                this.$refs.currUser.resetFields();
                this.currList= {                            
                            
                        };                        
            }
        }
    }
</script>