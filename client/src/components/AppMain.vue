<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
        <v-card>
          <v-card-text>
            <v-text-field
              label="Search movies"
              v-model="searchVal"
              @keyup.enter="onSearch"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSearch"
            >Search</v-btn>
          </v-card-actions>
        </v-card>
        <item-card
          v-for="(movie, index) in movieCollection" :key="index"
          :id="movie.id"
          :title="movie.title"
          :imgUrl="movie.imgUrl"
          :releaseDate="movie.releaseDate"
        ></item-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      searchVal: ''
    }
  },
  computed: {
    movieCollection () {
      return this.$store.getters.getMovieCollection
    }
  },
  methods: {
    onSearch () {
      this.$router.push(`/search/${this.searchVal}`)
      console.log(this.searchVal)
    }
  },
  mounted () {
    if (!this.$store.getters.getIsUserLoggedIn) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
