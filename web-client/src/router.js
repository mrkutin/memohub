import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteList from './pages/NoteList'
import NewNote from './pages/NewNote'
import EditNote from './pages/EditNote'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/notes' },
  { path: '/notes', component: NoteList },
  { path: '/notes/new', component: NewNote },
  { path: '/notes/:id', component: EditNote }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
