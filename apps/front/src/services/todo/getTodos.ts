import api from "../../api";

export async function getTodos(): Promise<Todo[] | any> {
  return await api
    .get("/todo/get")
    .then((res) => {
      return res.data.todos;
    })
    .catch((error) => {
      throw error;
    });
}
