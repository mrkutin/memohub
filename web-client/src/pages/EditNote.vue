<template>
  <NoteEditor :note="note" />
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapState} from 'vuex'

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
  async created() {
    this.note = this.selectedNote
  }
}
</script>
