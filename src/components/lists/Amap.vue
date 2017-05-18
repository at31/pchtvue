<template>
   <div>
       <h1></h1>
       <div id="ymap" style="height:800px"></div>
   </div>
</template>
<script>
    
let self = {};
    export default {
        name: 'amap',
        data() {
            return {
                geoCollection: { removeAll:function(){return true;}},
                myBalloonContentBodyLayout: {},
                selectedPO: {},
                showPODetail: false,
                filter: {},
                postalCodeVal: "",
                postalCodeOpt: false,
                evntsVal: "",
                evntsOpt: false,
                fdVisible: false,                
            }

        },
        mounted() { 
            self = this;
            console.log('mounted amap');
            if (this.mapready) {
                    mapRender();
                    setMark();
                }
        },
        methods: {
            showMapFilter:function(){
                
            },
            openPODetail: function(selPO) {                
                
            },
            addToSelectedPOList: function(selPO) {
                this.$store.dispatch('addPOSelectdList', selPO);
            }            
        },
        computed: {
            
            pomassive() {                
                return this.$store.state.selectedPO
            },
            mapready() {            
                return this.$store.state.ymapready
            },
            
            makePath() {
                return this.$store.state.makePath
            },
            destroyPath(){
                return this.$store.state.destroyPath
            },
            setNewCenter(){
                return this.$store.state.mapSetCenter
            }
            
        },
        watch: {
            setNewCenter:function(newcenter){
                this.mymap.setCenter(newcenter, 12);
                //let panarr=this.$store.state.selectedPO.map(po=>{return [po.latitude,po.longitude]});
                //this.mymap.panTo(panarr);
            },
            pomassive:function(n,o)
            {
                setMark();
            },
           
            mapready: function(val) {                
                console.log('map ready -> ' + val);

                if (val) {
                    mapRender();                    
                }
            },
            
            makePath: function() {
                if(this.$store.state.makePath)
                {
                    let self = this;
                this.geoCollection.removeAll();
                if (this._route)
                    this.mymap.geoObjects.remove(this._route);

                var pathArr = this.$store.state.selectedPO.map(function(otd) {
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
                            el.properties.set('iconContent', self.$store.state.selectedPO[i].postalCode + " точка №" + (i + 1));
                            el.properties.set('balloonContent', self.$store.state.selectedPO[i].postalCode + " точка №" + (i + 1));
                        });

                    },
                    function(error) {
                        alert("Возникла ошибка: " + error.message);
                    }
                );
                    this.$store.commit('MAKEPATHCOMPLETE');
                }          
            },
            destroyPath:function(){
                if(this.$store.state.destroyPath){
                    
                    if (this._route)
                    this.mymap.geoObjects.remove(this._route);
                    
                    self.geoCollection.removeAll();                                
                    self.geoCollection = null;
                    self.myBalloonContentBodyLayout = customBCBL();
                    self.geoCollection = new ymaps.GeoObjectCollection();
                    self.$store.state.selectedPO.forEach(function(otd) {
                        var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                        self.geoCollection.add(pmark);                        
                    });
                    self.mymap.geoObjects.add(self.geoCollection);
                    this.$store.commit('DESTROY_PATH_COMPLETE');
                }      
            }
        }
    }
    
    function setMark(){
        if (self._route)
            self.mymap.geoObjects.remove(self._route);
        self.geoCollection.removeAll();                                
        self.geoCollection = null;
        self.myBalloonContentBodyLayout = customBCBL();
        self.geoCollection = new ymaps.GeoObjectCollection();
        self.$store.state.selectedPO.forEach(function(otd) {
            var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
            self.geoCollection.add(pmark);                        
        });
        self.mymap.geoObjects.add(self.geoCollection);     
    }
    
    function mapRender() {        
        self.mymap = new window.ymaps.Map("ymap", {
            center: [50.59, 36.58],
            zoom: 10,
            controls: ['routeEditor']
        });
        self.$store.dispatch('ymaprender');        
    }  

    function customBCBL() {
        var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
            '<p>$[properties.data.postalCode]</p><p>$[properties.data.addressSource]</p><p>$[properties.data.typeCode]</p><p>кол-во заявок $[properties.data.evnts.length]</p><br /><button id="show-po-detail-btn">Подробно</button><br /><button id="add-to-path-btn">В список</button>', {
                build: function() {
                    myBalloonContentBodyLayout.superclass.build.call(this);
                    var _this = this;
                    var el = document.getElementById('show-po-detail-btn');
                    el.addEventListener('click', function() {
                        self.openPODetail(_this._data.properties._data.data);
                    });

                    var el = document.getElementById('add-to-path-btn');
                    el.addEventListener('click', function() {
                        self.addToSelectedPOList(_this._data.properties._data.data);
                    });

                },
                clear: function() {    
                    myBalloonContentBodyLayout.superclass.clear.call(this);
                },            
            });
        return myBalloonContentBodyLayout;
    }

    function pmarkFab(otd, myBalloonContentBodyLayout) {
        var stl = 'islands#darkgreenStretchyIcon';
        if (otd.evnts.length >= '1') {
            stl = 'islands#darkblueStretchyIcon';
        }
        if (otd.evnts.length >= '3') {
            stl = 'islands#violetStretchyIcon';
        }

        var pmark = new ymaps.Placemark([otd.latitude, otd.longitude], {
            data: otd,
            iconContent: otd.postalCode + " / " + otd.evnts.length,
            iconCaption: otd.postalCode
        }, {
            balloonContentLayout: myBalloonContentBodyLayout,
            preset: stl
        });

        return pmark;
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