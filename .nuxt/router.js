import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3b0a0325 = () => interopDefault(import('../pages/about_us.vue' /* webpackChunkName: "pages/about_us" */))
const _5a668f6c = () => interopDefault(import('../pages/artists/index.vue' /* webpackChunkName: "pages/artists/index" */))
const _2c58404c = () => interopDefault(import('../pages/blogs.vue' /* webpackChunkName: "pages/blogs" */))
const _af938f32 = () => interopDefault(import('../pages/blogs.vue/index.vue' /* webpackChunkName: "pages/blogs.vue/index" */))
const _3d39c31b = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _6a4e72d8 = () => interopDefault(import('../pages/create/index.vue' /* webpackChunkName: "pages/create/index" */))
const _7ac35c41 = () => interopDefault(import('../pages/e1t1/index.vue' /* webpackChunkName: "pages/e1t1/index" */))
const _3717afe4 = () => interopDefault(import('../pages/explore.vue' /* webpackChunkName: "pages/explore" */))
const _337a0fd6 = () => interopDefault(import('../pages/help.vue' /* webpackChunkName: "pages/help" */))
const _eacd02b8 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _15a75e5f = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _c72a3020 = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _3d30988d = () => interopDefault(import('../pages/passwordrenew.vue' /* webpackChunkName: "pages/passwordrenew" */))
const _1d839f48 = () => interopDefault(import('../pages/referencefore1t1.vue' /* webpackChunkName: "pages/referencefore1t1" */))
const _8aad3090 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _5cc81810 = () => interopDefault(import('../pages/setpassword.vue' /* webpackChunkName: "pages/setpassword" */))
const _404d3538 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _1e3274a7 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _246f0a57 = () => interopDefault(import('../pages/write_blog.vue' /* webpackChunkName: "pages/write_blog" */))
const _2318800b = () => interopDefault(import('../pages/create/e1t1index.vue' /* webpackChunkName: "pages/create/e1t1index" */))
const _0da0c1ee = () => interopDefault(import('../pages/create/each1teach1.vue' /* webpackChunkName: "pages/create/each1teach1" */))
const _6cd0c402 = () => interopDefault(import('../pages/create/journey.vue' /* webpackChunkName: "pages/create/journey" */))
const _02d13980 = () => interopDefault(import('../pages/create/journeyindex.vue' /* webpackChunkName: "pages/create/journeyindex" */))
const _70dd915c = () => interopDefault(import('../pages/create/uploadvideo.vue' /* webpackChunkName: "pages/create/uploadvideo" */))
const _2f47e146 = () => interopDefault(import('../pages/create/website.vue' /* webpackChunkName: "pages/create/website" */))
const _3e15aee2 = () => interopDefault(import('../pages/blogs.vue/_id.vue' /* webpackChunkName: "pages/blogs.vue/_id" */))
const _284d7ae9 = () => interopDefault(import('../pages/e1t1/_id.vue' /* webpackChunkName: "pages/e1t1/_id" */))
const _7e1c48e6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _a29e8c20 = () => interopDefault(import('../pages/_username.vue' /* webpackChunkName: "pages/_username" */))
const _11b3e71a = () => interopDefault(import('../pages/_username/index.vue' /* webpackChunkName: "pages/_username/index" */))
const _5fd40d50 = () => interopDefault(import('../pages/_username/each1teach1/index.vue' /* webpackChunkName: "pages/_username/each1teach1/index" */))
const _8a37e3be = () => interopDefault(import('../pages/_username/journey.vue' /* webpackChunkName: "pages/_username/journey" */))
const _7c9c9b12 = () => interopDefault(import('../pages/_username/myhood.vue' /* webpackChunkName: "pages/_username/myhood" */))
const _930136ee = () => interopDefault(import('../pages/_username/notifications.vue' /* webpackChunkName: "pages/_username/notifications" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about_us",
    component: _3b0a0325,
    name: "about_us"
  }, {
    path: "/artists",
    component: _5a668f6c,
    name: "artists"
  }, {
    path: "/blogs",
    component: _2c58404c,
    name: "blogs"
  }, {
    path: "/blogs.vue",
    component: _af938f32,
    name: "blogs.vue"
  }, {
    path: "/contact",
    component: _3d39c31b,
    name: "contact"
  }, {
    path: "/create",
    component: _6a4e72d8,
    name: "create"
  }, {
    path: "/e1t1",
    component: _7ac35c41,
    name: "e1t1"
  }, {
    path: "/explore",
    component: _3717afe4,
    name: "explore"
  }, {
    path: "/help",
    component: _337a0fd6,
    name: "help"
  }, {
    path: "/login",
    component: _eacd02b8,
    name: "login"
  }, {
    path: "/logout",
    component: _15a75e5f,
    name: "logout"
  }, {
    path: "/onboarding",
    component: _c72a3020,
    name: "onboarding"
  }, {
    path: "/passwordrenew",
    component: _3d30988d,
    name: "passwordrenew"
  }, {
    path: "/referencefore1t1",
    component: _1d839f48,
    name: "referencefore1t1"
  }, {
    path: "/register",
    component: _8aad3090,
    name: "register"
  }, {
    path: "/setpassword",
    component: _5cc81810,
    name: "setpassword"
  }, {
    path: "/settings",
    component: _404d3538,
    name: "settings"
  }, {
    path: "/test",
    component: _1e3274a7,
    name: "test"
  }, {
    path: "/write_blog",
    component: _246f0a57,
    name: "write_blog"
  }, {
    path: "/create/e1t1index",
    component: _2318800b,
    name: "create-e1t1index"
  }, {
    path: "/create/each1teach1",
    component: _0da0c1ee,
    name: "create-each1teach1"
  }, {
    path: "/create/journey",
    component: _6cd0c402,
    name: "create-journey"
  }, {
    path: "/create/journeyindex",
    component: _02d13980,
    name: "create-journeyindex"
  }, {
    path: "/create/uploadvideo",
    component: _70dd915c,
    name: "create-uploadvideo"
  }, {
    path: "/create/website",
    component: _2f47e146,
    name: "create-website"
  }, {
    path: "/blogs.vue/:id",
    component: _3e15aee2,
    name: "blogs.vue-id"
  }, {
    path: "/e1t1/:id",
    component: _284d7ae9,
    name: "e1t1-id"
  }, {
    path: "/",
    component: _7e1c48e6,
    name: "index"
  }, {
    path: "/:username",
    component: _a29e8c20,
    children: [{
      path: "",
      component: _11b3e71a,
      name: "username"
    }, {
      path: "each1teach1",
      component: _5fd40d50,
      name: "username-each1teach1"
    }, {
      path: "journey",
      component: _8a37e3be,
      name: "username-journey"
    }, {
      path: "myhood",
      component: _7c9c9b12,
      name: "username-myhood"
    }, {
      path: "notifications",
      component: _930136ee,
      name: "username-notifications"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
