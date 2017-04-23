<template>
 
  <el-col :span="3">
<el-menu default-active="1" class="el-menu-vertical-demo">
<el-menu-item index="1" @click="dialogVisible = true"><i class="el-icon-menu"></i>Фильтр</el-menu-item>
<el-menu-item index="2"><i class="el-icon-setting"></i>Пункт2</el-menu-item>
</el-menu>


<el-dialog title="Tips" v-model="dialogVisible" size="tiny">
    <span>This is a message dialog visible {{dialogVisible}}</span>
    <el-input v-model="postalCodeVal" placeholder="INDX"></el-input>
    <el-switch on-text="" off-text v-model="postalCodeOpt"></el-switch>
    <el-input v-model="evntsVal" placeholder="События Заголовок"></el-input>
    <el-switch on-text="" off-text v-model="evntsOpt"></el-switch>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="doFilter">Confirm</el-button>
  </span>
</el-dialog>

</el-col>
</template>

<script>
    //import {BalloonContentBodyLayout as bcbl} from './ymapstaff'
    // import { addNote, deleteNote, toggleFavorite } from '../vuex/actions'

    export default {
        name: 'toolbar',
        data() {
            return {
                filter:{},
                postalCodeVal:"",
                postalCodeOpt:false,
                evntsVal:"",
                evntsOpt:false
            };
        },
        methods: {
            doFilter: function() {
                this.dialogVisible = false;
                this.$store.dispatch('filterMap', this.filter);
            }
        },
        computed: {
            dialogVisible() {
                return this.$store.ymapShowFiltereDialog;
            }
        },
        watch: {
            postalCodeVal: function(n, o) {
                var foobody=`if (obj.postalCode.search(${n})>-1){
                                    return true;
                                }else{
                                    return false;
                                }`;
                this.filter.postalCode=new Function('obj',foobody);
            },
            postalCodeOpt: function(n, o) {
                console.log('watcher evnts '+n);
            },
            evntsVal: function(n, o) {
                console.log('watcher evnts '+n);
            },
            evntsOpt: function(n, o) {
                console.log('watcher evnts '+n);
            }
        },
        mounted() {
            console.log('mounted toolbar');
            //console.log(bcbl);
        }
    }

</script>
