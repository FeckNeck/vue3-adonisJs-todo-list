import User from "../../app/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";

export default Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: "IgnitionImpact",
  };
}).build();
