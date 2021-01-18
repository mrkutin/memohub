<template>
  <div>
    <b-toast
        :id="note._id"
        auto-hide-delay="5000"
        variant="warning"
        solid
        toaster="b-toaster-top-right"
    >
      <template #toast-title>
        <strong class="mr-auto">Attention! You are going to delete a note</strong>
      </template>
      <div class="d-flex justify-content-between align-items-baseline ">
        <p>Are you sure?</p>
        <b-button variant="danger" v-on:click="deleteNote(note)">Yes, delete it!</b-button>
      </div>
    </b-toast>
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
            <b-button title="Delete note" v-on:click.stop="toast">
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
import {mapActions} from 'vuex'

export default {
  name: 'NotePreview',
  props: ['note'],
  data() {
    return {
      modalShow: true,
      hovered: false
    }
  },
  methods: {
    ...mapActions(['deleteNote']),
    toast() {
      this.$bvToast.show(this.note._id)
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
