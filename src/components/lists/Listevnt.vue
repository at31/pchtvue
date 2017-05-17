<template>
    <div class="m-panel">
        <el-tabs v-model="activeName">
        <el-tab-pane label="Задания из списка" name="first">
            <el-table :data="listsAll.evnts" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @selection-change="handleSelectionChange" @select="toggleRowSelect" ref="listsallevnt">
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
        name: 'listsallevnt',
        data () {        
            return {                
                activeName:'first'
            }
        },
        watch:{
            
        },
        computed:{
            listsAll:function(){                
                return this.$store.state.selectedlistsAll;
            }
        },
        methods:{
            handleSelectionChange(val) {      	
                this.multipleSelection = val;        
            },
            toggleRowSelect(rows,row){
                
            }            
        }
    }
</script>

<style>
    
</style>