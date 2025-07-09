<template>
  <section class="container mx-auto">
    <div class="flex flex-row justify-between">
      <div class="text-2xl">TODO List</div>
      <button class="btn btn-soft btn-warning" @click="logOut">Log Out</button>
    </div>
    <div class="my-2">
      <input v-model.trim="todoInput" type="text" class="input mr-2" @keydown.enter="addTodo"/>
      <button class="btn" @click="addTodo" :disabled="!todoInput">Add</button>
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

const addTodo = async() => {
  const content = todoInput.value
  if ( content !== '' ) {
    const formData = {
      todo: {
        content: content
      }
    }
    try {
      const uuid = crypto.randomUUID()
      todos.value.unshift({
        id: uuid,
        content: content,
        completed_at: null
      })
      todoInput.value = '';
      const { data } = await axios.post('https://todoo.5xcamp.us/todos', formData);
      const respTodo = todos.value.find((t) => t.id === uuid)
      respTodo.id = data.id
      console.log( todos.value )
    } catch ( err ) {
      console.log(err)
    }
  }
}

const logOut = () => {
  removeToken();
  emits('go-login')
}
</script>

