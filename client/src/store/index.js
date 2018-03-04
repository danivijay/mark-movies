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
    addToCollection ({commit, getters}, payload) {
      console.log(payload)
      getters.Api.post(`movies`, {
        movieId: payload.id,
        title: payload.title,
        imgUrl: payload.imgUrl,
        releaseDate: payload.releaseDate
      }).then(res => {
        commit('addToCollection', payload)
      }).catch(err => {
        console.log(err)
      })
    },
    removeFromCollection ({commit, getters}, payload) {
      const id = payload
      commit('removeFromCollection', id)
    },
    userSignUp ({commit, getters}, payload) {
      getters.Api.post(`user/signup`, {
        email: payload.email,
        password: payload.password
      }).catch(err => {
        console.log(err)
      })
    },
    userSignIn ({commit, getters}, payload) {
      getters.Api.post(`user/signin`, {
        email: payload.email,
        password: payload.password
      }).then(res => {
        commit('userSignIn', res.data.token)
      }).catch(err => {
        console.log(err)
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
