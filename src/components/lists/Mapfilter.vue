<template>
    <div class="m-panel">
        <h1>Фильтр</h1>
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
    </div>
</template>

<script>
    export default {
        name:"mapfilter",
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
        computed:{
            postalcode:function(){
                return this.filterForm.postalCode;
            }
        },
        watch:{
            postalcode: function(n, o) {
               // console.log('n ->' + n + ' o->' + o);
                var foobody = `if (obj.postalCode.search(${n})>-1){
                                    return true;
                                }else{
                                    return false;
                                }`;
                this.filter.postalCode = new Function('obj', foobody);                
            }
        },
        methods: {
            submitForm(formName)
            {
                console.log(this.$refs[formName]);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.$store.dispatch('filterMap', this.filter);
                        //console.log(this.filter);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }                
                });
            },
            removeFilter(){
                this.$store.dispatch('removeFilterMap');
            }
        },
        components: {
        }
    }
</script>

<style>
    
</style>