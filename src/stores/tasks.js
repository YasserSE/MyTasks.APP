import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null
  }),
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
    async deleteTask() {},
    async updateTask() {}
  }
})
