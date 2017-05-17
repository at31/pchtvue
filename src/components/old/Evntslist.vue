<template>
<el-col :span="5">
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
</el-tree>
<el-button @click="makePath" v-show="cpb">Создать маршрут</el-button>
<!-- создать собывтие или пачку событий по нажатию кнопки содаются события для отмеченных из списка отделений через чекбокс, событие добавляется из модалотьного окна -->
<el-button @click="showNewEvnt=true" v-show="cpb">Создать событие</el-button>
<h1 v-show="cpb">true</h1>
 <el-dialog title="Подробная информация" v-model="showEvntDetail" size="tiny">
     <span>Мероприятие -  {{sEvnt.title}}</span>
            <el-input v-model="sEvnt.postalCode" placeholder=""></el-input>
            <el-input v-model="sEvnt.start" placeholder=""></el-input>
            <el-input v-model="sEvnt.end" placeholder=""></el-input>
            <el-input v-model="sEvnt.status" placeholder=""></el-input>
            <el-input v-model="sEvnt.description" placeholder=""></el-input>            
            <el-input v-model="sEvnt.executor" placeholder=""></el-input>                       
            <span slot="footer" class="dialog-footer">
            <el-button @click="showEvntDetail = false">Закрыть</el-button>            
          </span>
 </el-dialog>


<!-- new evnt modal-->
<el-dialog title="Создание нового события" v-model="showNewEvnt" size="tiny">
         <span>Заголовок</span>
          <el-input v-model="newEvnt.title" placeholder=""></el-input>
           <el-input v-model="newEvnt.postalCode" placeholder=""></el-input>
            <el-date-picker v-model="newEvnt.start" type="datetime" placeholder="Select date and time">
    </el-date-picker>
           <el-date-picker v-model="newEvnt.end" type="datetime" placeholder="Select date and time">
    </el-date-picker>
            <el-input v-model="newEvnt.status" placeholder=""></el-input>
            <el-input v-model="newEvnt.description" placeholder=""></el-input>            
            <el-input v-model="newEvnt.executor" placeholder=""></el-input>                       
            <span slot="footer" class="dialog-footer">
            <el-button @click="showNewEvnt = false">Закрыть</el-button>
            <el-button @click="saveNewEvnt">Сохранить</el-button>                        
          </span>
 </el-dialog>

</el-col>     
</template>
<script>
    import moment from 'moment'
    import axios from 'axios'
    
    moment().locale('ru');
    let id = 1000;

    export default {
        name: 'evntslist',
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
