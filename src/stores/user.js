import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined
  }),
  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      this.user = user
    },
    async signUp(email, password) {
      const {
        data: { user },
        error
      } = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (error) throw error
      if (user) this.user = user
    },
    async logIn(email, password) {
      const {
        data: { user },
        error
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) throw error
      if (user) this.user = user
    },
    async logOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = null
    },
    async logInWithGoogle() {
      const { data: { user }, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if(error) throw error
      if (user) this.user = user
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
