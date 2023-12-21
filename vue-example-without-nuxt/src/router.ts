import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/userStore'
import loginViewVue from './views/loginView.vue'
import loggedInViewVue from './views/loggedInView.vue'
import unauthorizedViewVue from './views/error/unauthorizedView.vue'
import notfoundViewVue from './views/error/404View.vue'

const routes = [
  { path: '/', component: loginViewVue },
  { path: '/logged-in', component: loggedInViewVue, meta: { requiresAuth: true } },
  { path: '/unauthorized', component: unauthorizedViewVue },
  { path: '/:pathMatch(.*)*', component: notfoundViewVue }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, _, next) => {
  const { isLoggedIn } = useUserStore()
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: '/unauthorized' })
  } else {
    next(true)
  }
})

export default router
