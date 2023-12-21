import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from './Views/LoginView.vue'
import LoggedInViewVue from './Views/LoggedInView.vue'
import UnauthorizedViewVue from './Views/Error/UnauthorizedView.vue'
import NotfoundViewVue from './Views/Error/404View.vue'
import { useUserStore } from './stores/userStore'

const routes = [
  { path: '/', component: LoginViewVue },
  { path: '/logged-in', component: LoggedInViewVue, meta: { requiresAuth: true } },
  { path: '/unauthorized', component: UnauthorizedViewVue },
  { path: '/:pathMatch(.*)*', component: NotfoundViewVue }
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
