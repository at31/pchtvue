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
            console.log('amap mounted');
            self = this;
            if (this.mapready) {
                console.log("mapready in mounted");
                mapRender();
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
            }
        },
        watch: {
            pomassive:function(n,o)
            {                 
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
            },
            ymapDataUpdate:function()
            {
                
            },
            filterDialogOpen: function() {
                if (!this.fdVisible) {
                    this.fdVisible = true;
                }
            },
            postalCodeVal: function(n, o) {
                console.log('n ->' + n + ' o->' + o);
                var foobody = `if (obj.postalCode.search(${n})>-1){
                                    return true;
                                }else{
                                    return false;
                                }`;
                this.filter.postalCode = new Function('obj', foobody);
            },
            postalCodeOpt: function(n, o) {
                console.log('watcher evnts ' + n);
            },
            evntsVal: function(n, o) {
                console.log('watcher evnts ' + n);
            },
            evntsOpt: function(n, o) {
                console.log('watcher evnts ' + n);
            },
            mapready: function(val) {
                self = this;
                console.log('map ready -> ' + val);

                if (val) {
                    mapRender();
                    /*this.geoCollection = new ymaps.GeoObjectCollection();
                    this.myBalloonContentBodyLayout = customBCBL();

                    this.mymap = new window.ymaps.Map("mapy", {
                        center: [50.59, 36.58],
                        zoom: 10,
                        controls: ['routeEditor']
                    });

                    this.$store.state.postOffice.forEach(function(otd) {
                        var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                        self.geoCollection.add(pmark);
                    });
                    this.mymap.geoObjects.add(self.geoCollection);*/
                }
            },
            mapfilter: function(val) {
                //console.log(val);
                var self = this;
                this.geoCollection.removeAll();
                this.geoCollection = null;
                this.geoCollection = new ymaps.GeoObjectCollection();
                this.$store.state.postOffice.forEach(function(otd) {

                    var _f = self.$store.state.ymapFilter;

                    for (var k in _f) {
                        let res = _f[k](otd);
                        //console.log(`${otd.postalCode} - ${res}`);
                        if (res) {
                            var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                            self.geoCollection.add(pmark);
                        }

                    }
                    /*let res = owalk(otd, self.$store.state.ymapFilter);
                    if (res) {
                        console.log(JSON.stringify(otd));
                        var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                        self.geoCollection.add(pmark);
                    }*/
                });
                this.mymap.geoObjects.add(this.geoCollection);
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
        },
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