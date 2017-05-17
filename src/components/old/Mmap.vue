<template>
      <el-col :span="16">
      <!-- открфтие фильтра для фильтрации отделение, в фильтре сделать кнопку "выбрать все" "выбрать - добавление отлелений в список" -->
       <el-button @click="showMapFilter" >Выбрать отделение по условию</el-button>           
        <div id="mapy" style="height: 800px"></div>
        
<el-dialog title="Фильтр" v-model="fdVisible" size="tiny">
    <span>This is a message dialog visible {{fdVisible}}</span>
    <el-input v-model="postalCodeVal" placeholder="INDX"></el-input>
    <el-switch on-text="" off-text v-model="postalCodeOpt"></el-switch>
    <el-input v-model="evntsVal" placeholder="События Заголовок"></el-input>
    <el-switch on-text="" off-text v-model="evntsOpt"></el-switch>

    <span slot="footer" class="dialog-footer">
    <el-button @click="fdVisible = false">Отмена</el-button>
    <el-button type="primary" @click="doFilter">Применить</el-button>
  </span>
</el-dialog>
        
        <el-dialog title="Подробная информация" v-model="showPODetail" size="tiny">
            <span>Отделение -  {{selectedPO.postalCode}}</span>
            
            <el-input v-model="selectedPO.postalCode" placeholder=""></el-input>
            <el-input v-model="selectedPO.region" placeholder=""></el-input>
            <el-input v-model="selectedPO.settlement" placeholder=""></el-input>
            <el-input v-model="selectedPO.typeCode" placeholder=""></el-input>
            <el-input v-model="selectedPO.addressSource" placeholder=""></el-input>            
            <div v-for="phone in selectedPO.phones">
                <el-input v-model="phone.phoneNumber" placeholder=""></el-input>
                <el-input v-model="phone.phoneTypeName" placeholder=""></el-input>
            </div>            
            <span slot="footer" class="dialog-footer">
            <el-button @click="showPODetail = false">Закрыть</el-button>            
          </span>
        </el-dialog>
        
<el-dialog title="Tips" v-model="dialogMapFilterVisible" size="tiny">
    <span></span>
    <el-input v-model="postalCodeVal" placeholder="INDX"></el-input>
    <el-switch on-text="" off-text v-model="postalCodeOpt"></el-switch>
    <el-input v-model="evntsVal" placeholder="События Заголовок"></el-input>
    <el-switch on-text="" off-text v-model="evntsOpt"></el-switch>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogMapFilterVisible = false">Отмена</el-button>
    <el-button type="primary" @click="doFilter">Применить</el-button>
  </span>
</el-dialog>
    </el-col>   
</template>

<script>
    let self = {};

    export default {
        name: 'mmap',
        data() {
            return {
                mymap: {},
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
                //
                dialogMapFilterVisible:false,
                _route: []
            }

        },
        mounted() {
            console.log('mmap mounted');
            self = this;
            if (this.mapready) {
                console.log("mapready in mounted");
                mapRender();
            }

        },
        methods: {
            showMapFilter:function(){
                this.dialogMapFilterVisible=true;
            },
            openPODetail: function(selPO) {
                //console.log(selPO);
                //this.$store.dispatch('testAction')
                this.selectedPO = selPO;
                this.showPODetail = true;
            },
            addToSelectedPOList: function(selPO) {
                this.$store.dispatch('addPOSelectdList', selPO);
            },
            doFilter: function(val) {
                //this.$store.dispatch('filterMap', this.filter);
                //console.log(val);
                //var self = this;
                this.geoCollection.removeAll();
                this.geoCollection = null;
                this.geoCollection = new ymaps.GeoObjectCollection();
                this.$store.state.postOffice.forEach(function(otd) {

                    var _f = self.filter;

                    for (var k in _f) {
                        //console.log(`${otd.region} ---- ${_f[k]}`);
                        let res = _f[k](otd);
                        //console.log(`${otd.postalCode} - ${res} ----- ${_f[k]}`);
                        if (res) {
                             var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                            self.geoCollection.add(pmark);
                        }

                    }
                });
                this.mymap.geoObjects.add(this.geoCollection);
                this.fdVisible = false;
            }
        },
        computed: {
            filterDialogOpen() {
                return this.$store.state.ymapShowFiltereDialog;
            },
            pomassive() {                
                return this.$store.state.postOffice
            },
            mapready() {
                //this.val=true;
                return this.$store.state.ymapready
            },
            /*mapfilter() {
                return this.$store.state.ymapFilter
            },*/
            makePath() {
                return this.$store.state.makePath
            },
            ymapDataUpdate()
            {
                //return this.$store.state.ymapDataUpdate
            }
        },
        watch: {
            pomassive:function(n,o)
            {                 
                    self.geoCollection.removeAll();                                
                    self.geoCollection = null;
                    self.myBalloonContentBodyLayout = customBCBL();
                    self.geoCollection = new ymaps.GeoObjectCollection();
                    self.$store.state.postOffice.forEach(function(otd) {
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
                var foobody = `if (obj.postalCode.search('${n}')>-1){
                                    return true;
                                }else{
                                    return false;
                                }`;
                this.filter.evntsval = new Function('obj', foobody);
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
                console.log('map filter');
                var self = this;
                this.geoCollection.removeAll();
                this.geoCollection = null;
                this.geoCollection = new ymaps.GeoObjectCollection();
                this.$store.state.postOffice.forEach(function(otd) {

                    var _f = self.$store.state.ymapFilter;

                    for (var k in _f) {
                        let res = _f[k](otd);                        
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
            }
        },
    }
   
    function mapRender() {        
        //self.geoCollection = new ymaps.GeoObjectCollection();
        //self.myBalloonContentBodyLayout = customBCBL();
        self.mymap = new window.ymaps.Map("mapy", {
            center: [50.59, 36.58],
            zoom: 10,
            controls: ['routeEditor']
        });
        self.$store.dispatch('ymaprender');
        /*self.$store.state.postOffice.forEach(function(otd) {
            var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
            self.geoCollection.add(pmark);
        });
        self.mymap.geoObjects.add(self.geoCollection);*/
    }
    /* function owalk(otd, filter) {
         for (var k in otd) {
             if (typeof otd[k] === 'object' && filter[k]) {
                 console.log(k);
                 if (Array.isArray(otd[k])) {
                     console.log('array ' + k);
                     var arr = otd[k];
                     var farr = filter[k];
                     for (var i = 0; i < arr.length; i++) {
                         for (var kk in farr) {
                             if (farr[kk].options) {
                                 if (farr[kk].val.toString() === arr[i][kk].toString())
                                     return true;
                             } else {
                                 if (arr[i][kk].toString().search(farr[kk].val.toString()) != -1)
                                     return true;
                             }
                         }
                     }
                 } else {
                     owalk(otd[k], filter[k]);
                 }
             } else if (filter[k]) {
                 let opValStr = otd[k].toString();
                 let filterValStr = filter[k].val.toString();
                 if (filter[k].options) {
                     if (opValStr === filterValStr) {
                         return true;
                     }
                 } else {
                     if (opValStr.search(filterValStr) != -1) {
                         return true;
                     }
                 }

             }
         }
     }*/

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
                    /* $('#show-po-detail-btn').off('click', this.onShowPODetailClick);*/
                    myBalloonContentBodyLayout.superclass.clear.call(this);
                },
                /*onShowPODetailClick: function (e) {
                    poDetail.init(e.data.po.data, myMap);
                },
                onAddToPathClick: function (e) {
                    pathList.addElement(e.data.po.data);
                }*/
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
