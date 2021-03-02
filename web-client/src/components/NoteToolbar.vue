<template>
  <div class="h3 mt-2 mr-3"
       v-on:click="toggleFilePicker"
       v-if="note"
  >
    <b-button variant="light">
      <b-icon icon="paperclip"></b-icon>
    </b-button>
    <b-button variant="light">
      <b-icon icon="link"></b-icon>
    </b-button>
    <b-button variant="light" v-on:click="onDeleteClick">
      <b-icon icon="trash"></b-icon>
    </b-button>

    <b-form-file v-if="showFilePicker" size="sm"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'NoteToolbar',
  props: ['note'],
  data () {
    return {
      showFilePicker: false
    }
  },
  methods: {
    ...mapActions(['deleteNote']),
    toggleFilePicker() {
      this.showFilePicker = !this.showFilePicker
    },
    onDeleteClick() {
      if (confirm('Are you sure?')) {
        this.deleteNote(this.note)
      }
    }
  }
}
</script>
