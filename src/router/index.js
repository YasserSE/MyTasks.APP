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

router.beforeEach(async (to) => {
  const store = useUserStore()

  if (store.user === undefined) {
    await store.fetchUser()
  }

  console.log('beforeEach')
  console.log(store.user)
  
  if (to.meta.requiresAuth && store.user === null) {
    return { name: 'login' }
  }
  if ((to.name === 'login' || to.name === 'signup') && store.user !== null) {
    return { name: 'Home' }
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
