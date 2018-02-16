<template>
  <v-app dark>
    <v-toolbar
      app
    >
      <router-link to="/" tag="v-toolbar-title" style="cursor: pointer;">{{ title }}</router-link>
      <v-spacer></v-spacer>
      <v-btn to="/signin"
        icon>
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn to="/signup"
        icon>
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn
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
  }
}
</script>
