import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'

const db = new PouchDB('notes');

Vue.use(Vuex)

const state = {
  notes: [],
}

db.allDocs({include_docs: true})
  .then(res => {
      state.notes = res.rows.map(row => row.doc)
    }
  )

const getters = {
  allNotes(state) {
    return state.notes
  }
}

const mutations = {
  addNote(state, note) {
    state.notes = [note, ...state.notes]
  }
}

const actions = {
  selectNoteById({state}, noteId) {
    return state.notes.find(note => note._id === noteId)
  },
  async createNote({commit}) {
    const noteTemplate = {caption: 'Caption', text: '', createdAt: new Date, updatedAt: new Date()}
    const res = await db.post(noteTemplate)
    const note = await db.get(res.id)
    commit('addNote', note)
    return note
  },
  async saveNote(ctx, note) {
    const res = await db.put(note)
    const {_rev} = await db.get(res.id)
    note._rev = _rev
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
