const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')

let env
if (process.env.NODE_ENV === 'production') {
  env = require('./config/prod.env.js')
} else {
  env = require('./config/dev.env.js')
}

module.exports = {
  mode: 'universal',
  env: env,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'author', name: 'author', content: 'Matheus Cunha Reis' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/logo-ssys.svg' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css'
      }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#001e3e' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl', '~/assets/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/axios.js',
    '@/mixins/mixins.js',
    '@/plugins/vueXRouterSync.js',
    { src: '@/plugins/vueChartist.js', ssr: false },
    { src: '@/plugins/vueFullscreen.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: env.ROOT_API
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
