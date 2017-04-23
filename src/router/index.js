import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'src/components/Hello'
import ListCreate from 'src/components/ListCreate'
import Lists from "src/components/Lists"

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
      path: '/lcreate',
      name: 'ListCreate',
      component: ListCreate,
      props: { name: 'world' } 
          
    },
    {
        path:"/lists",
        name:"Lists",
        component:Lists,
        props:{msg:"AT31"}
    }
  ]
})
