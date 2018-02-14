<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3 class="text-xs-right">
        <v-btn
          to="/"
          exact
          fab
          ><v-icon>arrow_back</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
        <h2>Searched for {{ $route.params.id }} ({{ searchRes.total_results }} results)</h2>
        <item-card
          v-for="movie in searchRes.results" :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :imgUrl="movie.poster_path"
          :releaseDate="movie.release_date"
          ></item-card>
        <!-- {{ this.searchRes }} -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppSearch',
  data () {
    return {
      searchRes: {}
    }
  },
  mounted () {
    this.searchRes = {}
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9200ceed89d1667573cd401e654a7372&language=en-US&query=${this.$route.params.id}&page=1&include_adult=false`)
      .then(res => {
        this.searchRes = res.data
      })
  }
}
</script>

<style>

</style>
