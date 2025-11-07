import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Categories from '../views/Categories.vue'
import StudyMode from '../views/StudyMode.vue'
import Statistics from '../views/Statistics.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/study/:categoryId',
      name: 'study',
      component: StudyMode,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { requiresGuest: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Aguarda inicialização do auth
  if (!authStore.initialized) {
    let handled = false
    
    const checkInit = setInterval(() => {
      if (authStore.initialized && !handled) {
        clearInterval(checkInit)
        handled = true
        handleNavigation()
      }
    }, 100)
    
    setTimeout(() => {
      if (!handled) {
        clearInterval(checkInit)
        handled = true
        handleNavigation()
      }
    }, 2000)
  } else {
    handleNavigation()
  }

  function handleNavigation() {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

    if (requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (requiresGuest && authStore.isAuthenticated) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  }
})

export default router
