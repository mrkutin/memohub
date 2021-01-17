<template>
  <NoteEditor :note="currentNote"/>
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'EditNote',
  props: ['id'],
  components: {
    NoteEditor
  },
  computed: mapState(['currentNote']),
  methods: mapActions(['selectNoteById']),
  created() {
    this.selectNoteById(this.id)
  }
}
</script>
