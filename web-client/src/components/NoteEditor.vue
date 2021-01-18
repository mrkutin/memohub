<template>
  <b-form>
    <b-form-input
        placeholder="Put your note caption here"
        size="lg"
        required
        v-model="note.caption"
        v-if="note"
        v-on:change="onCaptionChange"
    ></b-form-input>
    <vue-editor v-if="note" v-model="note.text" v-on:text-change="onTextChange"/>
  </b-form>
</template>

<script>
import { VueEditor } from "vue2-editor"
import {mapActions} from 'vuex'

export default {
  name: "NoteEditor",
  props: ['note'],
  components: {
    VueEditor
  },
  methods: {
    ...mapActions(['saveNote']),
    onCaptionChange(){
      this.saveNote(this.note)
    },
    onTextChange(){
      this.saveNote(this.note)
    }
  }
}
</script>

<style scoped>
input {
  border: none;
  outline: 0 !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
</style>

<style>
#quill-container.ql-container.ql-snow {
  border: none;
}
.quillWrapper .ql-snow.ql-toolbar {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
