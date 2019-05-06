export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (config.url.indexOf('o/token') === -1) {
      config.headers.common.Authorization =
        'Bearer ' + store.getters.accessToken
    }
  })
}
