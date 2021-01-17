import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteList from './pages/NoteList'
import NewNote from './pages/NewNote'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/notes' },
  { path: '/notes', component: NoteList },
  { path: '/new-note', component: NewNote }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
