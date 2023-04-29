<template>
    <form @keyup.enter="handleCreate" @submit.prevent>
        <label>New task:</label><input class="formInput" type="text" v-model="taskTitle">
    </form>
    <main>
        <div class="taskContainer">
            <h3>Open Tasks</h3>
            <div v-for="(task, index) in tasks" :key="task.id" class="taskFather">
                <div class="taskCard" v-if="!task.is_complete">
                    <input  class="noEditing" contenteditable @keyup.enter="updateContent(task, index)" v-model="task.title"/>
                    <div class="noStyle">
                        <button v-on:click.prevent="handleComplete(task, index)" class="status--Pending">Pending</button>
                        <button v-on:click.prevent="handleDelete(task,index)" class="deleteButton">x</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="taskContainer">
            <h3>Completed Tasks</h3>
            <div v-for="(task, index) in tasks" :key="task.id" class="taskFather">
                <div class="taskCard" v-if="task.is_complete">
                    <p>{{ task.title }}</p>
                    <div class="noStyle">
                        <button v-on:click.prevent="handleIncomplete(task, index)" class="status--Complete">Done</button>
                        <button v-on:click.prevent="handleDelete(task,index)" class="deleteButton">x</button>
                     </div>
                </div>
            </div>
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
    } catch (error) {
        alert(error)
    }
    resetForm()
}
const resetForm = () => {
    taskTitle.value = ""
}

const handleComplete = async (task, index) =>{
    try {
        await store.completeTask(task.id, index)
    } catch (error){
        alert(error)
    }
}

const handleIncomplete = async (task, index) => {
    try {
        await store.incompleteTask(task.id, index)
    } catch(error){
        alert(error)
    }
}

const handleDelete = async (task) => {
    try { 
        await store.deleteTask(task.id)
        await store.fetchTasks()
    } catch(error){
        alert(error)
    }
}
const updateContent = async (task, index) => {
    try {
        await store.updateTitle(task.id, index, task.title)
    }   catch(error){
        alert(error)
    }
}
/* const handleFocus = (event) => {
    const {target} = event
    target.classList.toggle('noEditing')
} */


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
.taskContainer {
    width: 47%;
    background-color: #232323;
    border-radius: 15px;
    padding: 10px 15px;
}
div {
    background-color: #232323;
    border-radius: 15px;
    padding: 0px;
}
.taskCard {
    display: flex;
    justify-content: space-between;
    background-color: #343434;
    margin: 10px 0px;
    padding: 6px 10px;
    flex-wrap: wrap;
}

button {
    background-color: #F9F9F9;
    padding: 5px 10px;
    border: 0px;
    border-radius: 15px;
    font-size: 0.8em;
}
.status--Pending:hover {
    background-color: #40CF8E;
}
form {
    padding: 30px 0px;
}
.formInput {
    margin-left: 10px;
    border-radius: 15px;
    padding: 2px;
}
.status--Complete{
    background-color: #3b8cf5;
}
.noStyle {
    background-color: #343434;
    padding: 0px;
    margin: 0px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.deleteButton {
    padding: 1px 4px;
    margin-left: 5px;
    border-radius: 50px;
    font-size: 0.8em;
}
.deleteButton:hover {
    background-color: #f4341ad9;
}
.noEditing {
    pointer-events: none;
    background-color: transparent;
    border: none;
    color: white;
    margin: 0;
    width: 50%
}
.noEditing:focus-visible {
    outline: none;
}
</style>