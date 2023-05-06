<template>
    <div class="authDiv">
        <h3>Sign Up</h3>
        <form @submit.prevent="handleSubmit()" id="authForm">
            <div>
                <label>Email</label><input class="input--whiteBack" id="email" type="email" v-model="email" required>
            </div>
            <div>
                <label>Password</label><input class="input--whiteBack" type="password" id="password" v-model="password
                " required>
            </div>
            <div>
                <label>Confirm password</label><input class="input--whiteBack" type="password" id="passwordConfirm" v-model="passConfirm" required>
            </div>
            <v-btn variant="tonal" type="submit" class="authBtn">
                Create account
            </v-btn>
        </form>
        <v-divider color="success"></v-divider>
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
    width: 70vw;
    max-width: 500px;
    align-items: center;
    flex-direction: column;
    background-color: #1F1F1F;
    padding: 30px;
    border-radius: 15px;
}

#authForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: 30px;
}
.authBtn{
    margin: 15px 0px;
}
</style>