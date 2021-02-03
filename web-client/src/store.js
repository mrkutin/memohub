import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'
PouchDB.plugin(pouchdbFind)

import axios from 'axios'

Vue.use(Vuex)

const usersDB = new PouchDB('http://localhost:5984/_users')
console.log('usersDB: ', usersDB)
usersDB.find({
  selector: {
    email: 'serge.kutin@gmail.com'
  }
}).then(console.log)

const state = {
  notes: [],
}

// const fetchAll = db.allDocs({include_docs: true, descending: true })
//   .then(res => {
//       state.notes = res.rows.map(row => row.doc)
//     }
//   )

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
  },

  setAxiosHeaders(state) {
    axios.defaults.headers.common['Authorization'] = state.token
  },

  createToken(state, name, password) {
    state.token = 'Basic ' + btoa(`${name}:${password}`)
  },

  saveToken(state) {
    window.localStorage.setItem('token', state.token)
  }
}

const actions = {
  async signUp({commit}, {email, username, password}) {
    const name = username.replace(/[^a-z0-9]/gi,'').toLowerCase()
    try {
      //create a user
      await axios.put(`http://localhost:5984/_users/org.couchdb.user:${name}`, {
        name,// system immutable name
        email,
        username,// real user's name
        password,
        roles: [],
        type: 'user'
      })
    } catch (err) {
      if (err.response && err.response.status === 409) {
        return Promise.reject(new Error('User with such a name already exists'))
      } else {
        return Promise.reject(err)
      }
    }

    commit('createToken', name, password)
    commit('setAxiosHeaders')
    commit('saveToken')

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
