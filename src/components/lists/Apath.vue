<template>
   <div>
       <h1></h1>
       <div id="ymap" style="height:800px"></div>
   </div>
</template>
<script>
    
    let self = {};
    
    export default {
        name: 'apath',
        data() {
            return {
                geoCollection: { removeAll:function(){return true;}},
                         
            }

        },
        props:["path"],
        mounted() {
            console.log('apath mounted');
            self = this;
            if (this.mapready) {
                console.log("mapready in mounted");
                mapRender();
            }

        },
        methods: {
            makePath: function() {                
                                
                console.log(this.path);
                let self = this;
                this.geoCollection.removeAll();
                if (this._route)
                    this.mymap.geoObjects.remove(this._route);

                var pathArr = this.path.map(function(otd) {
                    return {
                        type: 'wayPoint',
                        point: [otd.latitude, otd.longitude]
                    };
                });
                window.ymaps.route(pathArr).then(
                    function(route) {
                        self.mymap.geoObjects.add(route);
                        self._route = route;
                        self.mymap.geoObjects.add(route);
                        var points = route.getWayPoints();
                        points.options.set('preset', 'islands#blueStretchyIcon');
                        points.each(function(el, i) {
                            el.properties.set('iconContent', self.path[i].postalCode + " точка №" + (i + 1));
                            el.properties.set('balloonContent', self.path[i].postalCode + " точка №" + (i + 1));
                        });

                    },
                    function(error) {
                        alert("Возникла ошибка: " + error.message);
                    }
                );
                    this.$store.commit('MAKEPATHCOMPLETE');                          
            },
            destroyPath:function(){
                if(this.$store.state.destroyPath){
                    
                    if (this._route)
                    this.mymap.geoObjects.remove(this._route);
                    
                    self.geoCollection.removeAll();                                
                    self.geoCollection = null;
                    
                }      
            }       
        },
        computed: {                        
            mapready() {            
                return this.$store.state.ymapready
            },                                    
        },
        watch: {
            path:function(){
                this.makePath();
            }
        },
    }
   
    function mapRender() {        
        self.mymap = new window.ymaps.Map("ymap", {
            center: [50.59, 36.58],
            zoom: 10,
            controls: ['routeEditor']
        });
        self.makePath();
        //self.$store.dispatch('ymaprender');
        
    }  
    

</script>

<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }

</style>