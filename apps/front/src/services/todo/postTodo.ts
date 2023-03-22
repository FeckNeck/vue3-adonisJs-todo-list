import api from "../../api";

export async function postTodo(title: string): Promise<Todo | any> {
  return await api
    .post("/todo/create", { title: title })
    .then((res) => {
      return res.data.todo;
    })
    .catch((error) => {
      throw error;
    });
}
