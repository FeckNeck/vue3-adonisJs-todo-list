import Route from "@ioc:Adonis/Core/Route";

Route.post("/auth/register", "AuthController.register");
Route.post("/auth/login", "AuthController.login");
Route.get("/auth/check", "AuthController.check");

Route.group(() => {
  Route.get("/auth/me", "AuthController.me");
  Route.delete("/auth/logout", "AuthController.logout");

  Route.get("todo/get", "TodoController.get");
  Route.post("/todo/create", "TodoController.create");
  Route.put("/todo/update", "TodoController.update");
  Route.delete("/todo/delete", "TodoController.delete");
}).middleware("auth");
