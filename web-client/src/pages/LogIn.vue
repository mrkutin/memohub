<template>
  <div class="row mt-5">
    <b-card class="col-lg-4 col-md-6 mx-auto">
      <b-form novalidate v-on:submit.prevent="">
        <b-form-group
            label="Name:"
            :description="'The name you see on your profile'"
        >
          <b-form-input
              type="text"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password:"
            :description="'Keep it strong, your privacy depends on it'"
        >
          <b-form-input
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

export default {
  name: 'LogIn',
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
