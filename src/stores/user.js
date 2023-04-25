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
      console.log(user)

      this.user = user
    },
    async signUp(email, password) {
      const { data: { user }, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (error) throw error
      if (user) this.user = user
      console.log('Funciona')
    },
    async logIn(email, password){
      const { data: { user }, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      if (user) this.user = user
      console.log(this.user)
      console.log("Logged in")
    },
    async logOut() {
      const { error } = await supabase.auth.signOut()
      if ( error ) throw error
      console.log("Logged out")
      this.user = null
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
