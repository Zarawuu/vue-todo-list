<template>
  <li class="list-row">
    <div class="flex items-center">
      <input type="checkbox" class="checkbox checkbox-primary"/>
    </div>
    <div v-if="enableEdit" class="flex items-center">
      <input v-model="todo.content" type="text" placeholder="Type here" class="input input-primary mr-2" />
    </div>
    <div v-else 
      class="flex"
      :class="todo.completed_at ? 'flex-col items-start' : 'items-center'"
    >
      <div class="text-lg font-semibold opacity-60">{{ todo.content }}</div>
      <div v-if="todo.completed_at">{{ `Completed at: ${todo.completed_at}` }}</div>
    </div>
    <button class="btn btn-soft btn-info" @click="editTodo(todo.id)">
      {{ enableEdit ? 'Finish Edit' : 'Edit'}}
    </button>
    <button v-if="!enableEdit" class="btn btn-soft btn-accent" @click="toggleTodo(todo.id)">
      {{ todo.completed_at ? 'Cancel Done' : 'Done' }}
    </button>
    <button class="btn btn-soft btn-error" @click=deleteTodo(todo.id)>
      Delete
    </button>
  </li>
</template>

<script setup>
import { ref } from 'vue';
const enableEdit = ref(false);

defineProps({
  todo: Object
})

const emits = defineEmits(['delete-todo', 'toggle-todo', 'edit-todo']);

const deleteTodo = (todoId) => {
  emits('delete-todo', todoId)
}

const toggleTodo = (todoId) => {
  emits('toggle-todo', todoId)
}

const editTodo = (todoId) => {
  enableEdit.value = true
}
</script>