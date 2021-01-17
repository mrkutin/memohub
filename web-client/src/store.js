import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'
const db = new PouchDB('notes');
console.log(db)

Vue.use(Vuex)

function generateId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const state = {
  notes: [
    {_id: '0809789675765645646', caption: 'Third Note', text: 'This is my third note', updatedAt: new Date()},
    {_id: '6567698990898876777', caption: 'Second Note', text: 'This is my second note', updatedAt: new Date()},
    {_id: '9797909807980789709', caption: 'First Note', text: 'This is my first note', updatedAt: new Date()}
  ],
  currentNote: null
}

state.currentNote = state.notes[0]

const getters = {
  allNotes(state) {
    return state.notes
  }
}

const mutations = {
  setCurrentNote(state, note) {
    state.currentNote = note
  },
  addNote(state, note) {
    state.notes = [note, ...state.notes]
  }
}

const actions = {
  selectNote({commit}, note) {
    commit('setCurrentNote', note)
  },
  createNote({commit}) {
    const note = {_id: generateId(12), capton: '', text: '', createdAt: new Date, updatedAt: new Date()}
    commit('addNote', note)
    commit('setCurrentNote', note)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
