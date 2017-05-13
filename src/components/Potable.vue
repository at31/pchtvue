<template>
<div class="m-panel">
   <h1>Таблица</h1>
    <el-button-group class="list-buttongr">
        <el-button type="primary" @click="fixValues">
            <icon name="check-circle"></icon>
        </el-button>
        <el-button type="danger" @click="unfixValues">
            <icon name="ban"></icon>
        </el-button>
        <el-button type="default" @click="createPath">
            <icon name="truck"></icon>
        </el-button>
        <el-button type="default" @click="destroyPath">
            <icon name="map-marker"></icon>
        </el-button>
        <el-button type="default" @click="removeUnselected">
            <icon name="trash"></icon>
        </el-button>
        <el-button type="default" @click="detailWork">
            <icon name="list"></icon>            
        </el-button>        
    </el-button-group>
    
    <el-tabs>
        <el-tab-pane label="Отделения" >
            <el-table :data="selectedPO" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @selection-change="handleSelectionChange" @select="toggleRowSelect" ref="potable">
              <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="Индекс" prop="label" sortable>      
                </el-table-column>
                <el-table-column label="Заданий" sortable prop="evntsLength">
                  <!--template scope="scope">
                      <p>{{scope.row.evnts.length}}</p>
                  </template-->
                </el-table-column>
                <el-table-column label="Действия">
                  <template scope="scope">
                    <el-button size="small" @click="showDetail(scope.$index, scope.row)">
                        <icon name="info-circle"></icon>
                    </el-button>
                    <el-button size="small" type="danger" @click.native.prevent="handleDelete(scope.$index, scope.row)">
                        <icon name="trash"></icon>
                    </el-button>
                  </template>
                </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Заявки / работы" >
            
        </el-tab-pane>
        <el-tab-pane label="Hard" >
            
        </el-tab-pane>
        <el-tab-pane label="Soft" >
            
        </el-tab-pane>
    </el-tabs>                
</div>
</template>
<script>
    import moment from 'moment'
    import axios from 'axios'
    
    moment().locale('ru');
    let id = 1000;

    export default {
        name: 'potable',
        data() {
      return {
        cpb:this.createPathBtn,  
        data:[],
        sEvnt:{},
        newEvnt:{start:'',end:''},  
        showEvntDetail:false,
        showNewEvnt:false,
          
        multipleSelection: []  

      }
    },
     mounted() {
            //console.log(this.cpb);
     },
    updated(){        
         this.selectedPO.forEach(po => {             
            if(po.fixed){
                console.log(po);
                this.$refs.potable.toggleRowSelection(po, true);                
            }            
          });
       // console.log(this.multipleSelection);
    },    
    //props:{createPathBtn:Boolean},
    props:["createPathBtn"],    
    computed:{
        selectedPO:function(){            
            return this.$store.state.selectedPO;
        }
    },    
    methods: {
    removeUnselected(){
        this.$store.commit('REMOVE_UNSELECTED');
    },    
    fixValues(){
        
        this.$store.commit('FIX_SELECTED_VALUES_OP',this.multipleSelection);
        // not vuex )))
        /*this.multipleSelection.forEach(function(otd){
            otd.fixed=true;
        });*/
    },
    unfixValues(){
        this.$store.commit('UNFIX_SELECTED_VALUES_OP');
    },    
    createPath(){
         this.$store.dispatch('makePath');
    },
    destroyPath(){
        this.$store.dispatch('destroyPath');
    },    
    detailWork(){},    
    handleSelectionChange(val) {
      	//console.log(val);
        this.multipleSelection = val;        
    },
    toggleRowSelect(rows,row){
        this.$store.commit('TOGGLEFIX_OP',row);
    },    
    showDetail(index, row) {
        this.$store.commit('SHOW_OP_DETAIL',row)
        //console.log(index, row);
      },
    handleDelete(index, row) {
        this.$store.commit('SELECTEDPO_DELETE_ONE',row);
        //console.log(row);
      }
    }
  }
</script>
<style>
    .el-tree{
        height: 600px;
        overflow: scroll;
    }
    .list-buttongr{
        margin-bottom: 10px;
    }
   
</style>
