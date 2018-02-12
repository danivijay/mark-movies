<template>
  <v-card color="purple" class="white--text">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs7>
          <div>
            <div class="headline">Halycon Days</div>
            <div>Ellie Goulding</div>
          </div>
            <v-btn
            right
            top>
              <v-icon left>remove_circle</v-icon>Remove
            </v-btn>
            <v-btn
            right
            top>
              <v-icon left>add_circle</v-icon>Add
            </v-btn>
        </v-flex>
        <v-flex xs5>
            <v-card-media
              src="https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg"
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

}
</script>

<style>

</style>
