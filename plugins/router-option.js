export default async ({ app, store }) => {
  await app.router.afterEach(() => {
    store.commit('hideHamburgerNavigation')
  })
}
