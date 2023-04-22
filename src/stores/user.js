import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      this.user = user
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (error) throw error
      if (user) this.user = user
      console.log('Funciona')
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
})
