<template>
  <li class="list-row">
    <div class="flex items-center">
      <input 
        v-model="checked" 
        type="checkbox" 
        class="checkbox checkbox-primary" 
        disabled="true"
      />
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
    <button v-if="!(todo.completed_at)" class="btn btn-soft btn-info" @click="editTodo(todo.id)">
      {{ enableEdit ? 'Finish Edit' : 'Edit'}}
    </button>
    <button 
      v-if="!enableEdit" 
      class="btn btn-soft btn-accent" 
      @click="toggleTodo(todo.id)"
    >
      {{ todo.completed_at ? 'Cancel Finish' : 'Finish' }}
    </button>
    <button class="btn btn-soft btn-error" @click=deleteTodo(todo.id)>
      Delete
    </button>
  </li>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/stores/TodoStore.js'

const store = useTodoStore();
const enableEdit = ref(false);
const checked = ref(false);

const props = defineProps({
  todo: Object
})

onMounted(() => {
  if ( props.todo.completed_at ) {
    checked.value = true
  }
})

const emits = defineEmits(['edit-todo']);

const deleteTodo = (todoId) => {
  store.deleteTodo(todoId)
}

const toggleTodo = (todoId) => {
  store.toggleTodo(todoId)
  if ( props.todo.completed_at ) {
    checked.value = true
  } else {
    checked.value = false
  }
}

const editTodo = (todoId) => {
  if ( enableEdit.value === false ) {
    enableEdit.value = true
  } else {
    enableEdit.value = false
    store.editTodo(todoId, props.todo.content)
  }
}
</script>