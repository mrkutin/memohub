<template>
  <div>
    <NoteToolbar :note="selectedNote" />
    <NoteEditor :note="selectedNote" />
  </div>
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import NoteToolbar from '../components/NoteToolbar'
import {mapState} from 'vuex'

export default {
  name: 'EditNote',
  props: ['id'],
  components: {
    NoteEditor,
    NoteToolbar
  },
  computed: mapState(['selectedNote']),
}
</script>
