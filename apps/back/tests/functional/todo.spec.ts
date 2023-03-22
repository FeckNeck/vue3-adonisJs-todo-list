import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import UserFactory from "../../database/factories/UserFactory";

test.group("Todo", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction("pg");
    return () => Database.rollbackGlobalTransaction("pg");
  });

  test("ensure user can get todos", async ({ client }) => {
    const user = await UserFactory.with("todos", 3).create();
    const response = await client.get("/todo/get").loginAs(user);
    response.assertStatus(200);
    response.assertBodyContains({ todos: user.serialize().todos });
  });

  test("ensure user can create todo", async ({ client, assert }) => {
    const user = await UserFactory.create();
    const response = await client
      .post("/todo/create")
      .json({
        title: "todo-example",
      })
      .loginAs(user);
    response.assertStatus(200);
    assert.equal("todo-example", response.body().todo.title);
  });

  test("ensure user can update todo", async ({ client }) => {
    const user = await UserFactory.with("todos", 3).create();
    const response = await client
      .put("/todo/update")
      .json({
        id: user.todos[0].id,
        title: "updated-todo",
        checked: true,
      })
      .loginAs(user);
    response.assertStatus(200);
  });

  test("ensure user can delete todo", async ({ client }) => {
    const user = await UserFactory.with("todos", 3).create();
    const response = await client
      .delete("/todo/delete")
      .json({
        id: user.todos[0].id,
      })
      .loginAs(user);
    response.assertStatus(200);
  });
});
