<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
        <item-card
          v-for="movie in movieCollection" :key="movie.id"
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
  computed: {
    movieCollection () {
      return this.$store.getters.getMovieCollection
    }
  }
}
</script>

<style>

</style>
