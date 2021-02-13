<template>
  <NoteEditor :note="note" v-on:note-updated="updateNote" />
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapActions} from 'vuex'

export default {
  name: 'NewNote',
  components: {
    NoteEditor
  },
  data: () => {
    return {
      note: null
    }
  },
  methods: {
    ...mapActions(['createNote']),
    updateNote(note) {
      this.note = note
    }
  },
  async created () {
    this.note = await this.createNote()
  }
}
</script>
