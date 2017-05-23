<template>
<!-- new user modal-->
<el-dialog title="Редактирование списка" :visible.sync="show" size="tiny" @close="onClose">
         <el-form :model="cList" :rules="rules" ref="cList" label-width="120px" class="user-ruleForm">
              <el-form-item label="Заголовок" prop="title">
                <el-input v-model="cList.title"></el-input>
              </el-form-item>
              <el-form-item label="Описание" prop="description">
                <el-input v-model="cList.description" ></el-input>
              </el-form-item>
              <el-form-item label="Исполнитель">
                    <el-select v-model="fio" placeholder="Выберите исполнителя" @change="onUserSelect">
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
            var validateTitle = (rule, val, callback) => {
                if (val === ''){
                    callback(new Error('Введите название'));
            } else {
                //дополнительные условия и проверки при удачном прохождении callback() else callback(new Error('какая-то ошибка'));
                callback();
            }
            };
            return {
                show: false,
                cList: {
                    _id:"",
                    title:"",
                    description:"",
                    executor:{fio:""}
                },
                fio:"",
                rules: {
                    title: [{
                        validator: validateTitle,
                        trigger: 'blur'
                    }]
                }
            }
        },
        props:["editMode"], 
        mounted() {
            //console.log('mounted list dialog',this.currList);
        },
        computed: {
            showListEditDialog: function() {
                return this.$store.state.showListDialog
            },
            users:function(){
                return this.$store.state.users;
            },
            currList:function(){
                return this.$store.state.selectedlistsAll;
            }
        },
        watch: {
            currList:function(n){
                if(n!==null){
                    var jstr=JSON.stringify(n)
                    this.cList=JSON.parse(jstr);
                    console.log(n);
                    this.fio=this.cList.executor.fio;
                }
            },
            showListEditDialog(_show) {                
                this.show=_show;
            },
            
        },
        methods: {
            onUserSelect(val){
                this.cList.executor=val;
            },
            onClose() {            
                this.$store.commit('SHOW_LIST_DIALOG',false);
            },
            updateList: function() {
                this.$refs.cList.validate(valid => {
                    if (valid) {
                                
                        this.$store.dispatch('updateList', this.cList);
                        
                    } else {
                        console.log('ошибка валидации формы "редактирование удаление списка"');
                        return false;
                    }
                })
            },
            deleteList(){                
                this.$store.dispatch('deleteList', this.cList);
            },
            resetForm(formName) {
               // this.$refs.currUser.resetFields();
                this.currList= {                            
                            
                        };                        
            }
        }
    }
</script>