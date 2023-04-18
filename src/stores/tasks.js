import { defineStore } from "pinia"
import { ref } from "vue"
import supabase from "../supabase/index"


/* export default defineStore('tasks', {
   state() {
    return {
        taskList: [],
    }
   },
   actions: {
    async _fetchAllTasks() {      
        const { data, error } = await supabase
            .from('tasks')
            .select()
        if (error) {
            console.error(error)
            return
        }
        this.taskList = data
    }
   }
  }) */

  export const tasksStore = defineStore('tasks', () => {
    const taskList = ref([])

    async function _fetchAllTasks() {
        const { data, error } = await supabase
            .from('tasks')
            .select()
        if (error) {
            console.error(error)
            return
        }
        taskList.value = data
    }
  })