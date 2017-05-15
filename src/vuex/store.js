import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//import {f,getAllPO} from '../components/GetData.js'

Vue.use(Vuex)

const state = {
    postOffice:[],
    ymapready:false,
    ymaprender:false,
    ymaps:{},
    ymapCollection:{},
    ymapShowFiltereDialog:false,
    ymapFilter:{},
    selectedPO:[],
    selectedPostCodeSet:new Set(),
    makePath:false,
    destroyPath:false,
    opFilterDialogVisible:false,
    opDetailVisible:false,
    detailPO:"",
    showOPDetail:false,
    detailEvnt:"",
    showCreateNew:false,
    mapSetCenter:"",
    //lists
    listsAll:[],
    listsSelectedPO:[],
    listsEvtsList:[]
}

const actions = {
    //lists
    getListsAll(context,filter){
        
    },
    //
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
                //console.log(data);
                context.commit('ADD_TEST',data)

            });
        })

    },
    filterMap(context,filter){
        //console.log(filter.postalCode.val);
        context.commit('YMAP_FILTER',filter);
    },
    removeFilterMap(context){
        context.commit('YMAP_REMOVE_FILTER');
    },
    ymapstart(context){        
         window.ymaps.ready(function () {
             /*axios.get(`http://127.0.0.1:3000/evnt`)
                 .then(response => {console.log(response.data)})
                 .catch(e => {console.log(e)});
              axios.post(`http://127.0.0.1:3000/evnt/save`,{
                  zzz:"xxx"}
              )
                 .then(response => {console.log(response.data)})
                 .catch(e => {console.log(e)});*/
             
            context.commit('YMAPREADY', true);            
        })
    },
    ymaprender(context)
    {
        context.commit('YMAPRENDER', true);
        /*var ff=getAllPO();        
        ff.then(function (data) {
                context.commit('PO_LOADED',data);                
            });*/
            /*fetch('http://127.0.0.1:3000/po/all').then(function (response) {
                //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                //alert(response.status) // 200
                return response.json()
            }).then(function (data) {
                context.commit('PO_LOADED',data);                
            });*/
        axios.get('http://127.0.0.1:3000/po/all').then(response=>{
            if(response.status==200){
                context.commit('PO_LOADED',response.data);
            }
        }).catch(err=>{
            console.log(err);
        });
        
    },
    saveNewEvnt(context,nevnt){        
        let evntarr=[];
        context.state.selectedPO.forEach(po=>{
            let poevnt=Object.assign({}, nevnt);
            poevnt.postalCode=po.postalCode;
            console.log(poevnt);
            //poevnt.start=nevnt.start;
            //poevnt.end=nevnt.end;
            evntarr.push(poevnt);
        });
        if(evntarr.length>0){
            console.log('send axios post');
            axios.post(`http://127.0.0.1:3000/evnt/save/multi`,evntarr)
                 .then(response => {            
                    context.dispatch('ymaprender');                   
                })
                 .catch(e => {console.log(e)});     
        }           
    },
    
    addPOSelectdList(context,po){
        
        /*var listel=po;
            listel.id=po._id;
            listel.label=po.postalCode;
            listel.children=po.evnts.map(function(o){
                        o.id=o._id;
                        o.label=o.title;
                        return o;
                    });                   
        context.commit('SELECTED_PO_ADD',listel);*/
        let listel={
            id:po._id,
            label:po.postalCode,
            postalCode:po.postalCode,
            latitude:po.latitude,
            longitude:po.longitude,
            evnts:po.evnts.map(function(o){
                let chld={
                    id:o._id,
                    label:o.title,
                    title:o.title,
                    start:o.start,
                    end:o.end,
                    postalCode:o.postalCode,
                    status:o.status,
                    description:o.description,
                    executor:o.executor
                }
                return chld;
            })
        };
        //console.log(listel);
        context.commit('SELECTED_PO_ADD',listel);
    },
    removePOSelectedList(context,listel){
        context.commit('SELECTED_PO_REMOVE',listel);
    },
    makePath(context){
        context.commit('MAKEPATH');
    },
    destroyPath(context){
        context.commit('DESTROY_PATH');
    }

}

const mutations = {
        SHOW_NEW_EVNT_DIALOG(state,st){
            state.showCreateNew=st;
        },
        SHOW_EVNT_DETAIL(state,evnt){        
            state.detailEvnt=false;
            state.detailEvnt=evnt;
        },
        SHOW_OP_DETAIL(state,dpo){
            state.detailPO=false;
            state.postOffice.forEach(po=>{
                if(dpo.postalCode==po.postalCode){
                    state.detailPO=po;                    
                }
            });
        },
        HIDE_OP_DETAIL(state){
            
        },
        OP_FILTER_DIALOG_VISIBLE(state){
            state.opFilterDialogVisible=state.opFilterDialogVisible?fale:true;
        },
        MAKEPATH(state){
            state.destroyPath=false;
            state.makePath=true;
        },
        MAKEPATHCOMPLETE(state){            
            state.makePath=false;
        },
        DESTROY_PATH(state){
            state.makePath=false;
            state.destroyPath=true;
        },
        DESTROY_PATH_COMPLETE(state){
            state.destroyPath=false;
        },
        SELECTEDPO_DELETE_ONE(state,po){
            var indx=state.selectedPO.indexOf(po);
            state.selectedPO.splice(indx,1);
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
                indx=po.evnts.indexOf(listel);               
                if(indx>-1){
                    state.selectedPO[poi].evnts.splice(indx,1);
                }
            }            
        },
        YMAPREADY(state,status){
            state.ymapready=status;
        },
        YMAPRENDER(state,status){
            state.ymaprerender=status;
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
            
            let tsarr=[];
            state.selectedPO.forEach(function(o){
                if(o.fixed){
                    tsarr.push(o);
                }
            });
            if(tsarr.length>0){
                state.selectedPO=[].concat(tsarr);
            }else{
                state.selectedPO=[];   
            }
            
            state.postOffice.forEach(function(otd) {
                    var _f = filter;
                    for (var k in _f) {
                        let res = _f[k](otd);
                        if (res) 
                        {   
                            if(!state.selectedPostCodeSet.has(otd.postalCode))
                            {
                                //console.log(state.selectedPO);
                                state.selectedPO.push(prepData4ListView(otd));   
                            }                            
                        }

                    }
                });
        },
        YMAP_REMOVE_FILTER(state){
            state.ymapFilter={};
            var arr=state.postOffice.map(function(otd){
                    return prepData4ListView(otd);
            });
            state.selectedPO=arr;
        },

        PO_LOADED(state,massive) {
            state.postOffice=massive;
            /*if(Object.getOwnPropertyNames(state.ymapFilter).length>1)
            {
                state.postOffice.forEach(function(otd) {
                    var _f = self.filter;
                    for (var k in _f) {
                        let res = _f[k](otd);
                        if (res) 
                        {   
                            if(!state.selectedPostCodeSet.has(otd.postalCode))
                            {
                                state.selectedPO.add(prepData4ListView(otd));   
                            }                            
                        }

                    }
                });
            }*/
            var arr=[];
            if(state.selectedPO.length>0){
               state.selectedPO.forEach(spo=>{
                   state.postOffice.forEach(el=>{
                       if(el.postalCode==spo.postalCode)
                       {
                           arr.push(prepData4ListView(el));
                       }
                   });
               });
            }else
            {   
                var arr=massive.map(function(otd){
                    return prepData4ListView(otd);
                });                
            }
            
            state.selectedPO=arr;
        },
        TOGGLEFIX_OP(state,op){
            op.fixed=op.fixed?false:true;
            if(op.fixed){
                state.mapSetCenter=[op.latitude,op.longitude];
            }
        },
        FIX_SELECTED_VALUES_OP(state,selected){
            selected.forEach(function(o){
                o.fixed=true;
            });
        },
        UNFIX_SELECTED_VALUES_OP(state){
            state.selectedPO.forEach(function(o){
                o.fixed=false;
            });
        },
        REMOVE_UNSELECTED(state){
            console.log('remove unselected');
            let tsarr=[];
            state.selectedPO.forEach(function(o){
                if(o.fixed){
                    tsarr.push(o);
                }
            });
            if(tsarr.length>0){
                state.selectedPO=[].concat(tsarr);
            }
        }
}

function prepData4ListView(po) {

    let listel = {
        id: po._id,
        label: po.postalCode,
        postalCode: po.postalCode,
        latitude: po.latitude,
        longitude: po.longitude,
        evnts: po.evnts.map(function (o) {
            let chld = {
                id: o._id,
                label: o.title,
                title: o.title,
                start: o.start,
                end: o.end,
                postalCode: o.postalCode,
                status: o.status,
                description: o.description,
                executor: o.executor
            }
            return chld;
        }),
        evntsLength:po.evnts.length,
        fixed:false
    };
    
    return listel;
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})