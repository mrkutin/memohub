<template>
  <b-row no-gutters>
    <div class="col-12 col-md-3 border-right ">
      <NoteList />
    </div>
    <div class="col-12 col-md-9 pl-3">
      <NoteEditor />
    </div>
  </b-row>
</template>

<script>
import NoteList from './NoteList'
import NoteEditor from './NoteEditor'

export default {
  name: 'NoteListWithEditor',
  components: {
    NoteList,
    NoteEditor
  }

}
</script>
