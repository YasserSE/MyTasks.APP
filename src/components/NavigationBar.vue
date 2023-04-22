<template>
    <nav>
        <router-link to="/">Home</router-link>
        <div v-if="!store.user">
            <router-link to="/auth/login" class="marginRight">LogIn</router-link>
            <router-link to="/auth/signup">SignUp</router-link>
        </div>
        <div v-if="store.user">
            <div class="marginRight">
                <p>open tasks: <span>{{ openTasks }}</span></p> 
            </div>
            <router-link to="logout">Log out</router-link>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';

const store = useUserStore()
const openTasks = ref(0)

</script>

<style scoped>
nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0px 5%;
}

div {
    display: flex;
    width: fit-content;
    padding: 0;
    margin: 0;
    justify-content: space-around;
}

p {
    font-size: 0.5 rem;
}

span {
    color: hsla(160, 80%, 37%, 1);
}
.marginRight{
    margin-right: 15px;
}
</style>