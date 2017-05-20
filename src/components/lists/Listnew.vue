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
            onSubmit(){
                //console.log(this.listNew);
                this.$store.dispatch('saveNewList');
                this.$router.push(
                    {
                        path:"/"
                    }); 
            }
        }
    }
</script>

<style>
    
</style>