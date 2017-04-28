import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    postOffice:[],
    ymapready:false,
    ymaps:{},
    ymapCollection:{},
    ymapShowFiltereDialog:false,
    ymapFilter:{},
    selectedPO:[],
    makePath:false,
    opFilterDialogVisible:false
}

const actions = {
    testAction(context) {
        // console.log(context)
        window.ymaps.ready(function () {

                    
            /* var xhttp = new XMLHttpRequest();
             xhttp.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {
                 document.getElementById("demo").innerHTML =
                 this.responseText;
               }
             };
             xhttp.open("GET", "http://localhost:3000/po/all", true);
             xhttp.send();*/

            fetch('http://localhost:3000/po/all').then(function (response) {
                //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                //alert(response.status) // 200
                return response.json()
            }).then(function (data) {
                console.log(data);
                context.commit('ADD_TEST',data)

            });
        })

    },
    filterMap(context,filter){
        console.log(filter.postalCode.val);
        context.commit('YMAP_FILTER',filter);
    },
    ymapstart(context){
         window.ymaps.ready(function () {

            fetch('http://localhost:3000/po/all').then(function (response) {
                //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                //alert(response.status) // 200
                return response.json()
            }).then(function (data) {
                console.log(data);
                context.commit('PO_LOADED',data);
                context.commit('YMAPREADY', true);

            });
        })
    },
    addPOSelectdList(context,po){
        
        var listel=po;
            listel.id=po._id;
            listel.label=po.postalCode;
            listel.children=po.evnts.map(function(o){
                        o.id=o._id;
                        o.label=o.title;
                        return o;
                    });                   
        context.commit('SELECTED_PO_ADD',listel);
    },
    removePOSelectedList(context,listel){
        context.commit('SELECTED_PO_REMOVE',listel);
    },
    makePath(context){
        context.commit('MAKEPATH');
    }

}

const mutations = {
        OP_FILTER_DIALOG_VISIBLE(state){
            state.opFilterDialogVisible=state.opFilterDialogVisible?fale:true;
        },
        MAKEPATH(state){
            state.makePath=state.makePath?fale:true;
        },
        SELECTED_PO_ADD(state,listel){
            state.selectedPO.push(listel);
        },
        SELECTED_PO_REMOVE(state, listel){
            var indx=state.selectedPO.indexOf(listel);
            if(indx>-1){
                state.selectedPO.splice(indx,1);   
            }else if(indx=-1){
                //Array.find вот очень нужно) но слабо поддерживается пока
                var po={};
                var poi=-1;
                state.selectedPO.forEach(function(_po,i){
                    if(_po.postalCode==listel.postalCode){
                        po=_po;
                        poi=i;
                    }
                });
                indx=po.children.indexOf(listel);               
                if(indx>-1){
                    state.selectedPO[poi].children.splice(indx,1);
                }
            }            
        },
        YMAPREADY(state,status){
            state.ymapready=status;
        },
        YMAP(state,mapobj){
            state.ymaps=mapobj;            
        },
    
        YMAP_COLLECTION(state, collection) {            
            state.ymapCollection = collection
            //console.log(state.ymapCollection);
        },
        YMAP_COLLECTION_ADD(state, po) {            
            state.ymapCollection.add(po);
            //console.log(state.ymapCollection);
        },
        YMAP_SHOW_FILTER_DIALOG(state,val){                        
            state.ymapShowFiltereDialog=state.ymapShowFiltereDialog?false:true;
            
        },
        YMAP_FILTER(state, filter) {            
            state.ymapFilter = null;
            state.ymapFilter = filter;
            //console.log(state.ymapCollection);
        },

        PO_LOADED(state,massive) {            
            state.postOffice=massive;
            //console.log(state);
        },
        
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})