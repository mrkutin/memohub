<template>
  <NoteEditor :note="currentNote"/>
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'NewNote',
  components: {
    NoteEditor
  },
  methods: mapActions(['createNote']),
  created: function () {
    this.createNote()
  },
  computed: mapState(['currentNote'])
}
</script>
