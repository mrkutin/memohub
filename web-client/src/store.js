import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isNewNoteDialogOpen: false
  },
  mutations: {
    newNoteDialogOpen (state) {
      state.isNewNoteDialogOpen = true
    },
    newNoteDialogClose (state) {
      state.isNewNoteDialogOpen = false
    }
  }
})

export default store