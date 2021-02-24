<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Memo Hub</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
            to="/notes"
            exact
            exact-active-class="active"
        >
          Notes
        </b-nav-item>
        <b-nav-item
            v-on:click.prevent="onNewClick"
        >
          New note
        </b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="isNotesPage">
          <b-form-input v-model="query" v-on:keyup="onSearchChange" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        </b-nav-form>

        <b-nav-item-dropdown right v-if="isLoggedIn">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item
             v-if="isLoggedIn"
             v-on:click="clickLogOut"
             exact
             exact-active-class="active"
          >
            Log Out
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item
            v-if="!isLoggedIn"
            to="/signup"
            exact
            exact-active-class="active"
        >
          Sign up
        </b-nav-item>
        <b-nav-item
            v-if="!isLoggedIn"
            to="/login"
            exact
            exact-active-class="active"
        >
          Log In
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'Navbar',
  data(){
    return {
      query: null
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userName']),
    ...mapState(['isEditorVisible']),
    isNotesPage(){
      return this.$route.name === 'note-list'
    }
  },
  methods: {
    ...mapActions(['logOut', 'createNote', 'saveNote', 'applyFilter']),
    onSearchChange() {
      this.applyFilter(this.query)
    },
    clickLogOut() {
      this.logOut()
      this.$router.push('/login')
    },
    async onNewClick() {
      await this.createNote()
      if(!this.isEditorVisible){
        await this.$router.push('/notes/new')
      }
    }
  }
}
</script>
