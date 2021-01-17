<template>
  <b-row no-gutters>
    <div class="col-12 col-md-3 border-right ">
      <NoteList />
    </div>
    <div class="col-12 col-md-9 pl-3">
      <NoteEditor :note="currentNote"/>
    </div>
  </b-row>
</template>

<script>
import NoteList from './NoteList'
import NoteEditor from './NoteEditor'
import {mapGetters} from 'vuex'

export default {
  name: 'NoteListWithEditor',
  computed: mapGetters(['currentNote']),
  components: {
    NoteList,
    NoteEditor
  }

}
</script>

<style scoped>

</style>