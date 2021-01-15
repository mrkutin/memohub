<template>
  <div>
    <NotePreview v-for="note in allNotes" :key="note._id" v-bind="note" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NotePreview from './NotePreview'

export default {
  name: "NoteList",
  components: {
    NotePreview
  },
  computed: mapGetters(['allNotes'])
}
</script>
