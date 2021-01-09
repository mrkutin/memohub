<template>
  <b-modal
      v-model="isOpen"
      size="xl"
      title="New note"  >
    <b-form-textarea
        id="textarea-rows"
        placeholder="Put your note here"
        rows="20"
    ></b-form-textarea>
  </b-modal>
</template>

<script>
export default {
  name: 'NewNote',
  computed: {
    isOpen: {
      get(){
        return this.$store.state.isNewNoteDialogOpen
      },
      set(newName){
        if (newName === false) {
          this.$store.commit('newNoteDialogClose')
        }
        if (newName === true) {
          this.$store.commit('newNoteDialogOpen')
        }
      }
    }
  }
}
</script>