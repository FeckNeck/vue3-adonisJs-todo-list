import { ref } from "vue";
import { getCheck } from "../services/auth/getCheck";
import { LoginForm, postLogin } from "../services/auth/postLogin";
import { RegisterForm, postRegister } from "../services/auth/postRegister";

export function useAuth() {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const errors = ref("");
  const isAuthenticated = ref(false);

  async function login(form: LoginForm): Promise<void> {
    loading.value = true;
    await postLogin(form)
      .then((data) => {
        isAuthenticated.value = true;
      })
      .catch((err) => {
        errors.value = err;
      });

    loading.value = false;
  }

  async function register(form: RegisterForm): Promise<void> {
    loading.value = true;
    await postRegister(form)
      .then(() => {
        isAuthenticated.value = true;
      })
      .catch((err) => {
        errors.value = err;
      });

    loading.value = false;
  }

  async function check() {
    await getCheck()
      .then((res) => {
        isAuthenticated.value = res;
      })
      .catch((err) => {
        errors.value = err;
      });
  }

  return {
    login,
    register,
    check,
    user,
    errors,
    loading,
    isAuthenticated,
  };
}
