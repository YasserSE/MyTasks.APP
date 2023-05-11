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
        <p>Do you already have an account? <br><router-link to="/auth/login">Log in here.</router-link></p>
        <br>
        <div class="googleContainer">
            <button @click="handleGoogle" class="googleBtn">Register with <br><img class="googleImg" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"></button>
        </div>
    </div>
</template>


<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

//Data variables
const router = useRouter()
const email = ref(null)
const password = ref(null)
const passConfirm = ref(null)
const store = useUserStore()
const toast = useToast()


// Register Function
const handleSubmit = async () => {
    if (passConfirm.value === password.value) {
        try {
            await store.signUp(email.value, password.value)
            router.push({ path: '/'})
        } catch (error) {
            toast.error("There is a problem. Try again.",{
            timeout: 5000
        })
        }
    } else {
        toast.warning("Please match your password",{
            timeout: 5000
        })
    }
    resetInput()
}
const handleGoogle = async () => {
    try {
        await store.logInWithGoogle()
    } catch (error) {
        alert(error)
        console.log("error de Google Auth")
    }
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
.googleImg{
    padding: 5px;
    width: 45px;
}
.googleContainer{
    display: flex;
    align-items: center;
    align-self: center;
    align-content: center;
}
</style>