import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'
import pouchdbFind from 'pouchdb-find'
PouchDB.plugin(pouchdbFind)

Vue.use(Vuex)

// const usersDB = new PouchDB('http://localhost:5984/_users')

// usersDB.find({
//   selector: {
//     email: 'serge.kutin@gmail.com'
//   }
// }).then(console.log)

const state = {
  notes: [],
}

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
  async signUp(ctx, {email, username, password}) {
    const name = username.replace(/[^a-z0-9]/gi,'').toLowerCase()

    const res = await fetch(`http://localhost:5984/_users/org.couchdb.user:${name}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,// system immutable name
        email,
        username,// real user's name
        password,
        roles: [],
        type: 'user'
      })
    })

    if (!res.ok) {
      if (res.status === 409) {
        return Promise.reject(new Error('User with such a name already exists'))
      } else {
        return Promise.reject(new Error(res.statusText))
      }
    }

    return Promise.resolve()
  },

  async selectNoteById({state}, noteId) {
    return state.notes.find(note => note._id === noteId)
  },

  async createNote() {

  },

  async saveNote() {
  },

  async deleteNote() {

  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
