<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const checkUser = async () => {
  await store.fetchUser()
  const user = store.$state.user
  console.log(user.id)
}
checkUser()

</script>

<template>
  <nav>
    <div>
    <router-link to="auth">Enter</router-link>
     </div>
    <router-link to="logIn">Log In</router-link>
  </nav>


  <RouterView />
</template>

<style></style>
