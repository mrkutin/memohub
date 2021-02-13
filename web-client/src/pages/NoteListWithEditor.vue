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
  computed: mapState(['notes', 'selectedNote', 'isEditorVisible']),
  async mounted() {
    await this.fetchAllNotes()
    this.notes.length && this.selectNote(this.notes[0])
  },
  methods: {
    ...mapActions(['fetchAllNotes', 'selectNote', 'updateEditorVisible']),
    visibleHandler(isVisible) {
      this.updateEditorVisible(isVisible)
    }
  }
}
</script>
