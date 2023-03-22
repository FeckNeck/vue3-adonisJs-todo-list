import api from "../../api";

export async function deleteTodo(id: number): Promise<Todo | any> {
  return await api
    .delete("/todo/delete", { data: { id: id } })
    .then((res) => {
      console.log("res:", res);
      return res;
    })
    .catch((error) => {
      throw error;
    });
}
