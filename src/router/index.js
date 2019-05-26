import Vue from 'vue'
import VueRouter from 'vue-router'
import Home   from '@/components/Home'
import SignUp from '@/components/SignUp'
import TodoForm from '@/components/TodoForm'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
     {name:'notFound',path: '/notFound', component: Home },
     {name:'home',   path: '/', component: Home },
     {name:'signUp', path: '/signUp', component: SignUp },
     {name:'todoWrite', path:'/todo', component : TodoForm},
     {name:'todoEdit', path:'/todo/:id', component : TodoForm , props: true}
    ]
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/notFound');
  } else {
    next();
  }
})
/*const requireAuth = (to, from, next) => {
    if (Auth.loggedIn()) return next()
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
}*/
export default router


