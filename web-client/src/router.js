import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteListWithEditor from './pages/NoteListWithEditor'
import EditNote from './pages/EditNote'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Index from './pages/Index'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/notes', component: NoteListWithEditor },
  { path: '/notes/:id', component: EditNote, props: true },
  { path: '/signup', component: SignUp },
  { path: '/login', component: LogIn }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
