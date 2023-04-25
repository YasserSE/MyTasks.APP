<template>
    <div class="authDiv">
        <h3>Sign Up</h3>
        <form @submit.prevent="handleSubmit()" id="authForm">
            <div>
                <label>Email</label><input id="email" type="email" v-model="email" required>
            </div>
            <div>
                <label>Password</label><input type="password" id="password" v-model="password
                " required>
            </div>
            <div>
                <label>Confirm password</label><input type="password" id="passwordConfirm" v-model="passConfirm" required>
            </div>
            <button type="submit">Register</button>
        </form>
        <p>Do you already have an account? <router-link to="/auth/login">Log in here.</router-link></p>
    </div>
</template>


<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';

//Data variables
const router = useRouter()
const email = ref(null)
const password = ref(null)
const passConfirm = ref(null)
const store = useUserStore()


// Register Function
const handleSubmit = async () => {
    console.log("hola")
    if (passConfirm.value === password.value) {
        try {
            await store.signUp(email.value, password.value)
            console.log("funciona router")
            router.push({ path: '/'})
        } catch (error) {
            alert(error)
            console.log("error")
        }
    } else {
        alert('Please match your passwords')
    }
    resetInput()
}
//Complementary functions
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