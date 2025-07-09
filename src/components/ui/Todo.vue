<template>
  <section class="container mx-auto">
    <div class="flex flex-row justify-between">
      <div class="text-2xl">TODO List</div>
      <button class="btn btn-soft btn-warning" @click="logOut">Log Out</button>
    </div>
    <div class="my-2">
      <input v-model.trim="todoInput" type="text" class="input mr-2" @keydown.enter="addTodo"/>
      <button class="btn btn-soft btn-secondary" @click="addTodo" :disabled="!todoInput">Add</button>
    </div>
    <div class="divider"></div>
    <ul class="list bg-base-100 rounded-box shadow-md">
      <TodoItem 
        :key="todo.id" 
        :todo="todo" 
        v-for="todo in todos"
      />
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { getToken } from '@/utils/token.js';
import TodoItem from './TodoItem.vue';
import { useTodoStore } from '@/stores/TodoStore.js'
import { storeToRefs } from "pinia";
import { removeToken } from '@/utils/token.js'

axios.defaults.headers.common["Authorization"] = getToken();

const todoInput = ref('');
const store = useTodoStore();
const { todos } = storeToRefs(store);

const emits = defineEmits(['go-login'])

onMounted(async() => {
  const resp = await axios.get('https://todoo.5xcamp.us/todos');
  todos.value = resp.data.todos
})

const addTodo = () => {
  store.addTodo(todoInput.value)
  todoInput.value = ''
}

const logOut = () => {
  removeToken();
  emits('go-login')
}
</script>

