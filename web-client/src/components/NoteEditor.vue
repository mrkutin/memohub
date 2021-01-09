<template>

  <b-form>
      <b-form-input
          id="input-1"
          placeholder="Note caption"
          required
      ></b-form-input>

      <b-form-textarea
          id="textarea-rows"
          placeholder="Put your note here"
          rows="20"
      />
  </b-form>
</template>

<script>
export default {
  name: "NoteEditor"
}
</script>

<style scoped>
  input, textarea {
    border: none;
    outline: 0 !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }


</style>