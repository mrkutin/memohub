<template>
  <b-form>
    <b-form-input
        :value="note.caption"
        v-if="note"
        size="lg"
        placeholder="Put your note caption here"
        required
        v-on:keyup="onCaptionType"
        v-on:change="onChange"
        class=""
    ></b-form-input>
    <vue-editor v-if="note" v-model="note.text" />
  </b-form>
</template>

<script>
import { VueEditor } from "vue2-editor"

export default {
  name: "NoteEditor",
  props: ['note'],
  components: {
    VueEditor
  },
  methods: {
    onCaptionType(e) {
      this.note.caption = e.target.value
    },
    onTextType(e) {
      this.note.text = e.target.value
    },
    onChange(){
      //todo save it to the DB
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
