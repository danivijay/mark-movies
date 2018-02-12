<template>
  <v-app dark>
    <v-toolbar
      app
    >
      <router-link to="/" tag="v-toolbar-title" v-if="!showSearch" style="cursor: pointer;">{{ title }}</router-link>
      <v-spacer v-if="!showSearch"></v-spacer>
      <v-text-field
        v-if="showSearch"
        v-model="searchVal"
        label="Search Movie"
        @keyup.enter="onSearch"
      >
      </v-text-field>
      <v-btn
        @click="showSearch = !showSearch"
        icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn to="/signup"
        icon>
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn to="/signin"
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
      showSearch: false,
      searchVal: ''
    }
  },
  methods: {
    onSearch () {
      this.$router.push(`/search/${this.searchVal}`)
      console.log(this.searchVal)
    }
  }
}
</script>
