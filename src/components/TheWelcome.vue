<template>
    <div>
        <h2>Welcome <span>{{ name[0] }}</span></h2>
    </div>
    <div>
        <TaskList />
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import TaskList from '../components/TaskList.vue'

const store = useUserStore()
const name = store.user.email.split("@")

</script>


<style>
span {
    color: hsla(160, 80%, 37%, 1);
}
</style>
