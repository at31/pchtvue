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
          <el-input v-model="sEvnt.title" placeholder=""></el-input>
           <el-input v-model="sEvnt.postalCode" placeholder=""></el-input>
            <el-input v-model="sEvnt.start" placeholder=""></el-input>
            <el-input v-model="sEvnt.end" placeholder=""></el-input>
            <el-input v-model="sEvnt.status" placeholder=""></el-input>
            <el-input v-model="sEvnt.description" placeholder=""></el-input>            
            <el-input v-model="sEvnt.executor" placeholder=""></el-input>                       
            <span slot="footer" class="dialog-footer">
            <el-button @click="showNewEvnt = false">Закрыть</el-button>
            <el-button @click="saveNewEvnt">Сохранить</el-button>                        
          </span>
 </el-dialog>

</el-col>     
</template>
<script>
    var moment = require('moment');
    moment().locale('ru');
    let id = 1000;

    export default {
        name: 'evntslist',
        data() {
      return {
        cpb:this.createPathBtn,  
        data:[],
        sEvnt:{},
        showEvntDetail:false,
        showNewEvnt:false,  
        defaultProps: {
          children: 'evnts',
          label: 'label'
            
        }
      }
    },
     mounted() {
            console.log(this.cpb);
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
        let evnt=
            //to do view "new event" modal view + запись событий в базу из store
        fetch('http://localhost:3000/po/all').then(function (response) {
                //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                //alert(response.status) // 200
                return response.json()
            }).then(function (data) {
                //console.log(data);
                //context.commit('ADD_TEST',data)

            });
        },
     checkEvntHolder:function(){
            console.log(this.$refs.evntstree.getCheckedNodes());
            console.log(this.$refs.evntstree.getCheckedKeys());
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
