<template>
  <div class="row mt-5">
    <b-card class="col-lg-4 col-md-6 mx-auto">
      <b-form novalidate v-on:submit.prevent="submit">
        <b-form-group
            label="Name:"
            :description="usernameMessage || 'The name you see on your profile'"
        >
          <b-form-input
              v-model="username"
              type="text"
              required
              :state="usernameState"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password:"
            :description="passwordMessage || 'Keep it strong, your privacy depends on it'"
        >
          <b-form-input
              v-model="password"
              type="password"
              required
              :state="passwordState"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password once again:"
            :description="passwordOnceAgainMessage || 'To exlude mistypes'"
        >
          <b-form-input
              v-model="passwordOnceAgain"
              type="password"
              required
              :state="passwordOnceAgainState"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Email:"
            :description="emailMessage || 'We\'ll never share your email with anyone else'"
        >
          <b-form-input
              v-model="email"
              type="email"
              required
              :state="emailState"
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
  name: 'SignUp',
  data() {
    return {
      email: '',
      emailState: undefined,
      emailMessage: '',

      username: '',
      usernameState: undefined,
      usernameMessage: '',

      password: '',
      passwordState: undefined,
      passwordMessage: '',

      passwordOnceAgain: '',
      passwordOnceAgainState: undefined,
      passwordOnceAgainMessage: ''
    }
  },
  methods: {
    ...mapActions(['signUp']),
    validate() {
      if (!this.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.emailState = false
        this.emailMessage = 'Email is invalid'
      } else {
        this.emailState = true
        this.emailMessage = ''
      }

      if (!this.username) {
        this.usernameState = false
        this.usernameMessage = 'Name can\'t be blank'
      } else {
        this.usernameState = true
        this.usernameMessage = ''
      }

      if (this.password !== this.passwordOnceAgain) {
        this.passwordState = false
        this.passwordMessage = 'Passwords don\'t match'
        this.passwordOnceAgainState = false
        this.passwordOnceAgainMessage = 'Passwords don\'t match'
      } else {
        this.passwordState = true
        this.passwordMessage = ''
        this.passwordOnceAgainState = true
        this.passwordOnceAgainMessage = ''
      }

      if (!this.password) {
        this.passwordState = false
        this.passwordMessage = 'Password can\'t be blank'
      } else {
        this.passwordState = true
        this.passwordMessage = ''
      }

      if (!this.passwordOnceAgain) {
        this.passwordOnceAgainState = false
        this.passwordOnceAgainMessage = 'Password can\'t be blank'
      } else {
        this.passwordOnceAgainState = true
        this.passwordOnceAgainMessage = ''
      }

      return this.emailState && this.usernameState && this.passwordState && this.passwordOnceAgainState
    },
    async submit() {
      if(this.validate()){
        try {
          await this.signUp({email: this.email, username: this.username, password: this.password})
          this.$router.push('/')
        } catch (err) {
          this.usernameState = false
          this.usernameMessage = err.message
        }
      }
    }
  },
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
