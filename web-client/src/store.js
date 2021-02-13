import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'
import pouchdbFind from 'pouchdb-find'

import {getCookie, setCookie} from './util'
import {couchDbUrl} from '@/config'

PouchDB.plugin(pouchdbFind)

Vue.use(Vuex)

const createDb = (user) => {
  if (!user) {
    return null
  }
  const {dbName, name: username, password} = user
  return new PouchDB(`${couchDbUrl}/${dbName}`, {auth: {username, password}})
}

const user = getCookie('user') !== undefined ? JSON.parse(getCookie('user')) : null
const db = createDb(user)

const state = {
  user,
  db,
  notes: []
}

const getters = {
  isLoggedIn(state) {
    return state.user !== null
  },

  userName(state) {
    return state.user.username
  },

  allNotes(state) {
    return state.notes
  }
}

const mutations = {

  unsetUser(state) {
    state.user = null
  },

  unsetDB(state) {
    state.db = null
  },

  saveCurrentUser(state) {
    setCookie('user', JSON.stringify(state.user))
  },

  setUser(state, user) {
    const name = user._id.split('org.couchdb.user:')[1]
    state.user = {
      ...user,
      name,
      dbName: `memohub-${name.split('').map(char => char.charCodeAt(0).toString(16)).join('')}`
    }
  },

  setNotes(state, notes) {
    state.notes = notes
  },

  setDB(state) {
    state.db = createDb(state.user.dbName, state.user.name, state.user.password)
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
  logOut({commit}) {
    commit('unsetUser')
    commit('saveCurrentUser')
    commit('unsetDB')
  },

  async logIn({commit}, {username, password}) {
    const res = await fetch(`${couchDbUrl}/_users/_find`, {
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
    if (!json.docs || !json.docs.length) {
      return Promise.reject(new Error('User not found'))
    }

    commit('setUser', {...json.docs[0], password})
    commit('saveCurrentUser')
    commit('setDB')

    return Promise.resolve()
  },

  async signUp(ctx, {email, username, password}) {
    const name = username.replace(/[^a-z0-9]/gi, '').toLowerCase()

    const res = await fetch(`${couchDbUrl}/_users/org.couchdb.user:${name}`, {
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

  async selectNoteById(ctx, noteId) {
    return state.notes.find(note => note._id === noteId)
  },

  createNote({commit}) {
    const note = {createdAt: new Date, updatedAt: new Date()}
    commit('addNote', note)
    return note
  },

  async saveNote(ctx, note) {
    const {state: {db}} = ctx
    if (note._id) {
      const savedNote = await db.get(note._id)
      const newNote = {...note, _rev: savedNote._rev}
      await db.put(newNote)
      return newNote
    } else {
      await db.post(note)
      return db.get(note._id)
    }
  },

  async fetchAllNotes({state: {db}, commit}) {
    const result = await db.allDocs({
      include_docs: true,
      descending: true
    })
    commit('setNotes', result.rows.map(({doc}) => doc))
  },

  async deleteNote({commit, state: {db}}, note) {
    await db.remove(note)
    commit('removeNote', note)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
