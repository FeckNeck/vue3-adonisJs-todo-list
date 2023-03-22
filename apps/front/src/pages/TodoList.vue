<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CreateTodo from "../components/todo/CreateTodo.vue";
import Todo from "../components/todo/Todo.vue";
import { useTodo } from "../composable/useTodo";

const { todos, fetchTodos, createTodo, updateTodo, removeTodo } = useTodo();

const currentTitle = ref("");
const currentId = ref(0);

onMounted(async () => {
  await fetchTodos();
});

const createT = async (event: any) => {
  const newTitle: string = event.target.value;
  if (currentTitle.value === "") {
    currentTitle.value = newTitle;
    await createTodo(newTitle);
  } else if (currentTitle.value !== newTitle) {
    await updateT({ id: currentId.value, title: newTitle });
  }
  currentTitle.value = "";
};

const deleteT = async (id: number) => {
  await removeTodo(id);
};

const updateT = async (todo: Todo) => {
  await updateTodo(todo);
};

const modifyTodo = (todo: Todo) => {
  currentTitle.value = todo.title!;
  currentId.value = todo.id;
};
</script>
<template>
  <div class="todo-container">
    <CreateTodo @createT="createT" :title="currentTitle" />
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
