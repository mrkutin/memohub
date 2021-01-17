<template>
  <div>
    <NotePreview v-for="note in allNotes" :key="note._id" :note="note" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NotePreview from '../components/NotePreview'

export default {
  name: "NoteList",
  components: {
    NotePreview
  },
  computed: mapGetters(['allNotes'])
}
</script>
