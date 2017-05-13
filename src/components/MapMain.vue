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
       </el-row>       
</template>

<script>
    import Amap from 'src/components/Amap.vue'
    import Mapfilter from 'src/components/Mapfilter.vue'
    import Polist from 'src/components/Polist.vue'
    import Potable from 'src/components/Potable.vue'
    
    export default {
        name:"MapMain",
        data () {
            return {
                msg:""
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