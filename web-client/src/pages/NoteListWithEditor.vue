<template>
  <div class="row">
    <div class="col-lg-3 col-md-12">
      <NotePreview v-for="note in notes"
                   :key="note._id"
                   :note="note"
                   :isEditorVisible="isEditorVisible"
                   v-on:note-selected="selectNote"
      />
    </div>
    <div class="col-9 d-none d-lg-block border-left" v-b-visible="visibleHandler">
      <NoteEditor :note="selectedNote"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import NotePreview from '../components/NotePreview'
import NoteEditor from '../components/NoteEditor'

export default {
  name: "NoteList",
  components: {
    NotePreview,
    NoteEditor
  },
  data(){
    return {
      isEditorVisible: false,//editor is not visible on mobile
      selectedNote: null
    }
  },
  computed: mapState(['notes']),
  async mounted() {
    await this.fetchAllNotes()
    this.notes.length && this.selectNote(this.notes[0])
  },
  methods: {
    ...mapActions(['fetchAllNotes']),
    selectNote(note) {
      this.selectedNote = note
    },
    visibleHandler(isVisible) {
      this.isEditorVisible = isVisible
    }
  }
}
</script>
