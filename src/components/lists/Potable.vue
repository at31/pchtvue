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
    
    <el-tabs @tab-click="handleTabClick" v-model="activeName">
        <el-tab-pane label="Отделения" name="first">
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
        <el-tab-pane label="Заявки / работы" name="second">
            <el-select v-model="evntTypeFilter" multiple placeholder="Выберите тип" @change="onChangeEvntTypeFilter">
                <el-option v-for="type in evnttype" :key="type" :label="type" :value="type">                    
                </el-option>                 
              </el-select>
              <ul id="">
                     <li v-for="evnt in evnts">
                     {{evnt.label}} - 
                     <a href="#" @click.prevent="onShowEvntDetail(evnt)">Детали</a>
                     <a href="#" @click.prevent="onDeleteEvntFromEvntsList(evnt)">Удалить</a>
                      </li>
                </ul>
        </el-tab-pane>
        <el-tab-pane label="Hard" name="third">
            
        </el-tab-pane>
        <el-tab-pane label="Soft" name="fourth">
            
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
          
        activeName: 'first',  
        multipleSelection: [],
        evntTypeFilter:[], //сюда собирается выбор селекта
        evnttype:[],  //текст для селекта
        evnts:[] // all evnts  
      }
    },
    mounted() {
            //console.log(this.cpb);
     },
    updated(){                
         this.selectedPO.forEach(po => {             
            if(po.fixed){
                //console.log(po);
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
    watch:{
        selectedPO(){
            let typeset=new Set();
            let to={};
            this.evnts.forEach(evnt=>{
                if(to.hasOwnProperty(evnt.postalCode)){
                    to[evnt.postalCode].push(evnt);
                }else{
                    to[evnt.postalCode]=[evnt];
                }
            });
            this.evnts=[];
            this.selectedPO.forEach(po=>{
               if(to.hasOwnProperty(po.postalCode)){
                   this.evnts=this.evnts.concat(to[po.postalCode]);
               }else{
                 po.evnts.forEach(evnt=>{
                    this.evnts.push(evnt);
                });  
               }                 
            });
            this.evnts.forEach(evnt=>{
                typeset.add(evnt.title); 
            });
            this.evnttype=[...typeset];
        }
    },    
    methods: {
    onShowEvntDetail(evnt){
        this.$store.commit('SHOW_EVNT_DETAIL',evnt);
    },
    onDeleteEvntFromEvntsList(evnt){
        let indx=this.evnts.indexOf(evnt);
        this.evnts.splice(indx,1);
    },
    onChangeEvntTypeFilter(val){
        this.evnts=[];
        this.selectedPO.forEach(po=>{
            po.evnts.forEach(evnt=>{
                if(val.length==0){
                    this.evnts.push(evnt);
                }else if(val.length>0){
                    if(val.indexOf(evnt.title)!=-1){
                        this.evnts.push(evnt);
                    }
                }                              
            })
        });
    },    
    handleTabClick(tab){
        //tab.name
        if(tab.name=='second'){
            
            
        }//tab second end
    },    
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
    detailWork(){
        
        this.$router.push(
            {
                path:"/list-new-form"
            });  
        
        this.$store.commit('PREPARE_NEW_LISTS',this.evnts);
    },        
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
