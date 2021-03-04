<template>
  <div class="h3 mt-2 mr-3" v-if="note">
    <b-button variant="light" v-on:click="toggleFilePicker">
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
  data() {
    return {
      showFilePicker: false,
      files: []
    }
  },
  methods: {
    ...mapActions(['deleteNote', 'uploadFiles']),

    async upload() {
      if (this.files.length) {
        const files = await Promise.all(
            this.files.map(file => new Promise(resolve => {
                  const fileReader = new FileReader()
                  fileReader.onload = e => {
                    return resolve({
                      name: file.name,
                      dataURL: e.target.result
                    })
                  }
                  fileReader.readAsDataURL(file)
                })
            )
        )

        this.uploadFiles(files)
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
