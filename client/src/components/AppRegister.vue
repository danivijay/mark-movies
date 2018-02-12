<template>
  <v-container>
    <v-layout>
      <v-flex row xs12 sm9 md6 offset-sm1 offset-md3>
        <v-card>
          <v-card-title>
            <h1>Signup</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="E-Mail"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                label="Confirm password"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              to="/signin"
              flat
              >
              Already registered?
            </v-btn>
            <v-btn>
              Register
            </v-btn>
          </v-card-actions>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
