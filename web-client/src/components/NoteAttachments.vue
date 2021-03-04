<template>
  <div>
    <b-badge v-for="name in attachmentNames" :key="name" variant="secondary" class="mr-1 p-1">
      {{ name }} <b-icon icon="x-circle"></b-icon>
    </b-badge>
  </div>
</template>

<script>
export default {
  name: 'NoteAttachments',
  props: ['attachments'],
  computed: {
    attachmentNames() {
      return Object.keys(this.attachments)
    }
  }

}
</script>
