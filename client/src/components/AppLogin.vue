<template>
  <v-container>
    <v-layout>
      <v-flex row xs12 sm9 md6 offset-sm1 offset-md3>
        <v-card>
          <v-card-title>
            <h1>Signin</h1>
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
              <v-alert color="error" icon="warning" dismissible v-model="error">
                {{ errorMsg }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              to="/signup"
              flat
              >
              Not a member?
            </v-btn>
            <v-btn
              @click="onSubmit"
            >
              Enter
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
      error: false,
      errorMsg: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    setErr (val, msg) {
      this.error = val
      this.errorMsg = msg
    },
    onSubmit () {
      this.setErr(false, '')
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('userSignIn', user)
          .then((res) => {
            console.log('heree1', res)
            if (res) {
              return this.$store.dispatch('loadCollection')
            }
            console.log('heree2')
            this.setErr(true, 'Oops! Signin failed. Please check your network connection.')
            return false
          }).then((res) => {
            console.log('heree2', res)
            if (res) {
              this.$router.push('/')
            }
            this.setErr(true, 'Oops! Signin failed. Please check your network connection.')
          }).catch(err => {
            console.log(err)
            this.setErr(true, 'Oops! Signin failed. Please check your network connection.')
          })
      }
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.getIsUserLoggedIn
    }
  },
  watch: {
    isUserLoggedIn () {
      console.log(this.isUserLoggedIn)
      if (this.isUserLoggedIn) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
