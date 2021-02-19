import Vue from 'vue'
import Vuex from 'vuex'

import PouchDB from 'pouchdb-browser'
import pouchdbFind from 'pouchdb-find'

import {getCookie, setCookie} from './util'
import {couchDbUrl, pouchDbName} from '@/config'

PouchDB.plugin(pouchdbFind)

Vue.use(Vuex)

const getRemoteDb = (user) => {
  if (!user) {
    return null
  }
  const {dbName, name: username, password} = user
  return new PouchDB(`${couchDbUrl}/${dbName}`, {auth: {username, password}})
}

const getLocalDb = () => {
  return new PouchDB(`${pouchDbName}`)
}

const localDb = getLocalDb()
localDb.createIndex({
  index: {
    fields: ['updatedAt']
  }
}).then(function (result) {
  console.log('createIndex result: ', result)
}).catch(function (err) {
  console.log('createIndex error: ', err)
})

const user = getCookie('user') !== undefined ? JSON.parse(getCookie('user')) : null
const remoteDb = getRemoteDb(user)

const state = {
  user,
  localDb,
  remoteDb,
  notes: [],
  selectedNote: null,
  isEditorVisible: false
}

const getters = {
  isLoggedIn(state) {
    return state.user !== null
  },

  userName(state) {
    return state.user.username
  }

}

const mutations = {
  setRemoteDb(state) {
    state.remoteDb = getRemoteDb(state.user)
  },

  unsetRemoteDb(state) {
    state.remoteDb = null
  },

  setUser(state, user) {
    const name = user._id.split('org.couchdb.user:')[1]
    state.user = {
      ...user,
      name,
      dbName: `memohub-${name.split('').map(char => char.charCodeAt(0).toString(16)).join('')}`
    }
  },

  unsetUser(state) {
    state.user = null
  },

  saveCurrentUser(state) {
    setCookie('user', JSON.stringify(state.user))
  },

  setNotes(state, notes) {
    state.notes = notes
  },

  setSelectedNote(state, note) {
    state.selectedNote = note
  },

  updateSelectedNoteWithId({selectedNote}, _id) {
    selectedNote._id = _id
  },

  setEditorVisisble(state, isVisible) {
    state.isEditorVisible = isVisible
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
    commit('unsetRemoteDb')
  },

  async logIn({commit, dispatch}, {username, password}) {
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
    commit('setRemoteDb')
    dispatch('sync')

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

  sync({dispatch, state: {localDb, remoteDb}}) {
    if (localDb && remoteDb) {
      localDb.sync(remoteDb, {
        live: true
      }).on('change', function ({direction, change}) {
        console.log('sync change: ', direction, change)

        if (direction === 'pull') {
          dispatch('fetchAllNotes')
        }
      }).on('error', function (err) {
        console.log('sync error: ', err)
      })
    }
  },

  async fetchAllNotes({state: {localDb}, commit}) {
    if (!localDb) {
      return
    }

    const result = await localDb.find({
      selector: {},
      sort: [{updatedAt: 'desc'}]
    })

    console.log('result: ', result)

    const notes = result.docs
    commit('setNotes', notes)
    if (notes.length) {
      commit('setSelectedNote', notes[0])
    } else {
      commit('setSelectedNote', null)
    }
  },

  async fetchQuery({commit}, query) {
    if (!localDb) {
      return
    }

    const result = await localDb.find({
      selector: {
        $or: [
          {
            caption: {
              $regex: `(?i)${query}`
            }
          },
          {
            text: {
              $regex: `(?i)${query}`
            }
          }
        ]
      },
      // sort: [{_id: 'desc'}]
    })
    const notes = result.docs
    commit('setNotes', notes)
    if (notes.length) {
      commit('setSelectedNote',)
    } else {
      commit('setSelectedNote', null)
    }
  },

  createNote({commit}) {
    const note = {createdAt: new Date(), updatedAt: new Date()}
    commit('addNote', note)
    commit('setSelectedNote', note)
  },

  async saveNote({state: {localDb}, commit}, note) {
    if (!localDb) {
      return Promise.resolve()
    }

    if (note._id) {
      const savedNote = await localDb.get(note._id)
      const newNote = {...note, _rev: savedNote._rev, updatedAt: new Date()}
      await localDb.put(newNote)
    } else {
      const id = (await localDb.post(note)).id
      commit('updateSelectedNoteWithId', id)
    }
  },

  selectNote({commit}, note) {
    commit('setSelectedNote', note)
  },

  updateEditorVisible({commit}, isVisible) {
    commit('setEditorVisisble', isVisible)
  },

  async deleteNote({commit, state: {localDb, notes}}, note) {
    if (!localDb) {
      return
    }

    const savedNote = await localDb.get(note._id)
    await localDb.remove(savedNote)
    commit('removeNote', savedNote)

    if (notes.length) {
      commit('setSelectedNote', notes[0])
    }
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
