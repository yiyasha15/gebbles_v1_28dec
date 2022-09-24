import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5a668f6c = () => interopDefault(import('../pages/artists/index.vue' /* webpackChunkName: "pages/artists/index" */))
const _c07103da = () => interopDefault(import('../pages/attending-events.vue' /* webpackChunkName: "pages/attending-events" */))
const _2c58404c = () => interopDefault(import('../pages/blogs.vue' /* webpackChunkName: "pages/blogs" */))
const _af938f32 = () => interopDefault(import('../pages/blogs.vue/index.vue' /* webpackChunkName: "pages/blogs.vue/index" */))
const _3d39c31b = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _6a4e72d8 = () => interopDefault(import('../pages/create/index.vue' /* webpackChunkName: "pages/create/index" */))
const _1a849212 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _7ac35c41 = () => interopDefault(import('../pages/e1t1/index.vue' /* webpackChunkName: "pages/e1t1/index" */))
const _36934671 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _0c96444e = () => interopDefault(import('../pages/help/index.vue' /* webpackChunkName: "pages/help/index" */))
const _eeb9a800 = () => interopDefault(import('../pages/invited-events.vue' /* webpackChunkName: "pages/invited-events" */))
const _3c7a0c70 = () => interopDefault(import('../pages/journeys.vue' /* webpackChunkName: "pages/journeys" */))
const _6ab6129a = () => interopDefault(import('../pages/learning.vue' /* webpackChunkName: "pages/learning" */))
const _eacd02b8 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _15a75e5f = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _5608e931 = () => interopDefault(import('../pages/mentioned-videos.vue' /* webpackChunkName: "pages/mentioned-videos" */))
const _c72a3020 = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _e9016dfe = () => interopDefault(import('../pages/organised-events.vue' /* webpackChunkName: "pages/organised-events" */))
const _3d30988d = () => interopDefault(import('../pages/passwordrenew.vue' /* webpackChunkName: "pages/passwordrenew" */))
const _d73462fa = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _8aad3090 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _5cc81810 = () => interopDefault(import('../pages/setpassword.vue' /* webpackChunkName: "pages/setpassword" */))
const _404d3538 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _3f86d1d7 = () => interopDefault(import('../pages/sharing.vue' /* webpackChunkName: "pages/sharing" */))
const _0cc37eb2 = () => interopDefault(import('../pages/subscription.vue' /* webpackChunkName: "pages/subscription" */))
const _6aef99c2 = () => interopDefault(import('../pages/terms.vue' /* webpackChunkName: "pages/terms" */))
const _d9ad562c = () => interopDefault(import('../pages/whatiscooking/index.vue' /* webpackChunkName: "pages/whatiscooking/index" */))
const _246f0a57 = () => interopDefault(import('../pages/write_blog.vue' /* webpackChunkName: "pages/write_blog" */))
const _73e6faa6 = () => interopDefault(import('../pages/your-videos.vue' /* webpackChunkName: "pages/your-videos" */))
const _7173c001 = () => interopDefault(import('../pages/artists/legacy.vue' /* webpackChunkName: "pages/artists/legacy" */))
const _0da0c1ee = () => interopDefault(import('../pages/create/each1teach1.vue' /* webpackChunkName: "pages/create/each1teach1" */))
const _bbe17f72 = () => interopDefault(import('../pages/create/events.vue' /* webpackChunkName: "pages/create/events" */))
const _6cd0c402 = () => interopDefault(import('../pages/create/journey.vue' /* webpackChunkName: "pages/create/journey" */))
const _6414fd7c = () => interopDefault(import('../pages/create/legacy-porfolio.vue' /* webpackChunkName: "pages/create/legacy-porfolio" */))
const _70dd915c = () => interopDefault(import('../pages/create/uploadvideo.vue' /* webpackChunkName: "pages/create/uploadvideo" */))
const _2f47e146 = () => interopDefault(import('../pages/create/website.vue' /* webpackChunkName: "pages/create/website" */))
const _3f1b3c35 = () => interopDefault(import('../pages/create/workshop.vue' /* webpackChunkName: "pages/create/workshop" */))
const _4b7b26cd = () => interopDefault(import('../pages/help/getting_started.vue' /* webpackChunkName: "pages/help/getting_started" */))
const _6a11eac3 = () => interopDefault(import('../pages/help/issues.vue' /* webpackChunkName: "pages/help/issues" */))
const _4bf1b943 = () => interopDefault(import('../pages/help/thoughts.vue' /* webpackChunkName: "pages/help/thoughts" */))
const _2db2ba11 = () => interopDefault(import('../pages/help/updates.vue' /* webpackChunkName: "pages/help/updates" */))
const _3e15aee2 = () => interopDefault(import('../pages/blogs.vue/_id.vue' /* webpackChunkName: "pages/blogs.vue/_id" */))
const _1042bc09 = () => interopDefault(import('../pages/e1t1/_uuid.vue' /* webpackChunkName: "pages/e1t1/_uuid" */))
const _67dab38e = () => interopDefault(import('../pages/events/_uuid.vue' /* webpackChunkName: "pages/events/_uuid" */))
const _28a8b4b2 = () => interopDefault(import('../pages/whatiscooking/_uuid.vue' /* webpackChunkName: "pages/whatiscooking/_uuid" */))
const _7e1c48e6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _a29e8c20 = () => interopDefault(import('../pages/_username.vue' /* webpackChunkName: "pages/_username" */))
const _11b3e71a = () => interopDefault(import('../pages/_username/index.vue' /* webpackChunkName: "pages/_username/index" */))
const _51239ca4 = () => interopDefault(import('../pages/_username/about.vue' /* webpackChunkName: "pages/_username/about" */))
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
    path: "/artists",
    component: _5a668f6c,
    name: "artists"
  }, {
    path: "/attending-events",
    component: _c07103da,
    name: "attending-events"
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
    path: "/dashboard",
    component: _1a849212,
    name: "dashboard"
  }, {
    path: "/e1t1",
    component: _7ac35c41,
    name: "e1t1"
  }, {
    path: "/events",
    component: _36934671,
    name: "events"
  }, {
    path: "/help",
    component: _0c96444e,
    name: "help"
  }, {
    path: "/invited-events",
    component: _eeb9a800,
    name: "invited-events"
  }, {
    path: "/journeys",
    component: _3c7a0c70,
    name: "journeys"
  }, {
    path: "/learning",
    component: _6ab6129a,
    name: "learning"
  }, {
    path: "/login",
    component: _eacd02b8,
    name: "login"
  }, {
    path: "/logout",
    component: _15a75e5f,
    name: "logout"
  }, {
    path: "/mentioned-videos",
    component: _5608e931,
    name: "mentioned-videos"
  }, {
    path: "/onboarding",
    component: _c72a3020,
    name: "onboarding"
  }, {
    path: "/organised-events",
    component: _e9016dfe,
    name: "organised-events"
  }, {
    path: "/passwordrenew",
    component: _3d30988d,
    name: "passwordrenew"
  }, {
    path: "/privacy",
    component: _d73462fa,
    name: "privacy"
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
    path: "/sharing",
    component: _3f86d1d7,
    name: "sharing"
  }, {
    path: "/subscription",
    component: _0cc37eb2,
    name: "subscription"
  }, {
    path: "/terms",
    component: _6aef99c2,
    name: "terms"
  }, {
    path: "/whatiscooking",
    component: _d9ad562c,
    name: "whatiscooking"
  }, {
    path: "/write_blog",
    component: _246f0a57,
    name: "write_blog"
  }, {
    path: "/your-videos",
    component: _73e6faa6,
    name: "your-videos"
  }, {
    path: "/artists/legacy",
    component: _7173c001,
    name: "artists-legacy"
  }, {
    path: "/create/each1teach1",
    component: _0da0c1ee,
    name: "create-each1teach1"
  }, {
    path: "/create/events",
    component: _bbe17f72,
    name: "create-events"
  }, {
    path: "/create/journey",
    component: _6cd0c402,
    name: "create-journey"
  }, {
    path: "/create/legacy-porfolio",
    component: _6414fd7c,
    name: "create-legacy-porfolio"
  }, {
    path: "/create/uploadvideo",
    component: _70dd915c,
    name: "create-uploadvideo"
  }, {
    path: "/create/website",
    component: _2f47e146,
    name: "create-website"
  }, {
    path: "/create/workshop",
    component: _3f1b3c35,
    name: "create-workshop"
  }, {
    path: "/help/getting_started",
    component: _4b7b26cd,
    name: "help-getting_started"
  }, {
    path: "/help/issues",
    component: _6a11eac3,
    name: "help-issues"
  }, {
    path: "/help/thoughts",
    component: _4bf1b943,
    name: "help-thoughts"
  }, {
    path: "/help/updates",
    component: _2db2ba11,
    name: "help-updates"
  }, {
    path: "/blogs.vue/:id",
    component: _3e15aee2,
    name: "blogs.vue-id"
  }, {
    path: "/e1t1/:uuid",
    component: _1042bc09,
    name: "e1t1-uuid"
  }, {
    path: "/events/:uuid",
    component: _67dab38e,
    name: "events-uuid"
  }, {
    path: "/whatiscooking/:uuid",
    component: _28a8b4b2,
    name: "whatiscooking-uuid"
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
      path: "about",
      component: _51239ca4,
      name: "username-about"
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
