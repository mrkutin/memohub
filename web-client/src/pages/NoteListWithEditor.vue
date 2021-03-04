<template>
  <div class="row">
    <div class="col-lg-3 col-md-12 scrolled">
      <NotePreview v-for="note in filteredNotes"
                   :key="note._id"
                   :note="note"
      />
    </div>
    <div class="col-9 d-none d-lg-block border-left" v-b-visible="visibleHandler">
      <NoteToolbar :note="selectedNote" />
      <NoteAttachments v-if="selectedNote" :attachments="selectedNote._attachments" />
      <NoteEditor :note="selectedNote"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import NotePreview from '../components/NotePreview'
import NoteEditor from '../components/NoteEditor'
import NoteToolbar from '../components/NoteToolbar'
import NoteAttachments from '../components/NoteAttachments'

export default {
  name: "NoteList",
  components: {
    NotePreview,
    NoteEditor,
    NoteToolbar,
    NoteAttachments
  },
  computed: {
    ...mapState(['isEditorVisible', 'selectedNote']),
    ...mapGetters(['filteredNotes'])
  },
  async mounted() {
    await this.fetchAllNotes()
    await this.sync()
  },
  methods: {
    ...mapActions(['sync', 'fetchAllNotes', 'updateEditorVisible']),
    visibleHandler(isVisible) {
      this.updateEditorVisible(isVisible)
    }
  }
}
</script>

<style scoped>
  .scrolled {
    height: calc(100vh - 56px);
    overflow: scroll;
  }
</style>
