export default ({ store, redirect }) => {
  if (!store.state.isLoggedIn) {
    redirect('/')
    store.dispatch('redirectTopWithFlashMessage')
  }
}
