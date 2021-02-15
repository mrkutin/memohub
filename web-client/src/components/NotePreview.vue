<template>
  <div>
    <b-card
        v-on:click="onClick"
        v-on:mouseenter="toggleHovered"
        v-on:mouseleave="toggleHovered"
        v-on:touchmove="toggleHovered"
        :bg-variant="hovered ? 'light' : 'default'"
        class="custom-card border-top-0 border-right-0 border-left-0 border-bottom"
    >
      <b-list-group-item class="d-flex justify-content-between align-items-center p-0 border-0 bg-transparent">
        <b-card-title>{{note.caption}}</b-card-title>
      </b-list-group-item>
      <b-card-sub-title class="ml-2">{{updatedAt}}</b-card-sub-title>
      <b-card-text v-html="note.text" class="text-truncate ml-2"/>
    </b-card>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'NotePreview',
  props: ['note'],
  data() {
    return {
      modalShow: true,
      hovered: false
    }
  },
  computed: {
    ...mapState(['isEditorVisible', 'selectedNote']),
    updatedAt(){
      const date = new Date(this.note.updatedAt)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
  },
  methods: {
    ...mapActions(['selectNote']),
    toggleHovered() {
      this.hovered = !this.hovered
    },
    async onClick() {
      this.selectNote(this.note)
      if (!this.isEditorVisible){
        await this.$router.push(`/notes/${this.selectedNote._id}`)
      }
    }
  }
}
</script>
