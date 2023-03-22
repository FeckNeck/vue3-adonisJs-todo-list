<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div class="auth-container">
    <h1 class="auth-title">
      {{ route.name === "login" ? "Login" : "Register" }}
    </h1>
    <p v-if="route.name === 'login'">
      You do not have an account ?
      <Router-link to="/auth/register" class="auth-link">Register</Router-link>
    </p>
    <p v-else>
      You already have an account ?
      <Router-link to="/auth/login" class="auth-link">Login</Router-link>
    </p>
    <RouterView />
  </div>
</template>

<style>
.auth-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 325px;
}

.auth-container input {
  width: 100%;
}

.auth-title {
  text-align: center;
}

.auth-link {
  color: var(--teal) !important;
  text-decoration: underline;
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.submit-btn {
  width: 100%;
  background-color: var(--teal);
  border: none;
  color: white;
  font-family: inherit;
  padding-block: 0.5rem;
  border-radius: 0.25rem;
}

.submit-btn:enabled:hover {
  filter: brightness(90%);
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: var(--ternary-dark);
}

.invalid {
  color: #dc2626;
}
</style>
