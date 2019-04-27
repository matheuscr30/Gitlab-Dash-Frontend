export default function({ $axios }) {
  $axios.onRequest(config => {
    config.headers.common['PRIVATE-TOKEN'] = process.env.GITLAB_ACCESS_TOKEN
  })
}
