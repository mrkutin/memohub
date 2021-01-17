<template>
  <b-card
      v-on:click="selectNote(note)"
      v-on:mouseenter="toggleHighlight"
      v-on:mouseleave="toggleHighlight"
      :title="note.caption"
      :sub-title="note.updatedAt.toDateString()"
      :bg-variant="isNoteCurrent(note) || highlighted ? 'light' : 'default'"
      class="custom-card border-top-0 border-right-0 border-left-0 border-bottom"
  >
  </b-card>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

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
    }
  },
  computed: {
    ...mapState(['currentNote']),
    ...mapGetters(['isNoteCurrent'])
  }
}
</script>
