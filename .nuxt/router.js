import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _56ebaec9 = () => interopDefault(import('../pages/about_us.vue' /* webpackChunkName: "pages/about_us" */))
const _3fce99b4 = () => interopDefault(import('../pages/artists/index.vue' /* webpackChunkName: "pages/artists/index" */))
const _47cad728 = () => interopDefault(import('../pages/blogs.vue' /* webpackChunkName: "pages/blogs" */))
const _db22277a = () => interopDefault(import('../pages/blogs.vue/index.vue' /* webpackChunkName: "pages/blogs.vue/index" */))
const _466212f7 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _fe17ff90 = () => interopDefault(import('../pages/create/index.vue' /* webpackChunkName: "pages/create/index" */))
const _24e8aee5 = () => interopDefault(import('../pages/e1t1/index.vue' /* webpackChunkName: "pages/e1t1/index" */))
const _6e2b2d7a = () => interopDefault(import('../pages/help.vue' /* webpackChunkName: "pages/help" */))
const _b3e7d500 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6887a303 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _46903a94 = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _4a7c9369 = () => interopDefault(import('../pages/passwordrenew.vue' /* webpackChunkName: "pages/passwordrenew" */))
const _4e1bf800 = () => interopDefault(import('../pages/referencefore1t1.vue' /* webpackChunkName: "pages/referencefore1t1" */))
const _52e9d948 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6c20f5d4 = () => interopDefault(import('../pages/setpassword.vue' /* webpackChunkName: "pages/setpassword" */))
const _5c2ee0dc = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _58e3924b = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _62d7460a = () => interopDefault(import('../pages/write_blog.vue' /* webpackChunkName: "pages/write_blog" */))
const _7ff647af = () => interopDefault(import('../pages/create/e1t1index.vue' /* webpackChunkName: "pages/create/e1t1index" */))
const _aba99edc = () => interopDefault(import('../pages/create/each1teach1.vue' /* webpackChunkName: "pages/create/each1teach1" */))
const _090424a6 = () => interopDefault(import('../pages/create/journey.vue' /* webpackChunkName: "pages/create/journey" */))
const _194a6dc8 = () => interopDefault(import('../pages/create/journeyindex.vue' /* webpackChunkName: "pages/create/journeyindex" */))
const _040e0e28 = () => interopDefault(import('../pages/create/learning.vue' /* webpackChunkName: "pages/create/learning" */))
const _f6e11ffe = () => interopDefault(import('../pages/create/website.vue' /* webpackChunkName: "pages/create/website" */))
const _237db92a = () => interopDefault(import('../pages/blogs.vue/_id.vue' /* webpackChunkName: "pages/blogs.vue/_id" */))
const _442f268d = () => interopDefault(import('../pages/e1t1/_id.vue' /* webpackChunkName: "pages/e1t1/_id" */))
const _47371b2e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _0f0482cc = () => interopDefault(import('../pages/_username.vue' /* webpackChunkName: "pages/_username" */))
const _3d427f62 = () => interopDefault(import('../pages/_username/index.vue' /* webpackChunkName: "pages/_username/index" */))
const _4c31d72c = () => interopDefault(import('../pages/_username/each1teach1/index.vue' /* webpackChunkName: "pages/_username/each1teach1/index" */))
const _0c818a06 = () => interopDefault(import('../pages/_username/journey.vue' /* webpackChunkName: "pages/_username/journey" */))
const _1e8f7a1b = () => interopDefault(import('../pages/_username/myhood.vue' /* webpackChunkName: "pages/_username/myhood" */))
const _2d247c65 = () => interopDefault(import('../pages/_username/notifications.vue' /* webpackChunkName: "pages/_username/notifications" */))

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
    component: _56ebaec9,
    name: "about_us"
  }, {
    path: "/artists",
    component: _3fce99b4,
    name: "artists"
  }, {
    path: "/blogs",
    component: _47cad728,
    name: "blogs"
  }, {
    path: "/blogs.vue",
    component: _db22277a,
    name: "blogs.vue"
  }, {
    path: "/contact",
    component: _466212f7,
    name: "contact"
  }, {
    path: "/create",
    component: _fe17ff90,
    name: "create"
  }, {
    path: "/e1t1",
    component: _24e8aee5,
    name: "e1t1"
  }, {
    path: "/help",
    component: _6e2b2d7a,
    name: "help"
  }, {
    path: "/login",
    component: _b3e7d500,
    name: "login"
  }, {
    path: "/logout",
    component: _6887a303,
    name: "logout"
  }, {
    path: "/onboarding",
    component: _46903a94,
    name: "onboarding"
  }, {
    path: "/passwordrenew",
    component: _4a7c9369,
    name: "passwordrenew"
  }, {
    path: "/referencefore1t1",
    component: _4e1bf800,
    name: "referencefore1t1"
  }, {
    path: "/register",
    component: _52e9d948,
    name: "register"
  }, {
    path: "/setpassword",
    component: _6c20f5d4,
    name: "setpassword"
  }, {
    path: "/settings",
    component: _5c2ee0dc,
    name: "settings"
  }, {
    path: "/test",
    component: _58e3924b,
    name: "test"
  }, {
    path: "/write_blog",
    component: _62d7460a,
    name: "write_blog"
  }, {
    path: "/create/e1t1index",
    component: _7ff647af,
    name: "create-e1t1index"
  }, {
    path: "/create/each1teach1",
    component: _aba99edc,
    name: "create-each1teach1"
  }, {
    path: "/create/journey",
    component: _090424a6,
    name: "create-journey"
  }, {
    path: "/create/journeyindex",
    component: _194a6dc8,
    name: "create-journeyindex"
  }, {
    path: "/create/learning",
    component: _040e0e28,
    name: "create-learning"
  }, {
    path: "/create/website",
    component: _f6e11ffe,
    name: "create-website"
  }, {
    path: "/blogs.vue/:id",
    component: _237db92a,
    name: "blogs.vue-id"
  }, {
    path: "/e1t1/:id",
    component: _442f268d,
    name: "e1t1-id"
  }, {
    path: "/",
    component: _47371b2e,
    name: "index"
  }, {
    path: "/:username",
    component: _0f0482cc,
    children: [{
      path: "",
      component: _3d427f62,
      name: "username"
    }, {
      path: "each1teach1",
      component: _4c31d72c,
      name: "username-each1teach1"
    }, {
      path: "journey",
      component: _0c818a06,
      name: "username-journey"
    }, {
      path: "myhood",
      component: _1e8f7a1b,
      name: "username-myhood"
    }, {
      path: "notifications",
      component: _2d247c65,
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
