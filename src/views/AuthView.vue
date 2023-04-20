<template>
  <h1>Let's access the App</h1>
  <router-link to="SignUp">Signup Page</router-link>
  <router-link to="LogIn">Log In</router-link>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>


<style scoped>
</style>