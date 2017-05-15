<template>
    <div>
        <el-tabs @tab-click="handleTabClick" v-model="activeName">
        <el-tab-pane label="Все списки заданий" name="first">
            <el-table :data="selectedPO" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @selection-change="handleSelectionChange" @select="toggleRowSelect" ref="listsall">
              <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="Исполнитель" prop="user.fio" sortable>      
                </el-table-column>
                <el-table-column label="Отд." sortable prop="listsLength">                  
                </el-table-column>
                <el-table-column label="Заявки" prop=evntsAllLength>                  
                </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Фильтры" name="second">
            <el-form ref="filterForm" :model="filterForm" :rules="filterFormRules" label-width="120px" label-position="top" class="filter-form">
            <el-form-item label="Индекс" prop="postalCode">
                <el-input type="text" v-model="filterForm.postalCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>                
                <el-button type="primary" @click="submitForm('filterForm')">Применить</el-button>
            </el-form-item>                      
            <el-form-item>
                <el-button @click="removeFilter">Сбросить все фильтры</el-button>
            </el-form-item>
        </el-form>
        </el-tab-pane>        
    </el-tabs>
    </div>
</template>

<script>
    export default {
        data () {
           var validatePostalCode = (rule, value, callback) => {                 
                 if (value === '') {
                     callback(new Error('введите индекс'));
                 } else {
                     /*if (this.ruleForm2.checkPass !== '') {
                         this.$refs.ruleForm2.validateField('checkPass');
                     }*/
                     //console.log(this.filter);
                     callback();
                 }
             };
            return {
                filterForm:{
                    postalCode:"",
                },
                filterFormRules: { 
                    postalCode: [ 
                        { validator: validatePostalCode, trigger: 'blur' } 
                    ]
                },
                filter:{}
            }
        },
        components: {
        }
    }
</script>

<style>
    
</style>