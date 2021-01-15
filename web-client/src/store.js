import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: [
    {_id: '9797909807980789709', caption: 'First Note', text: 'This is my first note', updatedAt: new Date()},
    {_id: '6567698990898876777', caption: 'Second Note', text: 'This is my second note', updatedAt: new Date()},
    {_id: '0809789675765645646', caption: 'Third Note', text: 'This is my third note', updatedAt: new Date()}
  ]
}

const getters = {
  allNotes(state){
    return state.notes
  }
}

const mutations = {}

const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
