<template>
  <b-card
      v-on:click="onClick"
      v-on:mouseenter="toggleHighlight"
      v-on:mouseleave="toggleHighlight"
      :title="note.caption"
      :sub-title="note.updatedAt.toDateString()"
      :bg-variant="highlighted ? 'light' : 'default'"
      class="custom-card border-top-0 border-right-0 border-left-0 border-bottom"
  >
    <b-card-text v-html="note.text" class="text-truncate"/>
  </b-card>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'NotePreview',
  props: ['note'],
  data () {
    return {
      highlighted: false
    }
  },
  methods: {
    ...mapActions(['selectNote']),
    toggleHighlight(){
      this.highlighted = !this.highlighted
    },
    onClick(){
      this.selectNote(this.note)
      this.$router.push(`/notes/${this.note._id}`)
    }
  },
  computed: {
    ...mapState(['currentNote'])
  }
}
</script>
