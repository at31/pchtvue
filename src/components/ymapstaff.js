export default {
    name: 'mmap',
    data() {
        return {
            mymap: {},
            geoCollection: {},
            myBalloonContentBodyLayout: {}
        }

    },
    computed: {
        pomassive() {
                return this.$store.state.postOffice
            },
            mapready() {
                //this.val=true;
                return this.$store.state.ymapready
            },
            mapfilter() {
                return this.$store.state.ymapFilter
            }
    },
    watch: {
        mapready: function (val) {
            var self = this;

            console.log('map ready -> ' + val);

            if (val) {
                //mapCreate(this.$store);
                this.geoCollection = new ymaps.GeoObjectCollection();
                this.myBalloonContentBodyLayout = customBCBL();

                this.mymap = new window.ymaps.Map("mapy", {
                    center: [50.59, 36.58],
                    zoom: 10,
                    controls: ['routeEditor']
                });

                this.$store.state.postOffice.forEach(function (otd) {
                    var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                    self.geoCollection.add(pmark);
                });

                this.mymap.geoObjects.add(self.geoCollection);

            }
        },
        mapfilter: function (val) {
            var self = this;
            console.log('map filter change -> ' + val);
            //doMapFilter(this.$store, val);
            this.geoCollection.removeAll();
            this.geoCollection = null;
            this.geoCollection = new ymaps.GeoObjectCollection();
            this.$store.state.postOffice.forEach(function (otd) {
                let res = owalk(otd, self.$store.state.ymapFilter);
                console.log(res);
                if (res) {
                    var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
                    //store.commit('YMAP_COLLECTION_ADD',pmark);
                    self.geoCollection.add(pmark);

                }
            });

            this.mymap.geoObjects.add(store.state.ymapCollection);

        }
    },
}

function owalk(otd, filter) {
    for (var k in otd) {
        if (typeof otd[k] === 'object' && filter[k]) {
            owalk(otd[k], filter[k]);
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
}

function doMapFilter(store, filter) {

    var myBalloonContentBodyLayout = customBCBL();
    let myMap = store.state.ymapCollection.getMap();
    store.state.ymapCollection.removeAll();
    store.state.postOffice.forEach(function (otd) {
        let res = owalk(otd, store.state.ymapFilter);
        console.log(res);
        if (res) {
            var pmark = pmarkFab(otd, myBalloonContentBodyLayout);
            //store.commit('YMAP_COLLECTION_ADD',pmark);
            store.state.ymapCollection.add(pmark);

        }
    });

    myMap.geoObjects.add(store.state.ymapCollection);
}

function customBCBL() {

    var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
        '<p>$[properties.data.postalCode]</p><p>$[properties.data.addressSource]</p><p>$[properties.data.typeCode]</p><p>кол-во заявок $[properties.data.evnts.length]</p><br /><button id="show-po-detail-btn">Подробно</button><br /><button id="add-to-path-btn">В список</button>', {
            build: function () {
                myBalloonContentBodyLayout.superclass.build.call(this);
                /* $('#show-po-detail-btn').on('click', {
                     "po": this._data.properties._data
                 }, this.onShowPODetailClick);
                 $('#add-to-path-btn').on('click', {
                     "po": this._data.properties._data
                 }, this.onAddToPathClick);*/
            },
            clear: function () {
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


function mapCreate(store) {

    var myCollection = new ymaps.GeoObjectCollection();

    var myBalloonContentBodyLayout = customBCBL();

    var mymap = new window.ymaps.Map("mapy", {
        center: [50.59, 36.58],
        zoom: 10,
        controls: ['routeEditor']
    });

    store.state.postOffice.forEach(function (otd) {

        var pmark = pmarkFab(otd, myBalloonContentBodyLayout);
        myCollection.add(pmark);
    });

    //mymap.geoObjects.add(myCollection);
    //store.commit('YMAP_COLLECTION', myCollection);

}