<template>
       <el-row :gutter="10">
           <h1>{{ msg }}</h1>                              
       <el-col :span="4">
           <mapfilter></mapfilter>
       </el-col>
       <!--el-col :span="16">
           <amap></amap>
        </el-col>
        <el-col :span="4">
            <polist></polist>
        </el-col-->
        <el-col :span="14">
           <amap></amap>
        </el-col>
        <el-col :span="6">
            <potable></potable>
        </el-col>
        
        
        <el-dialog title="Подробная информация" v-model="showInfo" size="small"  @close="onDetailClose">
          <span>Отделение -  {{po.postalCode}}</span>
           <el-tabs >
               <el-tab-pane label="Отделение" >
                  <el-form :model="po">
                      <el-form-item label="Индекс">
                          <el-input v-model="po.postalCode"></el-input>
                      </el-form-item>
                      <el-form-item label="Регион">
                          <el-input v-model="po.region"></el-input>
                      </el-form-item>
                      <el-form-item label="Город">
                          <el-input v-model="po.settlement"></el-input>
                      </el-form-item>
                      <el-form-item label="Тип">
                          <el-input v-model="po.typeCode"></el-input>
                      </el-form-item>
                      <el-form-item label="Адрес">
                          <el-input v-model="po.addressSource"></el-input>
                      </el-form-item>
                      <div v-for="phone in po.phones">
                          <el-input v-model="phone.phoneTypeName"></el-input>
                          <el-input v-model="phone.phoneNumber"></el-input>
                      </div>
                  </el-form>
               </el-tab-pane>
               <el-tab-pane label="Задания" >
                    <div v-for="e in po.evnts">
                        <p>
                            <h3>{{e.title}}</h3>
                            <h4>{{e.mstart}} - {{e.mend}}</h4>                            
                            <h4>{{e.status}}</h4>                            
                            <h4>{{e.executor}}</h4>                            
                            <h4>{{e.description}}</h4>
                            <hr>
                        </p>
                    </div>
               </el-tab-pane>
            </el-tabs>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="showPODetail = false">Закрыть</el-button>            
          </span>
        </el-dialog>
        
       </el-row>       
</template>

<script>
    import moment from 'moment'
    //import axios from 'axios'
        
    import Amap from 'src/components/Amap.vue'
    import Mapfilter from 'src/components/Mapfilter.vue'
    import Polist from 'src/components/Polist.vue'
    import Potable from 'src/components/Potable.vue'
    
    moment().locale('ru');
    
    export default {
        name:"MapMain",
        data () {
            return {
                msg:"",
                showInfo:false,
                po:{}
                
            }
        },
        components: {
            Amap,
            Mapfilter,
            Polist,
            Potable
        },
        mounted() {        
            this.$store.dispatch('ymapstart');
        },
        methods:{
            onDetailClose(){
                this.po={};
            }
        },
        computed:{
            showPODetail(){
                return this.$store.state.detailPO;
            }
        },
        watch:{
            showPODetail:function(n,o){
                console.log(n);
                if(n){
                    this.po=n;
                    this.po.evnts.forEach(evnt=>{
                        evnt.mstart=moment(evnt.start).format('YYYY-MM-DD hh:mm');
                        evnt.mend=moment(evnt.end).format('YYYY-MM-DD hh:mm');
                    });                    
                    this.showInfo=true;                   
                }            
            }
        }
    }
</script>

<style>
     .m-panel
    {
        padding-left: 15px;
        padding-right: 15px;
    }
    h1{margin-top:0px;}
</style>