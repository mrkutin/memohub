<template>
  <b-card
      v-on:click="selectNote(_id)"
      v-on:mouseenter="toggleHighlight"
      v-on:mouseleave="toggleHighlight"
      :title="caption"
      :sub-title="updatedAt.toDateString()"
      :bg-variant="_id === selectedNoteId || highlighted ? 'light' : 'default'"
  >
    <b-card-text>
      {{text}}
    </b-card-text>
    <a href="#" class="card-link">Card link</a>
    <b-link href="#" class="card-link">Another link</b-link>
  </b-card>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'NotePreview',
  props: ['_id', 'caption', 'text', 'updatedAt'],
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
  computed: mapState(['selectedNoteId'])
}
</script>
