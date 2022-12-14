import colors from 'vuetify/es5/util/colors'

export default {
  // mode: 'universal',
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + 'gebbles',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/gebbleslogo.png' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poiret+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,900&family=Sacramento&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
    //  loading: '~/components/Loading.vue',
  loading: { color: '#815A44' },
  /*
  ** Global CSS
  */
  css: ["~/assets/style.css", "~layouts/global.css",],
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
  { src: '~/plugins/vuex-persist', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module',
    //'@nuxtjs/prettier',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    // '@braid/vue-formulate/nuxt'
  ],
  /*
  ** Nuxt.js modules
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#e3c8b6',
          accent: '#e3c8b6',
          secondary: '#e3c8b6',
          info: '#e3c8b6',
          warning: '#af2f2f',
          error: '#af2f2f',
          success: colors.green.accent3,
          black: '#fff',
          white: '#000',
          dark_primary:'#815A44',
          teak:'#B48C6C',
          pearl:'#E7DBD3',
          background:'#121212',
          grey_background:'#424242'
        },
        light: {
          // background-color: '#ece0c7',
          background: '#f0e9da' ,
          grey_background:'#f0e9da',
          primary: '#815A44',
          //  #967259
          dark_primary:'#815A44',
          secondary: '#dbc1ac',
          accent: '#815A44',
          error: '#af2f2f',
          black: '#000000',
          white: '#f0e9da',
          teak:'#B48C6C',
          pearl:'#E7DBD3'
        },
      }
    }
  },
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // '@nuxtjs/auth',
    '@nuxtjs/auth-next',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://gruw80hfj5.execute-api.us-east-2.amazonaws.com/dev/api/',
    // credentials: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {},
    transpile:['vue-youtube-embed', 'vuex-persist', 'vue-instagram-embed'],
  },
  //nuxt auth module for authenticating users.
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'v1/auth/login/', method: 'post'},
          logout: {url: 'v1/auth/logout/', method: 'post'},
          user: { url: 'v1/auth/user/', method: 'get'  }
        },
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
          global: false

        },
        user: {
          property: false, // here should be `false`, as you defined in user endpoint `propertyName`
          autoFetch: true
        },
      }
    }
  }
}

const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
      }
    }
  },
}
// sometimes u cant see nuxt home page even if 
// it is running ---- change the network and port number in the package.json file 
//https://stackoverflow.com/questions/53909900/my-first-nuxt-js-app-is-refusing-to-run-on-localhost3000 
// also check https://nuxtjs.org/faq/host-port/