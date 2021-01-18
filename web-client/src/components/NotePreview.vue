<template>
  <div>
    <b-card
        v-on:click="onClick"
        v-on:mouseenter="toggleHighlight"
        v-on:mouseleave="toggleHighlight"
        :bg-variant="highlighted ? 'light' : 'default'"
        class="custom-card border-top-0 border-right-0 border-left-0 border-bottom"
    >
      <b-card-title><h4>{{note.caption}}</h4></b-card-title>
      <b-card-sub-title class="ml-2">{{new Date(note.updatedAt).toDateString()}}</b-card-sub-title>
      <b-card-text v-html="note.text" class="text-truncate ml-2"/>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'NotePreview',
  props: ['note'],
  data() {
    return {
      highlighted: false
    }
  },
  methods: {
    toggleHighlight() {
      this.highlighted = !this.highlighted
    },
    onClick() {
      this.$router.push(`/notes/${this.note._id}`)
    }
  }
}
</script>
