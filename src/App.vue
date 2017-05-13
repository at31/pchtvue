<template>
  <div id="app">
   <el-row class="tac">
   <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-menu-item index="1" @click="goHome">Главная</el-menu-item>
   <el-menu-item index="2" @click="goMapMain">Карта - главная</el-menu-item>
  <el-menu-item index="3" @click="goListCreate">Создание списка (карта)</el-menu-item>
  <el-submenu index="4">
    <template slot="title">Карта</template>
<el-menu-item @click="filterShow" index="4-1">Фильтр</el-menu-item>
</el-submenu>
<el-menu-item index="5" @click="goLists">Списки</el-menu-item>
</el-menu>
<div class="line"></div>
<router-view></router-view>
</el-row>
</div>
</template>

<script>
    export default {
        name: 'app',
        /*components: {
          Toolbar,
          Evntslist, 
          Mmap
        },*/
        methods: {
            filterShow: function() {
                this.$store.commit('YMAP_SHOW_FILTER_DIALOG');
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
