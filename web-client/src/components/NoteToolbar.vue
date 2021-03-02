<template>
  <div class="h3 mt-2 mr-3" v-if="note">
    <b-button variant="light" v-on:click="toggleFilePicker" >
      <b-icon icon="paperclip"></b-icon>
    </b-button>
    <b-button variant="light">
      <b-icon icon="link"></b-icon>
    </b-button>
    <b-button variant="light" v-on:click="onDeleteClick">
      <b-icon icon="trash"></b-icon>
    </b-button>
    <b-form-file v-model="files" v-if="showFilePicker" size="sm" multiple/>
    <b-button variant="light" v-if="showFilePicker" class="mt-2" v-on:click="upload">Upload</b-button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'NoteToolbar',
  props: ['note'],
  data () {
    return {
      showFilePicker: false,
      files: []
    }
  },
  methods: {
    ...mapActions(['deleteNote']),

    upload() {
      if (this.files.length) {
        console.log(this.files)

        this.files.forEach(file => {
          const fileReader = new FileReader()
          fileReader.onload = e => {
            console.log('event.target.result: ', e.target.result)
          }
          fileReader.readAsDataURL(file)
        })
      }
    },

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
