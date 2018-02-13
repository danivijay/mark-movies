import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    movieCollection: []
  },
  mutations: {
    addToCollection (state, payload) {
      state.movieCollection.push(payload)
    },
    removeFromCollection (state, payload) {
      const id = payload
      state.movieCollection = state.movieCollection.filter(movie => movie.id !== id)
    }
  },
  actions: {
    addToCollection ({commit, getters}, payload) {
      commit('addToCollection', payload)
    },
    removeFromCollection ({commit, getters}, payload) {
      const id = payload
      commit('removeFromCollection', id)
    }
  },
  getters: {
    getMovieCollection (state) {
      return state.movieCollection.sort((a, b) => a.releaseDate > b.releaseDate)
    }
  }
})
