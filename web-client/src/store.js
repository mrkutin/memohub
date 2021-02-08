import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'
import pouchdbFind from 'pouchdb-find'

PouchDB.plugin(pouchdbFind)

Vue.use(Vuex)


// const usersDB = new PouchDB('http://localhost:5984/_users')

const state = {
  notes: [],
}

const getters = {
  allNotes(state) {
    return state.notes
  },

  asciiToHex(str) {
    str.split('').map(char => Number(char).toString(16)).join('')
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },

  addNote(state, note) {
    state.notes = [note, ...state.notes]
  },

  removeNote(state, _note) {
    const idx = state.notes.findIndex(note => note._id === _note._id)
    state.notes.splice(idx, 1)
  }
}

const actions = {
  async identifyUser({commit}, username) {
    const res = await fetch(`http://localhost:5984/_users/_find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selector: {
          $or: [
            {_id: `org.couchdb.user:${username}`},
            {username: username},
            {email: username}
          ]
        }
      })
    })

    if (!res.ok) {
      return Promise.reject(new Error(res.statusText))
    }

    const json = await res.json()
    if (!json.docs || !json.docs.length){
      return Promise.reject(new Error('User not found'))
    }

    commit('setUser', json.docs[0])
    return Promise.resolve()
  },

  async logIn({dispatch}, {username}) {
    await dispatch('identifyUser', username)
    return Promise.resolve()
  },

  async signUp(ctx, {email, username, password}) {
    const name = username.replace(/[^a-z0-9]/gi, '').toLowerCase()

    const res = await fetch(`http://localhost:5984/_users/org.couchdb.user:${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
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
