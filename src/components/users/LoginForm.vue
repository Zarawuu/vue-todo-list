<template>
  <section class="container mx-auto">
    <form class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label class="label mb-1">Email</label>
        <input v-model.trim="email" type="email" class="input" />
      </div>

      <div class="flex flex-col">
        <label class="label mb-1">Password</label>
        <input v-model.trim="password" type="password" class="input" @keydown.enter="login"/>
      </div>

      <div>
        <button 
          @click.prevent="login" 
          :disabled="!canLogin" 
          class="btn btn-soft btn-secondary"
        >
          Login
        </button>
      </div>
      <span>Don't have an account？
        <a class="hover:text-sky-700 btn-link" @click.prevent="$emit('go_register')" href="#">
          Go register!
        </a>
      </span>
    </form>
  </section>
</template>

<script setup>
import { ref, computed } from "vue"
import axios from "axios"
import { setToken } from '@/utils/token.js'

const emits = defineEmits(["go_register", "login_success"])

const email = ref("")
const password = ref("")
const canLogin = computed(() => {
  return email.value != "" && password.value != ""
})

const login = async () => {
  const formData = {
    user: {
      email: email.value,
      password: password.value,
    },
  }

  try {
    const resp = await axios.post(
      "https://todoo.5xcamp.us/users/sign_in",
      formData
    )
    const token = resp.headers.authorization
    setToken(token);
    clearAll()
    emits("login_success")
  } catch (err) {
    const message = err.response.data.message
    alert(message)
  }
}

const clearAll = () => {
  email.value = ""
  password.value = ""
}
</script>