<template>
  <div>
    <NoteToolbar :note="selectedNote"/>
    <NoteAttachment v-for="attachmentName in attachmentNames"
                    :key="attachmentName"
                    :attachmentName="attachmentName"
    />
    <NoteEditor :note="selectedNote"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import NoteEditor from '../components/NoteEditor'
import NoteToolbar from '../components/NoteToolbar'
import NoteAttachment from '../components/NoteAttachment'

export default {
  name: 'Note',
  data() {
    return {
      attachments: []
    }
  },

  components: {
    NoteToolbar,
    NoteAttachment,
    NoteEditor
  },
  computed: {
    ...mapState(['selectedNote']),
    attachmentNames() {
      if (!this.selectedNote || !this.selectedNote._attachments) {
        return []
      }
      return Object.keys(this.selectedNote._attachments)
    }
  }

}
</script>
