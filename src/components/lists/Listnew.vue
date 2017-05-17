<template>
    <div class="m-panel">
        <el-tabs v-model="activeName">
        <el-tab-pane label="Новый список" name="first">
            <el-form ref="form" :model="listNew" label-width="120px">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Сохранить</el-button>
                </el-form-item>
                <el-form-item label="Название">
                    <el-input v-model="listNew.title"></el-input>
                </el-form-item>
                <el-form-item label="Описание">
                    <el-input v-model="listNew.description"></el-input>
                </el-form-item>
                <el-form-item label="Исполнитель">
                    <el-select v-model="listNew.executor" placeholder="Выберите исполнителя">
                        <el-option v-for="user in users" :key="user._id" :label="user.fio" :value="user._id"></el-option>                 
                    </el-select>
                </el-form-item>                
            </el-form>
            <br>
            <h4>Список заданий/работ</h4>
            <el-table :data="listNew.evnts" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @selection-change="handleSelectionChange" @select="toggleRowSelect" ref="listsallevnt">
              <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="Заголовок" prop="title" sortable>      
                </el-table-column>
                <el-table-column label="Статус" sortable prop="status">                  
                </el-table-column>
                <el-table-column label="Начало" prop="start"></el-table-column>
                <el-table-column label="Окончание" prop="end"></el-table-column>
                <el-table-column label="Описание" prop="description">                   
                </el-table-column>
          </el-table>
        </el-tab-pane>
             
    </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'listnew',
        data () {        
            return {                
                activeName:'first'
            }
        },
        watch:{
            
        },
        computed:{
            listNew:function(){                
                return this.$store.state.listNew;
            },
            users:function(){
                return this.$store.state.users;
            }
        },
        methods:{
            handleSelectionChange(val) {      	
                this.multipleSelection = val;        
            },
            toggleRowSelect(rows,row){
                
            },
            onSubmit(){
                //console.log(this.listNew);
                this.$store.dispatch('saveNewList');
            }
        }
    }
</script>

<style>
    
</style>