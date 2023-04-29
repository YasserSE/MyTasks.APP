import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null
  }),
  getters:{
    openTasks(state) {
      return state.tasks.filter(task => !task.is_complete)
    }
  },
  actions: {
    async fetchTasks() {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select()
        .order('id', { ascending: false })
      this.tasks = tasks
      if (error) throw error
    },
    async addTask(title, user_id) {
      const { data: [task], error } = await supabase
      .from('tasks')
      .insert({ title, user_id })
      .select()
      if (error) throw error
      if(task) this.tasks.push(task)
    },
    async completeTask(taskId, index) {
      const { data: [task], error} = await supabase
      .from('tasks')
      .update({is_complete: true})
      .eq('id', taskId )
      .select()
      if (error) throw error
      if (task) this.tasks[index] = task
    },
    async incompleteTask(taskId, index) {
      const { data: [task], error} = await supabase
      .from('tasks')
      .update({is_complete: false})
      .eq('id', taskId )
      .select()
      if (error) throw error
      if (task) this.tasks[index] = task
    },
    async deleteTask(taskId) {
      const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      if(error) throw error
    },
    async updateTitle(taskId, index, title){
      console.log('entra funcion')
      console.log(title)
      const { data: [task], error} = await supabase
      .from('tasks')
      .update({title})
      .eq('id', taskId )
      .select()
      if (error) throw error
      if (task) this.tasks[index] = task
    },
  }
})
