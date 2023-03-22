<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composable/useAuth";
import { LoginForm } from "../../services/auth/postLogin";

const { isAuthenticated, login: postLogin, errors, loading } = useAuth();
const router = useRouter();

const form = reactive<LoginForm>({
  email: "mathis.dousse@outlook.fr",
  password: "secret1234",
});

const reEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const isFormValid = computed(() => {
  return reEmail.test(form.email) && form.password.length > 8;
});

const login = async () => {
  await postLogin(form);
  if (isAuthenticated.value) {
    router.push("/todo");
  }
};
</script>

<template>
  <p v-if="errors" class="invalid">{{ errors }}</p>
  <form @submit.prevent="login" class="auth-form">
    <input v-model="form.email" placeholder="email" required type="email" />
    <input
      v-model="form.password"
      placeholder="password"
      required
      type="password"
    />
    <button
      type="submit"
      class="submit-btn"
      :disabled="!isFormValid || loading"
    >
      Login
    </button>
  </form>
</template>

<style scoped></style>
