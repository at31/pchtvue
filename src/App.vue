<template>
  <div id="app">
   <el-row class="tac">
   <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-menu-item index="1" @click="goHome">Главная</el-menu-item>
   <el-menu-item index="2" @click="goMapMain">Карта - главная</el-menu-item>
  <el-menu-item index="3" @click="goListCreate">Создание списка (карта)</el-menu-item>
  <el-submenu index="4">
    <template slot="title">Заявки / работы</template>
<el-menu-item @click="createNewEvnt" index="4-1">Создать новую</el-menu-item>
</el-submenu>
<el-menu-item index="5" @click="goLists">Списки</el-menu-item>
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
    import Newevnt from 'src/components/Newevnt.vue'
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
        methods: {
            createNewEvnt: function() {
                this.$store.commit('SHOW_NEW_EVNT_DIALOG', true);
            },
            showObj: () => {
                //  console.log(this)
            },
            handleSelect: (val) => {
                //console.log(val);
            },
            goMapMain: function() {
                this.$router.push({
                    path: "/mapmain",
                    params: {
                        hi: "hi @at31 in mapmain page"
                    }
                });
            },

            goListCreate: function() {
                this.$router.push({
                    path: "/lcreate",
                    params: {
                        hi: "hi @at31_ded"
                    }
                });
            },
            goHome: function() {
                this.$router.push({
                    path: "/",
                    params: {
                        hi: "hi @at31_ded"
                    }
                });
            },
            goLists:function()
            {
                this.$router.push({
                    path:"/lists"                
                });
            }
        },


    }

</script>
