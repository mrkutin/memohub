<template>
  <NoteEditor :note="note" v-on:noteUpdated="updateNote"/>
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapActions} from 'vuex'

export default {
  name: 'EditNote',
  props: ['id'],
  components: {
    NoteEditor
  },
  data: () => {
    return {
      note: null
    }
  },
  methods: {
    ...mapActions(['selectNoteById']),
    updateNote(note) {
      this.note = note
    }
  },
  async created() {
    this.note = await this.selectNoteById(this.id)
  }
}
</script>
