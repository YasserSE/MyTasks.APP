<template>
    <form @keyup.enter="handleCreate" @submit.prevent>
        <label>New task:</label><input type="text" v-model="taskTitle">
    </form>
    <main>
        <div>
            <h3>Open Tasks</h3>
            <div v-for="task in tasks" :key="task.id"  class="taskCard">
                <p>{{ task.title }}</p>
                <button v-on.click.prevent="handleComplete" class="status--Pending" v-if="!task.is_complete">Pending</button>
                <button class="status--Complete" v-if="task.is_complete">Completed</button>
            </div>
        </div>
        <div>
            <h3>Completed Tasks</h3>
            
        </div>
    </main>
</template>

<script setup>
import { useTaskStore } from '../stores/tasks'
import { useUserStore } from '../stores/user'
import { onMounted, ref, computed } from 'vue'

//Variables
const store = useTaskStore()
const userStore = useUserStore()
const taskTitle = ref()
const tasks = computed(()=> store.tasks)

//Functions
const handleCreate = async () =>{
    try {
        await store.addTask(taskTitle.value, userStore.user.id)
        console.log(tasks)
    } catch (error) {
        console.log(error)
    }
    resetForm()
}
const resetForm = () => {
    taskTitle.value = ""
}

const handleComplete = async () =>{
    console.log("hi")
}


//Lifecycle
onMounted( async () => {
    try {
        await store.fetchTasks()
        console.log(tasks)
    } catch (error) {
        console.log('error de llamada Fetch')
        throw error
    }
})
</script>

<style scoped>
main {
    display: flex;
    justify-content: space-between;
}
main div {
    width: 47%;
    background-color: #232323;
    border-radius: 15px;
    padding: 10px 20px;
}
ol {
    list-style: circle;
    margin-left: 20px;
    margin-top: 20px;
}
.taskCard {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: #343434;
    margin: 10px 0px;
}

button {
    background-color: #F9F9F9;
    padding: 5px 10px;
    border: 0px;
    border-radius: 15px;
}
form {
    padding: 30px 0px;
}
input {
    margin-left: 10px;
    border-radius: 15px;
    padding: 2px;
}
.status--Complete{
    background-color: #3b8cf5;
}
</style>