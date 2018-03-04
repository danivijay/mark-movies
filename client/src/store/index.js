import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// TODO
// import Api from '@/services/Api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    movieCollection: [],
    idCollection: []
  },
  mutations: {
    addToCollection (state, payload) {
      const id = payload.id
      if (state.idCollection.includes(id)) {
        return false
      }
      state.movieCollection.push(payload)
      state.idCollection.push(payload.id)
    },
    removeFromCollection (state, payload) {
      const id = payload
      state.movieCollection = state.movieCollection.filter(movie => movie.id !== id)
      const index = state.idCollection.indexOf(id)
      if (index > -1) {
        state.idCollection.splice(index, 1)
      }
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
    },
    getIdCollection (state) {
      return state.idCollection.sort((a, b) => a > b)
    }
  }
})
