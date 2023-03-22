<script lang="ts" setup>
defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(["deleteT", "updateT", "modifyTodo"]);
</script>

<template>
  <div class="todo">
    <button
      @click="emit('updateT', { id: todo.id, checked: !todo.checked })"
      class="checkbox"
    >
      <svg
        v-show="todo.checked"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </button>
    <p :class="{ checked: todo.checked }" class="title">{{ todo.title }}</p>
    <div class="update">
      <button class="update-btn" @click="emit('modifyTodo', todo)">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path>
        </svg>
      </button>
      <button class="update-btn" @click="emit('deleteT', todo.id)">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.title {
  flex-grow: 1;
  padding-inline: 1rem;
  font-family: inherit;
}

.checked {
  text-decoration-line: line-through;
}

.checkbox {
  color: darkgray;
  position: relative;
  border: 1px solid var(--ternary-dark);
  background-color: var(--primary-dark);
  border-radius: 0.25rem;
  width: 1rem;
  height: 1rem;
}

.checkbox > svg {
  position: absolute;
  left: 0;
  top: 0;
  margin: 1px;
}

.update {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.update-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: darkgray;
}

.update-btn svg {
  transition: color 300ms ease;
}

.update-btn svg:hover {
  color: var(--teal);
}
</style>
