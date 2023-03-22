<script lang="ts" setup>
defineProps<{ title?: string }>();

const emit = defineEmits(["createT"]);
</script>
<template>
  <div class="add-todo">
    <div>
      <input
        :value="title"
        type="text"
        placeholder="Type a new task"
        @keyup.enter="emit('createT', $event)"
        maxlength="35"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="darkGray"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="17" y1="10" x2="3" y2="10"></line>
        <line x1="21" y1="6" x2="3" y2="6"></line>
        <line x1="21" y1="14" x2="3" y2="14"></line>
        <line x1="17" y1="18" x2="3" y2="18"></line>
      </svg>
    </div>
  </div>
</template>
<style>
.add-todo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.add-todo > div {
  position: relative;
  width: 100%;
}

.add-todo svg {
  position: absolute;
  left: 0;
  top: 0;
  margin: 7px;
}

.add-todo input {
  padding-left: 2.5rem;
  width: 100%;
}
</style>
