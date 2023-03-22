<script lang="ts" setup></script>

<template>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  max-height: 100%;
}

.container > div {
  padding: 2rem;
}
</style>
