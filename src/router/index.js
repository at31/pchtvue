import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'src/components/Hello'
import Newevnt from 'src/components/evnts/Newevnt'
import AllLists from 'src/components/lists/AllLists'
import Listsnewform from 'src/components/lists/Listsnewform'
import Listsnewmap from 'src/components/lists/Listsnewmap'
import UsersAll from 'src/components/users/UsersAll'
//import Listnewform from "./src/components/lists/Listnewform"
//import AllLists from "./src/components/lists/AllLists"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      props: true    
    },
    {
      path: '/list-new',
      name: 'Listsnewmap',
      component: Listsnewmap,
      props: { name: 'world' } 
          
    },
    {
        path:"/list-new-form",
        name:"Listsnewform",
        component:Listsnewform,
        props:{msg:"AT31"}
    },
    {
        path:"/lists-all",
        name:"AllLists",
        component:AllLists,
        props:{msg:"AT31"}
    },
    {
        path:"/users",
        name:"UsersAll",
        component:UsersAll,
        props:{msg:"AT31"}
    } 
  ]
})
