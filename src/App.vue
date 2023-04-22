<script setup>
import { useUserStore } from '@/stores/user'
import NavigationBar from './components/NavigationBar.vue';

const store = useUserStore()

const checkUser = async () => {
  await store.fetchUser()
  const user = store.$state.user
  console.log(user)
}
checkUser()

</script>

<template>
  <NavigationBar />
  <RouterView />
</template>

<style></style>

