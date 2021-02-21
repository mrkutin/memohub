<template>
  <div v-if="note">
    <b-form-input
        placeholder="Put your caption here"
        v-model="note.caption"
        v-on:change="debouncedOnChange"
        size="lg"
        required
    />
    <vue-editor
        placeholder="Put your note here"
        v-model="note.text"
        v-on:text-change="debouncedOnChange"
    />
  </div>

</template>

<script>
import { VueEditor } from "vue2-editor"
import {mapActions} from 'vuex'
import {debounce} from '@/util'

export default {
  name: "NoteEditor",
  props: ['note'],
  components: {
    VueEditor
  },
  data() {
    return {
      showDismissibleAlert: true
    }
  },
  computed: {
    debouncedOnChange: function() {
      return debounce(this.onChange, 1000);
    },
  },
  methods: {
    ...mapActions(['saveNote']),
    async onChange () {
      await this.saveNote(this.note)
    }
  }
}
</script>

<style scoped>
input {
  border: none;
  outline: 0 !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
</style>

<style>
#quill-container.ql-container.ql-snow {
  border: none;
}

.quillWrapper .ql-snow.ql-toolbar {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

#quill-container{
  height: calc(100vh - 200px);
  overflow: scroll;
}
</style>
