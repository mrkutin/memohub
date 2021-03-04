<template>
  <b-badge class="attachment mr-1 p-1" variant="secondary">
    {{ attachmentName }}
    <b-icon v-on:click.prevent="onRemoveAttachmentClick" icon="x-circle"></b-icon>
  </b-badge>
</template>

<script>
export default {
  name: 'NoteAttachments',
  props: ['attachmentName'],
  methods: {
    onRemoveAttachmentClick(){
      alert(`Remove attachment ${this.attachmentName}!!!`)
    }
  }
}
</script>

<style scoped>
  .attachment {
    cursor: pointer;
  }
</style>
