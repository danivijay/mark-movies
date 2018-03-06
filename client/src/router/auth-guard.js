import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.getIsUserLoggedIn) {
    next()
  } else {
    next('/signin')
  }
}
