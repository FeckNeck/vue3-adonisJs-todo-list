<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composable/useAuth";
import { RegisterForm } from "../../services/auth/postRegister";

const form = reactive<RegisterForm>({
  email: "mathis.dousse@outlook.fr",
  password: "secret1234",
  password_confirmation: "secret1234",
});

const { isAuthenticated, register: postRegister, errors, loading } = useAuth();
const router = useRouter();

const reEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const isPasswordValid = computed(() => {
  return form.password.length > 8 ? "correct" : "invalid";
});

const isConfirmValid = computed(() => {
  return form.password === form.password_confirmation ? "correct" : "invalid";
});

const isEmailValid = computed(() => {
  return reEmail.test(form.email) ? "correct" : "invalid";
});

const isFormValid = computed(() => {
  return (
    isPasswordValid.value === "correct" &&
    isConfirmValid.value === "correct" &&
    isEmailValid.value === "correct"
  );
});

const isHidden = computed(() => {
  return (
    (form.email.length ||
      form.password.length ||
      form.password_confirmation.length) === 0
  );
});

const register = async () => {
  await postRegister(form);
  if (isAuthenticated.value) {
    router.push("/todo");
  }
};
</script>

<template>
  <p v-if="errors" class="invalid">{{ errors }}</p>
  <form @submit.prevent="register" class="auth-form">
    <div>
      <input v-model="form.email" placeholder="email" type="email" required />
    </div>
    <div>
      <input
        v-model="form.password"
        placeholder="password"
        type="password"
        required
      />
    </div>
    <div>
      <input
        v-model="form.password_confirmation"
        placeholder="confirm password"
        type="password"
        required
      />
    </div>
    <ul :hidden="isHidden">
      <li v-show="form.email.length" class="helpers">
        Email must be a<span :class="isEmailValid"> valid format.</span>
      </li>
      <li v-show="form.password.length" class="helpers">
        Password must be atleast
        <span :class="isPasswordValid">8 characters long.</span>
      </li>
      <li v-show="form.password_confirmation.length" class="helpers">
        Passwords <span :class="isConfirmValid">must match.</span>
      </li>
    </ul>
    <button
      type="submit"
      class="submit-btn"
      :disabled="!isFormValid || loading"
    >
      Register
    </button>
  </form>
</template>

<style scoped>
.helpers {
  font-size: 14px;
  padding-top: 4px;
}

.correct {
  color: #16a34a;
}

ul {
  list-style-position: inside;
}
</style>
