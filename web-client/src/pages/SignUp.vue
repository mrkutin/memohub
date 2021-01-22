<template>
  <div>
    <b-card
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-form @submit="onSubmit" @reset="onReset" >
        <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
        >
          <b-form-input
              id="input-1"
              type="email"
              placeholder="Enter email"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
              id="input-2"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>



        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
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

</style>
