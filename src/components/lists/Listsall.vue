<template>
    <div>
        <el-tabs v-model="activeName">
        <el-tab-pane label="Все списки заданий" name="first">
            <el-table :data="listsAll" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @current-change="handleSelectionChange"  ref="listsall" highlight-current-row>
                <el-table-column label="Исполнитель" prop="executor.fio" sortable>      
                </el-table-column>
                <el-table-column label="Отд." sortable prop="listsAllPOs">                  
                </el-table-column>
                <el-table-column label="Заявки" prop="listsAllEvnts"></el-table-column>
                <el-table-column label="Название" prop="title"></el-table-column>
                <el-table-column label="Описание" prop="description">                   
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
        name: 'listsall',
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
                filter:{},
                currentRow: null,
                activeName: 'first'
            }
        },
        watch:{
            
        },
        computed:{
            listsAll:function(){
                return this.$store.state.listsAll;
            }
        },
        methods:{
            handleSelectionChange(currentRow, oldCurrentRow) {
                this.currentRow = currentRow;
                this.$store.commit('LISTSALL_SELECTED',currentRow);
            },
            setCurrent(row) {
                console.log(row);
                this.$refs.listsall.setCurrentRow(row);
            },
            submitForm(formName)
            {
                console.log(this.$refs[formName]);
                /*this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.$store.dispatch('filterMap', this.filter);
                        //console.log(this.filter);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }                
                });*/
            },
            removeFilter(){
                //this.$store.dispatch('removeFilterMap');
            }
        }
    }
</script>

<style>
    
</style>