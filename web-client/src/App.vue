<template>
  <div id="app">
    <Navbar />
    <b-container fluid=true>
      <b-row no-gutters>
        <div class="col-12 col-md-3">
          <NoteList />
        </div>
        <div class="col-12 col-md-9">
          <NoteEditor />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

export default {
  name: 'App',
  components: {
    Navbar,
    NoteList,
    NoteEditor
  }
}
</script>
