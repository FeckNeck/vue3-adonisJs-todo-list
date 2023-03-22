import User from "../../app/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import TodoFactory from "./TodoFactory";

export default Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: "IgnitionImpact",
  };
})
  .relation("todos", () => TodoFactory) // 👈
  .build();
