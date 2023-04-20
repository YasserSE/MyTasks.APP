<template>
    <h1>Sign Up to Task App</h1>
    <form @submit.prevent="handleSubmit && resetInput">
        <label>Email</label><input id="email" type="email" v-model="email">
        <label>Password</label><input type="password" id="password" v-model="password
        ">
        <button type="submit">Register</button>
    </form>
</template>


<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';

const email = ref(null)
const password = ref(null)

const store = useUserStore()

const handleSubmit = () => {
    store.signUp(email.value, password.value)
}
const resetInput = () => {
    email.value === ""
    password.value === ""
}

/* export default {
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
} */

</script>