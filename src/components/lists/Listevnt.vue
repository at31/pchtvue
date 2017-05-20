<template>
    <div class="m-panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
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
        <el-tab-pane label="Маршрут" name="second">
                <el-table :data="listsAll.path" border style="width: 100%" height="700"  ref="listspath">   <el-table-column label="Индекс" prop="postalCode" >      
                </el-table-column>
                <el-table-column label="Адрес" prop="addressSource">                  
                </el-table-column>
                <el-table-column label="№" >
                    <template scope="scope">
                        <input v-model="scope.row.pindx">
                    </template>
                </el-table-column>                                 
                                                  
          </el-table>
          <el-button @click.prevent="onRebuildPath">Перестроить маршрут</el-button>
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
        props:["listsAll"], 
        watch:{
            
        },
        mounted:function(){
            console.log('mounted');
        },
        computed:{
            /*listsAll:function(){                
                return this.$store.state.selectedlistsAll;
            }*/
        },
        methods:{
            handleSelectionChange(val) {      	
                this.multipleSelection = val;        
            },
            toggleRowSelect(rows,row){
                
            },
            handleClick(val){
                if(val.name=="second"){
                    this.$store.commit("SHOW_PATH_MAP",true);
                }else{
                    this.$store.commit("SHOW_PATH_MAP",false);
                }
            },
            onRebuildPath(){
                this.listsAll.path.sort(function(a,b){
        	if (a.pindx > b.pindx) {
    					return 1;
  				}
  				if (a.pindx < b.pindx) {
    				return -1;
  				}
  					return 0;
                });
                let tarr=this.listsAll.path;
                this.listsAll.path=[];
                this.listsAll.path=tarr;
            }
        }
    }
</script>

<style>
    
</style>