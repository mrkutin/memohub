<template>
  <div class="row">
    <div class="col-lg-3 col-md-12">
      <NotePreview v-for="note in allNotes" :key="note._id" :note="note" :isEditorVisible="isEditorVisible"
                   v-on:note-selected="selectNote"
      />
    </div>
    <div class="col-9 d-none d-lg-block border-left" v-b-visible="visibleHandler" >
      <NoteEditor :note="selectedNote"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
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
      isEditorVisible: false,
      selectedNote: null
    }
  },
  computed: mapGetters(['allNotes']),
  methods: {
    selectNote(note){
      this.selectedNote = note
    },
    visibleHandler(isVisible) {
      this.isEditorVisible = isVisible
    }
  }
}
</script>
