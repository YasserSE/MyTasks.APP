<template>
    <div>
        <h1>Welcome to your task tracker</h1>
        <h2 v-if="">{{ msg }}</h2>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { tasksStore } from '../stores/tasks'

export default {
    name: "SignUp",
    setup() {
        const email = ref(null);
        const password = ref(null);
        const confirmPassword = ref(null);
        const errorMsg = ref(null);
    },
    methods: {
        ...mapActions(tasksStore, ["_fetchAllTasks"]),
    },
    created() {
        this._fetchAllTasks;
        console.log("created sign up");
    },
}

</script>

<style scoped>
</style>