import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteListWithEditor from './components/NoteListWithEditor'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: NoteListWithEditor },
  // { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes
})

export default router
