<template>
  <NoteEditor :note="note"/>
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
  methods: mapActions(['createNote']),
  async created () {
    this.note = await this.createNote()
  }
}
</script>
