<template>
  <b-card
      v-on:mouseenter="toggleHighlight"
      v-on:mouseleave="toggleHighlight"
      :title="caption"
      :sub-title="updatedAt.toDateString()"
      :bg-variant="highlighted ? 'light' : 'default'"
  >
    <b-card-text>
      {{text}}
    </b-card-text>
    <a href="#" class="card-link">Card link</a>
    <b-link href="#" class="card-link">Another link</b-link>
  </b-card>
</template>

<script>
export default {
  name: 'NotePreview',
  props: ['_id', 'caption', 'text', 'updatedAt'],
  data () {
    return {
      highlighted: false
    }
  },
  methods: {
    toggleHighlight () {
      this.highlighted = !this.highlighted
    }
  }
}
</script>
