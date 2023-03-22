import api from "../../api";

export async function putTodo(todo: Todo): Promise<Todo | any> {
  const { id, title, checked } = todo;
  return await api
    .put("/todo/update", { id, title, checked })
    .then((res) => {
      return res.data.todo;
    })
    .catch((error) => {
      throw error;
    });
}
