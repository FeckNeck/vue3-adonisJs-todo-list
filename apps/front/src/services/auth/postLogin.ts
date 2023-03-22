import api from "../../api";

export interface LoginForm {
  email: string;
  password: string;
}

export async function postLogin(credentials: LoginForm): Promise<User | any> {
  return await api
    .post("/auth/login", credentials)
    .then((res) => res)
    .catch((error) => {
      throw error.response.data.message;
    });
}
