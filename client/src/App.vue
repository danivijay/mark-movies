<template>
  <v-app dark>
    <v-toolbar
      app
    >
      <router-link to="/" tag="v-toolbar-title" style="cursor: pointer;">{{ title }}</router-link>
      <v-spacer></v-spacer>
      <v-btn to="/signin"
        v-if="!isUserLoggedIn"
        icon>
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn to="/signup"
        v-if="!isUserLoggedIn"
        icon>
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn
        v-if="isUserLoggedIn"
        @click="onSignOut"
        icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Mark Movies',
      searchVal: ''
    }
  },
  methods: {
    onSignOut () {
      this.$store.dispatch('userSignOut')
        .then(() => {
          this.$router.push('/')
        }).catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.getIsUserLoggedIn
    }
  }
}
</script>
