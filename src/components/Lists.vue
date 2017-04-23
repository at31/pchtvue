<template>
  <div class="listcreate">
    <h1>{{ msg }}</h1>    
    <evntslist v-bind:createPathBtn="false"></evntslist>
  </div>
</template>

<script>
    import Evntslist from 'src/components/Evntslist.vue'
    //import Mmap from 'src/components/Mmap.vue'

    export default {
        name: 'at1',
        components: {
          //  Mmap,
            Evntslist
        },
        data() {
            return {
                //msg: 'lists'
            }
        },
        props:['msg'],
        mounted() {
            //console.log('ymapstart dispatch');
            //console.log(JSON.stringify(this.$store.state.route));
            //this.$store.dispatch('ymapstart');
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }

</style>