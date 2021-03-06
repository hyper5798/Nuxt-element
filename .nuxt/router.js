import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _1a34ea15 = () => import('..\\pages\\test.vue' /* webpackChunkName: "pages_test" */).then(m => m.default || m)
const _0ee5b6f6 = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */).then(m => m.default || m)
const _672bf319 = () => import('..\\pages\\device.vue' /* webpackChunkName: "pages_device" */).then(m => m.default || m)
const _1089c67a = () => import('..\\pages\\account.vue' /* webpackChunkName: "pages_account" */).then(m => m.default || m)
const _58bf462a = () => import('..\\pages\\chart.vue' /* webpackChunkName: "pages_chart" */).then(m => m.default || m)
const _3613afbc = () => import('..\\pages\\find.vue' /* webpackChunkName: "pages_find" */).then(m => m.default || m)
const _767442de = () => import('..\\pages\\log.vue' /* webpackChunkName: "pages_log" */).then(m => m.default || m)
const _19a68ae8 = () => import('..\\pages\\notify.vue' /* webpackChunkName: "pages_notify" */).then(m => m.default || m)
const _453e13df = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/test",
			component: _1a34ea15,
			name: "test"
		},
		{
			path: "/login",
			component: _0ee5b6f6,
			name: "login"
		},
		{
			path: "/device",
			component: _672bf319,
			name: "device"
		},
		{
			path: "/account",
			component: _1089c67a,
			name: "account"
		},
		{
			path: "/chart",
			component: _58bf462a,
			name: "chart"
		},
		{
			path: "/find",
			component: _3613afbc,
			name: "find"
		},
		{
			path: "/log",
			component: _767442de,
			name: "log"
		},
		{
			path: "/notify",
			component: _19a68ae8,
			name: "notify"
		},
		{
			path: "/",
			component: _453e13df,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
