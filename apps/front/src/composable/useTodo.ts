import { ref } from "vue";
import { deleteTodo } from "../services/todo/deleteTodo";
import { getTodos } from "../services/todo/getTodos";
import { postTodo } from "../services/todo/postTodo";
import { putTodo } from "../services/todo/putTodo";

export function useTodo() {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const errors = ref("");

  async function fetchTodos(): Promise<void> {
    loading.value = true;
    await getTodos()
      .then((data) => {
        todos.value = data;
      })
      .catch((err) => {
        errors.value = err;
      });

    loading.value = false;
  }

  async function createTodo(title: string): Promise<void> {
    await postTodo(title)
      .then((data) => {
        todos.value.push(data);
      })
      .catch((err) => {
        errors.value = err;
      });
  }

  async function updateTodo(todo: Todo): Promise<void> {
    await putTodo(todo)
      .then((data) => {
        const index = todos.value.findIndex((obj) => obj.id === todo.id);
        todos.value[index] = data;
      })
      .catch((err) => {
        errors.value = err;
      });
  }

  async function removeTodo(id: number): Promise<void> {
    await deleteTodo(id)
      .then(() => {
        todos.value = todos.value.filter((todo) => todo.id !== id);
      })
      .catch((err) => {
        errors.value = err;
      });
  }

  return {
    todos,
    loading,
    errors,
    fetchTodos,
    createTodo,
    updateTodo,
    removeTodo,
  };
}
