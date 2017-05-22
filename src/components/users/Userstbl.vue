<template>
    <div class="m-panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Пользователи" name="first">
            <el-table :data="users" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @current-change="handleSelectionChange" highlight-current-row ref="userstbl">
              
                <el-table-column label="ФИО" prop="fio" sortable>      
                </el-table-column>
                <el-table-column label="Логин" sortable prop="login">                  
                </el-table-column>
                <el-table-column label="e-mail" prop="email"></el-table-column>
                <el-table-column label="Роли" prop="role"></el-table-column>

          </el-table>
        </el-tab-pane>
        
</el-tabs>
</div>
</template>

<script>
    export default {
        name: 'listsuser',
        data() {
            return {
                activeName: 'first'
            }
        },
        props: ["users"],
        watch: {

        },
        mounted: function() {
            console.log('mounted user tbl');
        },
        computed: {
            
        },
        methods: {
            handleSelectionChange(val) {
                console.log('users tbl',val);
                //this.multipleSelection = val;
                if(val!==null)
                this.$store.commit('SET_CURR_USER',val);
            },
            toggleRowSelect(rows, row) {

            },
            handleClick(val){
                
            }
        }
    }
</script>

<style>

</style>