<template>
  <div>
    <b-card
        v-on:click="onEditClick"
        v-on:mouseenter="toggleHovered"
        v-on:mouseleave="toggleHovered"
        v-on:touchmove="toggleHovered"
        :bg-variant="hovered ? 'light' : 'default'"
        class="custom-card border-top-0 border-right-0 border-left-0 border-bottom"
    >
      <b-list-group-item class="d-flex justify-content-between align-items-center p-0 border-0 bg-transparent">
        <b-card-title>{{note.caption}}</b-card-title>
        <b-button-toolbar v-if="hovered">
          <b-button-group class="mr-1">
            <b-button title="Edit note" v-on:click.stop="onEditClick">
              <b-icon icon="file-earmark-text" aria-hidden="true"></b-icon>
            </b-button>
            <b-button title="Delete note" v-on:click.stop="onDeleteClick">
              <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </b-list-group-item>
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
      hovered: false
    }
  },
  methods: {
    onDeleteClick(){
      alert()
    },
    toggleHovered() {
      this.hovered = !this.hovered
    },
    onEditClick() {
      this.$router.push(`/notes/${this.note._id}`)
    }
  }
}
</script>
