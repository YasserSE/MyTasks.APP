<template>
    <form @submit.prevent="handleCreate">
        <label>New task:</label><input class="formInput" type="text" v-model="taskTitle">
        <button type="submit" class="btn--taskCreate">Create</button>
    </form>
    <main>
        <div class="taskContainer">
            <h3>Open Tasks</h3>
            <div v-for="(task, index) in tasks" :key="task.id" class="taskFather">
                <div class="taskCard" v-if="!task.is_complete">
                    <textarea rows="2" cols="1" class="noEditing" contenteditable v-model="task.title" />
                    <div class="noStyle">
                        <button v-on:click.prevent="updateContent(task, index)">Update</button>
                        <button v-on:click.prevent="handleComplete(task, index)" class="btn--Pending">Done</button>
                        <button v-on:click.prevent="handleDelete(task, index)" class="deleteButton">Delete</button>
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
                        <button v-on:click.prevent="handleIncomplete(task, index)" class="status--Complete">Re-Do</button>
                        <button v-on:click.prevent="handleDelete(task, index)" class="deleteButton">Delete</button>
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
const tasks = computed(() => store.tasks)

//Functions
const handleCreate = async () => {
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

const handleComplete = async (task, index) => {
    try {
        await store.completeTask(task.id, index)
    } catch (error) {
        alert(error)
    }
}

const handleIncomplete = async (task, index) => {
    try {
        await store.incompleteTask(task.id, index)
    } catch (error) {
        alert(error)
    }
}

const handleDelete = async (task) => {
    try {
        await store.deleteTask(task.id)
        await store.fetchTasks()
    } catch (error) {
        alert(error)
    }
}
const updateContent = async (task, index) => {
    try {
        await store.updateTitle(task.id, index, task.title)
    } catch (error) {
        alert(error)
    }
}
/* const handleFocus = (event) => {
    const {target} = event
    target.classList.toggle('noEditing')
} */


//Lifecycle
onMounted(async () => {
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
    padding: 10px 15px 30px 15px;
}

div {
    background-color: #232323;
    border-radius: 15px;
    padding: 0px;
}

.taskCard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #343434;
    margin: 10px 0px;
    padding: 5px 10px 10px 10px;
}

.taskCard p {
    padding: 5px;
}

button {
    background-color: #F9F9F9;
    width: 20%;
    color: #232323;
    padding: 5px 10px;
    border: 0px;
    border-radius: 15px;
    font-size: 0.8em;
}

.btn--Pending {
    background-color: hsla(160, 80%, 37%, 1);
}

.btn--Pending :hover {
    background-color: rgb(2, 221, 148)''
}

form {
    padding: 30px 0px;
}

.formInput {
    margin: 0px 10px;
    border-radius: 10px;
    padding: 2px;
    width: 150px;
    background-color: rgba(255, 255, 255, 0.074);
}

.formInput:focus-visible {
    outline: none;
    background-color: #f8f8f8;
}

.status--Complete {
    background-color: #3b8cf5;
}

.noStyle {
    width: 100%;
    background-color: #343434;
    padding: 0px;
    margin: 0px;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    justify-content: space-evenly;
}

.deleteButton {
    padding: 1px 4px;
    border-radius: 50px;
    color: whitesmoke;
    background-color: #ff1e0089;
}

.deleteButton:hover {
    background-color: #f4341ad9;
}

.noEditing {
    pointer-events: none;
    background-color: transparent;
    border-radius: 15px;
    padding: 5px;
    border: none;
    color: white;
    margin: 0;
    width: 100%;
    resize: none;
}

.noEditing:focus-visible {
    outline: none;
    background-color: #767676;
}

@media only screen and (max-width: 600px) {
    main {
        flex-direction: column;
    }

    .taskContainer {
        width: 100%;
        margin-bottom: 40px;
    }

    .noStyle {
        justify-content: space-evenly;
    }
}</style>