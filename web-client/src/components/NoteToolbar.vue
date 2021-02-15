<template>
  <div class="h3 mt-2" v-if="note">
    <b-button variant="light" v-on:click="onDeleteClick">
      <b-icon icon="trash"></b-icon>
    </b-button>
    <b-button variant="light">
      <b-icon icon="link"></b-icon>
    </b-button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'NoteToolbar',
  props: ['note'],
  methods: {
    ...mapActions(['deleteNote']),
    onDeleteClick(){
      if (confirm('Are you sure?')) {
        this.deleteNote(this.note)
      }
    }
  }
}
</script>
