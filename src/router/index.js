import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUpView.vue'
import LogIn from '../views/LoginView.vue'
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
          path: 'signup',
          name: 'signup',
          component: SignUp
        },
        {
          path: 'login',
          name: 'login',
          component: LogIn
        }
      ]
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true }
    }
  ]
})


router.beforeEach((to) => {
  const store = useUserStore()
  const isLoggedIn = store.user != null;

  if(to.meta.requiresAuth && !isLoggedIn){
    return {
      path: '/auth/login',
      query: { redirect: to.fullPath}
    }
  } 
})

export default router

/* //Check user if Logged  In

let  isLoggedIn = false;

const store = useUserStore();

const checkUser = async () => {
  await store.fetchUser()
  const user = store.$state.user
  console.log(user.id)

  if (user != false){
    isLoggedIn = true
  }
}
checkUser() */