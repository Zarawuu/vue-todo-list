import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from "axios";
import { getToken } from '@/utils/token.js';

axios.defaults.headers.common["Authorization"] = getToken();

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([]);

  const addTodo = async(todoInput) => {
    const content = todoInput
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
        const { data } = await axios.post('https://todoo.5xcamp.us/todos', formData);
        const respTodo = todos.value.find((t) => t.id === uuid)
        respTodo.id = data.id
        console.log( todos.value )
      } catch ( err ) {
        console.log(err)
      }
    }
  }

  const deleteTodo = async(todoId) => {
    try {
      const req = await axios.delete(`https://todoo.5xcamp.us/todos/${todoId}`);
      console.log(req)
      const index = todos.value.findIndex((t) => t.id === todoId);
      todos.value.splice(index, 1);
    } catch(err) {
      console.log(err)
    }
  }

  const toggleTodo = async(todoId) => {
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
  };

  const editTodo = async(todoId, editTodo) => {
    const formData = {
      todo: {
        content: editTodo
      }
    }
    try {
      const req = await axios.put(`https://todoo.5xcamp.us/todos/${todoId}`, formData);
      console.log(req)
    } catch(err) {
      console.log(err)
    }
  }

  return { 
    todos, 
    addTodo,
    toggleTodo, 
    deleteTodo, 
    editTodo 
  }
})