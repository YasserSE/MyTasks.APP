import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUpView.vue'
import LogIn from '../views/Login.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: '/signup',
          name: 'signup',
          component: SignUp
        },
        {
          path: '/login',
          name: 'login',
          component: LogIn
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
