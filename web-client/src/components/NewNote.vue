<template>
  <NoteEditor :note="currentNote"/>
</template>

<script>
import NoteEditor from './NoteEditor'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'NewNote',
  components: {
    NoteEditor
  },
  methods: mapActions(['createNote']),
  computed: mapGetters(['currentNote']),
  mounted: function () {
    this.createNote()
  }
}
</script>
