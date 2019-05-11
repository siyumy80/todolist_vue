import Vue from 'vue'
import VueRouter from 'vue-router'
import Home   from '@/components/Home'
import SignUp from '@/components/SignUp'
import TodoForm from '@/components/TodoForm'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
     {name:'home',   path: '/', component: Home },
     {name:'signUp', path: '/signUp', component: SignUp },
     {name:'todoWrite', path:'/todo', component : TodoForm},
     {name:'todoEdit', path:'/todo/:id', component : TodoForm , props: true}
    ]
})
const requireAuth = (to, from, next) => {
    if (Auth.loggedIn()) return next()
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
}
export default router


