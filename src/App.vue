<template>
  <div id="app">
   <el-row class="tac">
   <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-menu-item index="1" @click="goHome">Главная</el-menu-item>

<el-submenu index="5">
    <template slot="title">Списки</template>
<el-menu-item index="5-1" @click="Listsnew">Создание списка</el-menu-item>    
<el-menu-item @click="Listsall" index="5-2">Все списки</el-menu-item>
<el-menu-item @click="Listsdiff" index="5-3">Сравнение списков</el-menu-item>
</el-submenu>   
         
<el-submenu index="4">
    <template slot="title">Заявки / работы</template>
<el-menu-item @click="createNewEvnt" index="4-1">Создать новую</el-menu-item>
</el-submenu>

<el-submenu index="6">
    <template slot="title">Отделения</template>
<el-menu-item @click="newPO" index="6-1">Новое отделение</el-menu-item>
<el-menu-item @click="editdelPO" index="6-2">Редактирование / удаление</el-menu-item>
</el-submenu>

<el-submenu index="7">
    <template slot="title">Пользователи</template>
<el-menu-item @click="allUsers" index="7-3">Все пользователи</el-menu-item>    
<el-menu-item @click="newUsers" index="7-1">Новый пользователь</el-menu-item>
<el-menu-item @click="editdelUsers" index="7-2">Редактирование / удаление</el-menu-item>
</el-submenu>

</el-menu>
<div class="line"></div>
<router-view></router-view>
</el-row>
<newevnt v-bind:showNewEvnt="showNewEvntDialog"></newevnt>
</div>
</template>

<script>
    import moment from 'moment'
    //import axios from 'axios'        
    import Newevnt from 'src/components/evnts/Newevnt.vue'
    
    moment().locale('ru');
    
    
    export default {                    
        name: 'app',
        data () {
            return {
                showNewEvntDialog:false
            }
        },
        components: {
          Newevnt          
        },
        created() {
            console.log('APP created');
            this.$store.dispatch('ymapstart');
            //this.$store.dispatch('loadAllPO');
        },
        computed:{
            dataSaveSuccessNotify(){
                return this.$store.state.successNotifyTxt;
            }
        },
        watch:{
            dataSaveSuccessNotify:function(n){
                if(n){
                    const h = this.$createElement;
                    this.$notify({
                        title: 'Сохранение данных',
                        message: h('i', { style: 'color: teal' }, 'Данные сохпраенены успешно')
                    });
                }
            }
        },
        methods: {
            goHome: function() {
                this.$router.push({
                    path: "/",
                    params: {
                        hi: "hi @at31_ded"
                    }
                });
            },
            
            
            Listsnew: function() {
                this.$router.push({
                    path: "/list-new",
                    params: {
                        hi: "hi @at31 in mapmain page"
                    }
                });
            },
            Listsall:function(){
                this.$router.push({
                    path: "/lists-all",
                    params: {
                        hi: "hi @at31 in mapmain page"
                    }
                });
            },
            Listsdiff:function(){},
            
            createNewEvnt: function() {
                this.$store.commit('SHOW_NEW_EVNT_DIALOG', true);
            },
            
            newPO:function(){},
            editdelPO:function(){},
            
            newUsers:function(){},
            editdelUsers:function(){},
            allUsers:function(){
                this.$router.push({
                    path: "/users",
                    params: {
                    }
                });
            },
            
            handleSelect: (val) => {
                //console.log(val);
            },
        },


    }

</script>
