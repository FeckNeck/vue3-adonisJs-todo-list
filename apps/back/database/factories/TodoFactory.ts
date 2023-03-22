import Todo from "../../app/Models/Todo";
import Factory from "@ioc:Adonis/Lucid/Factory";

export default Factory.define(Todo, ({ faker }) => {
  return {
    title: faker.lorem.word(),
  };
}).build();
