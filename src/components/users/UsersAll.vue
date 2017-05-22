<template>
  <el-row :gutter="10">
    <h1>{{ msg }}</h1>
     <el-col :span="24">
        <div class="m-panel">
         <el-button-group>
            <el-button @click="onUserNew">
                 <icon name="plus"></icon>
                 <span>Новый пользователь</span>
             </el-button>
             <el-button @click="onUserEdit">
                 <icon name="edit"></icon>
                 <span>Редактировать пользователя</span>
             </el-button>
             <el-button @click="onUserDelete">
                 <icon name="trash"></icon>
                 <span>Удалить пользователя</span>
             </el-button>             
         </el-button-group>
    </div>
     </el-col>     
     
      <el-col :span="12" >
         <div class="m-panel">
          <userstbl v-bind:users="usersData"></userstbl>
    </div>
      </el-col>
      
      
      <newuser></newuser>
      <userdialog v-bind:user="currUser"></userdialog>
    </el-row>
</template>

<script>
    import Userstbl from 'src/components/users/Userstbl.vue'
    import Newuser from 'src/components/users/Newuser.vue'
    import Userdialog from 'src/components/users/Usersdialog.vue'

    export default {
        name: 'allusers',
        components: {
            Userstbl,
            Newuser,
            Userdialog
        },
        data() {
            return {

            }
        },
        props: ['msg'],
        mounted() {},
        watch: {            
        },
        computed: {            
            usersData: function() {
                return this.$store.state.users;
            },
            currUser:function(){
                console.log('zzzzz',this.$store.state.currUser);
                return this.$store.state.currUser;
            }
        },
        methods: {
            onUserEdit(){
                this.$store.commit('SHOW_USER_DIALOG',true);
            },
            onUserDelete(){
                this.$store.commit('SHOW_USER_DIALOG',true);
            },
            onUserNew(){
                this.$store.commit('SHOW_NEW_USER_DIALOG',true);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }

    .m-panel {
        padding-left: 15px;
        padding-right: 15px;
    }
</style>