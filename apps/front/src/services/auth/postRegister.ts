import api from "../../api";

export interface RegisterForm {
  email: string;
  password: string;
  password_confirmation: string;
}

export async function postRegister(credentials: RegisterForm): Promise<any> {
  return await api
    .post("/auth/register", credentials)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error.response.data.errors[0].message;
    });
}
