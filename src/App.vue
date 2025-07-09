<template>
  <div class="p-4">
    <Todo 
      v-if="show == 'todo'" 
      @go-login="show = 'login'"
    />
    <LoginForm
      v-if="show == 'login'"
      @go_register="show = 'register'"
      @login_success="show = 'todo'"
    />
    <RegisterForm v-if="show == 'register'" @go_login="show = 'login'" />
  </div>
</template>

<script setup>
import RegisterForm from "./components/users/RegisterForm.vue"
import LoginForm from "./components/users/LoginForm.vue"
import Todo from "./components/ui/Todo.vue"
import { STORAGE_KEY } from "./constants"

import { ref, onMounted } from "vue"

const show = ref("login")

onMounted(() => {
  const token = localStorage.getItem(STORAGE_KEY)

  if (token) {
    show.value = "todo"
  }
})
</script>
