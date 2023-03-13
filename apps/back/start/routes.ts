import Route from "@ioc:Adonis/Core/Route";

Route.post("/auth/register", "AuthController.register");
Route.post("/auth/login", "AuthController.login");
Route.get("/auth/check", "AuthController.check");

Route.group(() => {
  Route.get("/auth/me", "AuthController.me");
  Route.delete("/auth/logout", "AuthController.logout");
}).middleware("auth");
