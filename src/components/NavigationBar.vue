<template>
    <nav>
        <router-link to="/"><img src="../assets/taskapp.png" class="navLogo"></router-link>
        <div v-if="!store.user">
            <router-link to="/auth/login" class="marginRight">LogIn</router-link>
            <router-link to="/auth/signup">SignUp</router-link>
        </div>
        <div v-if="store.user">
            <div class="marginRight">
                <p>open tasks: <span>{{ openTasks.length  }}</span></p> 
            </div>
            <button v-on:click.prevent="handleLogOut">Log out</button>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink, useRouter} from 'vue-router';
import { useUserStore } from '@/stores/user'
import { computed } from 'vue';
import { useTaskStore } from '../stores/tasks'

//Data variables
const store = useUserStore()
const router = useRouter()
const taskStore = useTaskStore()
const openTasks = computed(() => taskStore.openTasks)


//Functions
const handleLogOut = async () => {
    console.log("Entra a boton")
    try {
        await store.logOut()
        console.log("entra a try")
        router.push({ name: "login"})
    } catch (error) {
        alert(error)
        console.log("Error entra a catch")
    }
}
</script>

<style scoped>
.navLogo{
    width: 100px;
}
nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0px 5%;
    margin-bottom: 20px;
}

div {
    display: flex;
    width: fit-content;
    padding: 0;
    margin: 0;
    align-items: center;
}

p {
    font-size: 0.5 rem;
}

span {
    color: hsla(160, 90%, 37%, 1);
}
button {
    background-color: hsla(160, 80%, 37%, 1);
    padding: 5px 10px;
    border: 0px;
    border-radius: 15px;
}
button:hover {
    background-color: hsla(160, 100%, 38%, 1);
}
.marginRight{
    margin-right: 15px;
}
</style>