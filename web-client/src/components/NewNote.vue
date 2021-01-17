<template>
  <NoteEditor />
</template>

<script>
import NoteEditor from './NoteEditor'
import {mapActions} from 'vuex'

export default {
  name: 'NewNote',
  components: {
    NoteEditor
  },
  methods: mapActions(['createNote']),
  created: function () {
    this.createNote()
  }
}
</script>
