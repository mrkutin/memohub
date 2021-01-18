import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'

const db = new PouchDB('notes');

Vue.use(Vuex)

const state = {
  notes: [],
}

const fetchAll = db.allDocs({include_docs: true, descending: true })
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
  },
  removeNote(state, _note) {
    const idx = state.notes.findIndex(note => note._id === _note._id)
    state.notes.splice(idx, 1)
  }
}

const actions = {
  async selectNoteById({state}, noteId) {
    await fetchAll
    return state.notes.find(note => note._id === noteId)
  },
  async createNote({commit}) {
    await fetchAll
    const noteTemplate = {createdAt: new Date, updatedAt: new Date()}
    const res = await db.post(noteTemplate)
    const note = await db.get(res.id)
    commit('addNote', note)
    return note
  },
  async saveNote(ctx, note) {
    const res = await db.put(note)
    const {_rev} = await db.get(res.id)
    note._rev = _rev
  },
  async deleteNote({commit}, note) {
    commit('removeNote', note)
    await db.remove(note)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
