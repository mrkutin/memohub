<template>
  <div class="row">
    <div class="col-lg-3 col-md-12 scrolled">
      <NotePreview v-for="note in filteredNotes"
                   :key="note._id"
                   :note="note"
      />
    </div>
    <div class="col-9 d-none d-lg-block border-left" v-b-visible="visibleHandler">
      <NoteToolbar :note="selectedNote"/>
      <NoteAttachment v-for="attachmentName in attachmentNames"
                      :key="attachmentName"
                      :attachmentName="attachmentName"
      />
      <NoteEditor :note="selectedNote"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import NotePreview from '../components/NotePreview'
import NoteEditor from '../components/NoteEditor'
import NoteToolbar from '../components/NoteToolbar'
import NoteAttachment from '../components/NoteAttachment'

export default {
  name: "NoteList",
  components: {
    NotePreview,
    NoteEditor,
    NoteToolbar,
    NoteAttachment
  },
  computed: {
    ...mapState(['isEditorVisible', 'selectedNote']),
    ...mapGetters(['filteredNotes']),
    attachmentNames() {
      if (!this.selectedNote) {
        return []
      }
      return Object.keys(this.selectedNote._attachments)
    }
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
