import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteListWithEditor from './pages/NoteListWithEditor'
import NewNote from './pages/NewNote'
import EditNote from './pages/EditNote'
import SignUp from './pages/SignUp'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/notes' },
  { path: '/notes', component: NoteListWithEditor },
  { path: '/notes/new', component: NewNote },
  { path: '/notes/:id', component: EditNote, props: true },
  { path: '/signup', component: SignUp }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
