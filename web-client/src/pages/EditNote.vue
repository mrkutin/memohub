<template>
  <NoteEditor :note="currentNote"/>
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import {mapState} from 'vuex'

export default {
  name: 'EditNote',
  components: {
    NoteEditor
  },
  computed: mapState(['currentNote'])
}
</script>
