<template>

  <b-form>
    <b-form-input
        :value="selectedNote ? selectedNote.caption : ''"
        placeholder="Put your note caption here"
        required
        v-on:keyup="onCaptionType"
        v-on:change="onChange"
    ></b-form-input>
    <b-form-textarea
        :value="selectedNote ? selectedNote.text : ''"
        placeholder="Put your note text here"
        rows="20"
        v-on:keyup="onTextType"
        v-on:change="onChange"
    />
  </b-form>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "NoteEditor",
  computed: mapGetters(['selectedNote']),
  methods: {
    onCaptionType(e) {
      this.selectedNote.caption = e.target.value
    },
    onTextType(e) {
      this.selectedNote.text = e.target.value
    },
    onChange(){
      //todo save it to the DB
    }
  }
}
</script>

<style scoped>
input, textarea {
  border: none;
  outline: 0 !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
</style>
