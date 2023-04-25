<template>
    <h2>Welcome <span>{{ store.user?.email }}</span></h2>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const store = useUserStore()

</script>


<style>
span {
        color: hsla(160, 80%, 37%, 1);
    }
</style>