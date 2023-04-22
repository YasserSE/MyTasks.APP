<template>
    <div class="authDiv">
        <h3>Log in</h3>
        <form @submit.prevent="handleSubmit && resetInput" id="authForm">
            <div>
                <label>Email</label><input id="email" type="email" v-model="email">
            </div>
            <div>
                <label>Password</label><input type="password" id="password" v-model="password
                ">
            </div>
            <button type="submit">Register</button>
        </form>
        <p>Don't have an account yet? <router-link to="/auth/signup">Create one here.</router-link></p>
    </div>
</template>


<script setup>
import { RouterLink } from 'vue-router';
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

</script>

<style scoped>
.authDiv {
    display: flex;
    width: 100%;
    flex-direction: column;
}
#authForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 30px;
}
</style>