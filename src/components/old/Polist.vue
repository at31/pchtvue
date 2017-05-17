<template>
<div class="m-panel">
   <h1>Список</h1>
    <el-button-group class="list-buttongr">
        <el-button type="primary" @click="">
            <icon name="check-circle"></icon>
        </el-button>
        <el-button type="danger" @click="">
            <icon name="ban"></icon>
        </el-button>
        <el-button type="default" @click="">
            <icon name="truck"></icon>
        </el-button>
        <el-button type="default" @click="">
            <icon name="list"></icon>            
        </el-button>          
    </el-button-group>    
   <el-tree
  :data="selectedPO"
  :props="defaultProps"
  show-checkbox
  node-key="id"
  default-expand-all
  :expand-on-click-node="false"
  :render-content="renderContent"
  @check-change="checkEvntHolder"
  ref="evntstree">
    </el-tree>
</div>
</template>
<script>
    import moment from 'moment'
    import axios from 'axios'
    
    moment().locale('ru');
    let id = 1000;

    export default {
        name: 'polist',
        data() {
      return {
        cpb:this.createPathBtn,  
        data:[],
        sEvnt:{},
        newEvnt:{start:'',end:''},  
        showEvntDetail:false,
        showNewEvnt:false,  
        defaultProps: {
          children: 'evnts',
          label: 'label'
            
        }
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
      },

      renderContent(h, { node, data, store }) {          
       return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="margin-right: 20px">
              <el-button size="mini" on-click={ () => this.showevnt(store, data) }>Подробно</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>Удалить</el-button>
            </span>
          </span>);
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
