import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'

const db = new PouchDB('notes');

Vue.use(Vuex)

const state = {
  notes: [],
  currentNote: null
}

db.allDocs({include_docs: true})
  .then(res => {
      state.notes = res.rows.map(row => row.doc)
    }
  )

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
  selectNoteById({commit, state}, noteId) {
    const note = state.notes.find(note => note._id === noteId)
    commit('setCurrentNote', note)
  },
  async createNote({commit}) {
    const noteTemplate = {caption: 'Caption', text: '', createdAt: new Date, updatedAt: new Date()}
    const res = await db.post(noteTemplate)
    const note = await db.get(res.id)
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
