<template>
  <div class="row mt-5">
    <b-card class="col-lg-4 col-md-6 mx-auto">
      <b-form>
        <b-form-group
            label="Email:"
            description="We'll never share your email with anyone else"
        >
          <b-form-input
              name="email"
              type="email"
              placeholder="example@mail.com"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Name:"
            description="The name you see on your profile"
        >
          <b-form-input
              name="name"
              type="text"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password:"
            description="Keep it strong, your privacy depends on it"
        >
          <b-form-input
              name="password"
              type="password"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password once again:"
            description="To exlude mistypes"
        >
          <b-form-input
              name="password-once-again"
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
  name: 'SignUp'
}
</script>

<style scoped>
  .screen-center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
