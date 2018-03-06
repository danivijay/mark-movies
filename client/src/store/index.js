import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    isUserLoggedIn: false,
    movieCollection: [],
    idCollection: []
  },
  mutations: {
    loadCollection (state, payload) {
      for (let movie of payload) {
        if (!state.idCollection.includes(movie.id)) {
          state.idCollection.push(movie.id)
          state.movieCollection.push({
            id: movie.id,
            title: movie.title,
            imgUrl: movie.imgUrl,
            releaseDate: movie.releaseDate
          })
        }
      }
    },
    addToCollection (state, payload) {
      const id = payload.id
      console.log(id)
      if (state.idCollection.includes(id)) {
        return false
      }
      state.movieCollection.push(payload)
      state.idCollection.push(payload.id)
      return true
    },
    removeFromCollection (state, payload) {
      const id = payload
      state.movieCollection = state.movieCollection.filter(movie => movie.id !== id)
      const index = state.idCollection.indexOf(id)
      if (index > -1) {
        state.idCollection.splice(index, 1)
      }
    },
    userSignIn (state, payload) {
      state.token = payload
      state.isUserLoggedIn = true
    },
    userSignOut (state, payload) {
      state.token = null
      state.isUserLoggedIn = false
      state.movieCollection = []
      state.idCollection = []
    }
  },
  actions: {
    loadCollection ({commit, getters}) {
      return getters.Api.get(`movies`).then(res => {
        return commit('loadCollection', res.data.movies)
      }).then(() => {
        console.log('here in action')
        return true
      }).catch(err => {
        console.log('here in action err')
        console.log(err)
        return false
      })
    },
    addToCollection ({commit, getters}, payload) {
      return getters.Api.post(`movies`, {
        movieId: payload.id,
        title: payload.title,
        imgUrl: payload.imgUrl,
        releaseDate: payload.releaseDate
      }).then(res => {
        return commit('addToCollection', payload)
      }).then(() => {
        return true
      }).catch(err => {
        console.log(err)
        return false
      })
    },
    removeFromCollection ({commit, getters}, payload) {
      const id = payload
      return getters.Api.delete(`movies/${id}`, {
        email: payload.email,
        password: payload.password
      }).then(() => {
        return commit('removeFromCollection', id)
      }).catch(err => {
        console.log(err)
      })
    },
    userSignUp ({commit, getters}, payload) {
      return getters.Api.post(`user/signup`, {
        email: payload.email,
        password: payload.password
      }).then(() => {
        return true
      }).catch(err => {
        console.log(err)
        return false
      })
    },
    userSignIn ({commit, getters}, payload) {
      return getters.Api.post(`user/signin`, {
        email: payload.email,
        password: payload.password
      }).then(res => {
        return commit('userSignIn', res.data.token)
      }).then(() => {
        return true
      }).catch(err => {
        console.log('ho', err)
        return false
      })
    },
    userSignOut ({commit}) {
      commit('userSignOut')
    }
  },
  getters: {
    getMovieCollection (state) {
      return state.movieCollection.sort((a, b) => a.releaseDate > b.releaseDate)
    },
    getIdCollection (state) {
      return state.idCollection.sort((a, b) => a > b)
    },
    getIsUserLoggedIn (state) {
      return state.isUserLoggedIn
    },
    Api (state) {
      const params = {
        baseURL: `http://localhost:3000`
      }
      if (state.token) {
        params.headers = {
          Authorization: `Bearer ${state.token}`
        }
      }
      return axios.create(params)
    }
  }
})
