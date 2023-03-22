<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CreateTodo from "../components/todo/CreateTodo.vue";
import Todo from "../components/todo/Todo.vue";
import { useTodo } from "../composable/useTodo";

const { todos, fetchTodos, createTodo, updateTodo, removeTodo } = useTodo();

const currentTodo = ref<Todo | null>(null);
const currentIndex = ref(-1);

onMounted(async () => {
  await fetchTodos();
});

const createT = async (event: any) => {
  const newTitle = event.target.value;
  if (currentIndex.value === -1) {
    await createTodo(newTitle);
  } else if (newTitle !== currentTodo.value?.title) {
    currentTodo.value!.title = newTitle!;
    updateTodo(currentTodo.value!, currentIndex.value);
  }
  currentTodo.value = null;
  currentIndex.value = -1;
};

const deleteT = async (id: number) => {
  await removeTodo(id);
};

const updateT = async (todo: Todo, index: number) => {
  todo.checked = !todo.checked;
  updateTodo(todo, index);
};

const modifyTodo = (todo: Todo, index: number) => {
  currentTodo.value = todo;
  currentIndex.value = index;
};
</script>
<template>
  <div class="todo-container">
    <CreateTodo @createT="createT" :title="currentTodo?.title" />
    <TransitionGroup name="list" tag="div" class="todo-list">
      <Todo
        v-if="todos.length > 0"
        v-for="(todo, index) in todos"
        :key="todo.id"
        :class="{ active: index + 1 < todos.length }"
        :todo="todo"
        :index="index"
        @deleteT="deleteT"
        @updateT="updateT"
        @modifyTodo="modifyTodo"
      />
      <p v-else class="empty">You don't have any todo yet...</p>
    </TransitionGroup>
  </div>
</template>

<style>
.todo-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 500px;
}

.todo-list {
  padding-inline: 1rem;
  border-top: 1px solid var(--ternary-dark);
  border-bottom: 1px solid var(--ternary-dark);
  overflow-y: auto;
  overflow-x: hidden;
}

.active {
  border-bottom: 1px solid var(--ternary-dark);
}

.empty {
  padding: 1rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
