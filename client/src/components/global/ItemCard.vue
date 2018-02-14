<template>
  <v-card color="purple" class="white--text mt-2">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs7>
          <div>
            <div class="headline">{{ title }}</div>
            <div>{{ releaseDate }}</div>
          </div>
            <v-btn
            v-if="$store.getters.getIdCollection.includes(id)"
            @click="removeFromCollection"
            right
            top>
              <v-icon left>remove_circle</v-icon>Remove
            </v-btn>
            <v-btn
            v-if="!$store.getters.getIdCollection.includes(id)"
            @click="addToCollection"
            right
            top>
              <v-icon left>add_circle</v-icon>Add
            </v-btn>
        </v-flex>
        <v-flex xs5>
            <v-card-media
              :src="'https://image.tmdb.org/t/p/w500/' + imgUrl"
              height="125px"
              contain
            ></v-card-media>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['id', 'title', 'imgUrl', 'releaseDate'],
  methods: {
    addToCollection () {
      const movieInfo = {
        id: this.id,
        title: this.title,
        imgUrl: this.imgUrl,
        releaseDate: this.releaseDate
      }
      this.$store.dispatch('addToCollection', movieInfo)
    },
    removeFromCollection () {
      this.$store.dispatch('removeFromCollection', this.id)
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
