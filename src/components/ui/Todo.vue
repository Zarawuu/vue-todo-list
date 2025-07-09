<template>
  <section class="container mx-auto">
    <h1 class="text-2xl">今天你想做些什麼事...</h1>
    <div class="my-2">
      <input v-model.trim="todoInput" type="text" class="input mr-2" @keydown.enter="addTodo"/>
      <button class="btn" @click="addTodo">新增</button>
    </div>
    <div class="divider"></div>
    <ul class="list bg-base-100 rounded-box shadow-md">
      <TodoItem 
        :key="todo.id" 
        :todo="todo" 
        @delete-todo="handleDelete"
        @toggle-todo="handleToggle"
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

axios.defaults.headers.common["Authorization"] = getToken();

const todoInput = ref('');
const todos = ref([]);

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

const handleDelete = async(todoId) => {
  try {
    const req = await axios.delete(`https://todoo.5xcamp.us/todos/${todoId}`);
    console.log(req)
    const index = todos.value.findIndex((t) => t.id === todoId);
    todos.value.splice(index, 1);
  } catch(err) {
    console.log(err)
  }
}

const handleToggle = async(todoId) => {
  const todo = todos.value.find((t) => t.id === todoId)

  if (todo.completed_at) {
    todo.completed_at = null
  } else {
    todo.completed_at = new Date().toLocaleString()
  }

  try {
    const req = await axios.patch(`https://todoo.5xcamp.us/todos/${todoId}/toggle`);
  } catch(err) {
    console.log(err)
  }
}
</script>

