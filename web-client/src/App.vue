<template>
  <div id="app">
    <Navbar />
    <b-container fluid=true>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

