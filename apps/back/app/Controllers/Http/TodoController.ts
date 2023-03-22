import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "../../Models/Todo";
import User from "../../Models/User";

export default class TodoController {
  public async get({ auth, response }: HttpContextContract) {
    const user: User = await auth.user;
    await user.load("todos");
    return response.ok({ todos: user.todos });
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const { title } = request.all();
    const user: User = await auth.user;
    const todo = await user.related("todos").create({
      title: title,
    });

    return response.ok({ todo: todo });
  }

  public async update({ request, response }: HttpContextContract) {
    const { id, title, checked } = request.all();
    const todo = await Todo.findOrFail(id);
    todo.title = title;
    todo.checked = checked;
    await todo.save();
    return response.ok({ todo: todo });
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.all();
    const todo = await Todo.findOrFail(id);
    await todo.delete();
    return response.status(200);
  }
}
