<template>
  <div class="row mt-5">
    <b-card class="col-lg-4 col-md-6 mx-auto">
      <b-form novalidate v-on:submit.prevent="submit">
        <b-form-group
            label="Name:"
            description="Your name, username or email"
        >
          <b-form-input
              v-model="username"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password:"
            description="Your password"
        >
          <b-form-input
              v-model="password"
              type="password"
              required
          ></b-form-input>
        </b-form-group>

        <b-button class="" type="submit" variant="info">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'LogIn',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['logIn']),
    async submit() {
      await this.logIn({username: this.username, password: this.password})
      await this.$router.push('/notes')
    }
  }
}
</script>

<style scoped>
.screen-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
