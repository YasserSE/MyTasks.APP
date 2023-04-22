<template>
  <div class="titleAuth">
    <h1>Let's access the App</h1>
    <div class="authViewer">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import {  RouterView } from 'vue-router'

</script>


<style scoped>
 .titleAuth {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
 }
 .authViewer {
  margin-top: 30px;
 }
</style>