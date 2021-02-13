<template>
  <NoteEditor :note="note" />
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapActions, mapState} from 'vuex'

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
  computed: mapState(['selectedNote']),
  methods: mapActions(['findNoteById']),
  async created() {
    if (this.id === 'new') {
      this.note = this.selectedNote
    } else {
      this.note = await this.findNoteById(this.id)
    }
  }
}
</script>
