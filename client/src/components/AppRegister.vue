<template>
  <v-container>
    <v-layout>
      <v-flex row xs12 sm9 md6 offset-sm1 offset-md3>
        <v-card>
          <v-card-title>
            <h1>Sign up</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                label="E-Mail"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                label="Confirm password"
                type="password"
                v-model="confirmPassword"
                :rules="[confirmPasswordRules]"
                required
              ></v-text-field>
              <v-alert color="error" icon="warning" dismissible v-model="error">
                {{ errorMsg }}
              </v-alert>
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
                <v-btn
                @click="onSubmit"
                >
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
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: false,
      errorMsg: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
      ]
    }
  },
  computed: {
    confirmPasswordRules () {
      return (this.password !== this.confirmPassword ? 'Passwords not matching' : true)
    }
  },
  methods: {
    onSubmit () {
      this.error = false
      this.errorMsg = ''
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('userSignUp', user)
          .then(() => {
            this.$router.push('/signin')
          }).catch(err => {
            console.log(err)
            this.error = true
            this.errorMsg = 'Oops! Registration failed. Please check your network connection.'
          })
      }
    }
  }
}
</script>

<style>

</style>
