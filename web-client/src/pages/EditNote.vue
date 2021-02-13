<template>
  <NoteEditor :note="note" />
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
  methods: mapActions(['findNoteById']),
  async created() {
    this.note = await this.findNoteById(this.id)
  }
}
</script>
