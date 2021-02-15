import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import NoteListWithEditor from './pages/NoteListWithEditor'
import EditNote from './pages/EditNote'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Index from './pages/Index'

Vue.use(VueRouter)

const routes = [
  {name: 'index', path: '/', component: Index},
  {name: 'note-list', path: '/notes', component: NoteListWithEditor},
  {name: 'edit-note', path: '/notes/:id', component: EditNote, props: true},
  {name: 'signup', path: '/signup', component: SignUp},
  {name: 'login', path: '/login', component: LogIn}
]

const publicPageNames = ['index', 'signup', 'login']

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (publicPageNames.includes(to.name)) {
    next()
  } else {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  }
  })

export default router
