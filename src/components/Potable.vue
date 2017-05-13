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
   <el-table :data="selectedPO" border style="width: 100%" height="700" :default-sort = "{order: 'descending'}"  @selection-change="handleSelectionChange">
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
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            <icon name="info-circle"></icon>
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            <icon name="trash"></icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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
    handleEdit(index, row) {
        console.log(index, row);
      },
    handleDelete(index, row) {
        console.log(row);
      },    
    saveNewEvnt:function(){ 
            let poarr=this.$refs.evntstree.getCheckedNodes();
        //console.log(poarr);
            let evntarr=[];
            if(poarr.length>0) 
            {                
                for(var i=0;i<poarr.length;i++)
                {
                    if(poarr[i].hasOwnProperty('evnts'))
                    {
                         evntarr.push({
                            title:this.newEvnt.title,
                            start:this.newEvnt.start,
                            end:this.newEvnt.end,
                            postalCode:poarr[i].postalCode,
                            status:this.newEvnt.status,
                            description:this.newEvnt.description,
                            executor:this.newEvnt.executor
                        });
                        //console.log(poarr[i].postalCode);       
                    }                     
                }                
            }
            if(evntarr.length>0)
            {
                axios.post(`http://127.0.0.1:3000/evnt/save/multi`,evntarr)
                 .then(response => {
                    this.$store.dispatch('ymaprender');
                    //console.log(response.data)                    
                })
                 .catch(e => {console.log(e)});                
            }             
        },
    checkEvntHolder:function(){
            //console.log(this.$refs.evntstree.getCheckedNodes());
            //console.log(this.$refs.evntstree.getCheckedKeys());
        },    
    makePath:function(){
          this.$store.dispatch('makePath');
          //console.log(JSON.stringify(this.$store.state.route));
      },        
      showevnt(store, data) {
        //store.append({ id: id++, label: 'testtest', children: [] }, data);
          this.sEvnt=data;
          this.sEvnt.start=moment(data.start).format('YYYY-MM-DD hh:mm');
          this.sEvnt.end=moment(data.end).format('YYYY-MM-DD hh:mm');
          this.showEvntDetail=true;
      },

      remove(store, data) { 
        //нужно изменить порядок, сначала удалять из глобального $store и если это не родитель то запускать удаление   store.remove(data);... сейчас дерево рендерится два раза подряд, что не есть гуд в итоге.
        store.remove(data);          
        this.$store.dispatch('removePOSelectedList',data);
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
