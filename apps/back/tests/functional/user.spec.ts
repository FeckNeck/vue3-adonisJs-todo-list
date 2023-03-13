import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import UserFactory from "../../database/factories/UserFactory";

test.group("Users", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction("pg");
    return () => Database.rollbackGlobalTransaction("pg");
  });

  test("ensure user can obtain their information", async ({
    client,
    assert,
  }) => {
    const user = await UserFactory.create();
    const response = await client.get("/auth/me").loginAs(user);

    response.assertStatus(200);
    assert.equal(response.body().id, user.id);
  });

  test("ensure auth check returns correct status as guest", async ({
    client,
  }) => {
    const response = await client.get("/auth/check");

    response.assertStatus(200);
    response.assertBodyContains({ authenticated: false });
  });

  test("ensure auth check returns correct status as auth", async ({
    client,
  }) => {
    const user = await UserFactory.create();
    const response = await client.get("/auth/check").loginAs(user);

    response.assertStatus(200);
    response.assertBodyContains({ authenticated: true });
  });
});

test.group("Users | Login / Logout", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction("pg");
    return () => Database.rollbackGlobalTransaction("pg");
  });

  test("ensure user can logout", async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.delete("/auth/logout").loginAs(user);

    response.assertStatus(204);
  });

  test("ensure user can login", async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.post("/auth/login").json({
      email: user.email,
      password: "IgnitionImpact",
    });

    response.assertStatus(204);
  });

  test("ensure user cannot login with invalid email", async ({ client }) => {
    const response = await client.post("/auth/login").json({
      email: "invalid",
      password: "IgnitionImpact",
    });

    response.assertStatus(400);
    response.assertBodyContains({
      code: "E_INVALID_CREDENTIALS",
      message: "No account found",
    });
  });

  test("ensure user cannot login with invalid password", async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.post("/auth/login").json({
      email: user.email,
      password: "invalid",
    });

    response.assertStatus(400);
    response.assertBodyContains({
      code: "E_INVALID_CREDENTIALS",
      message: "No account found",
    });
  });
});

test.group("Users | Register", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction("pg");
    return () => Database.rollbackGlobalTransaction("pg");
  });

  test("ensure user can register", async ({ client }) => {
    const response = await client.post("/auth/register").json({
      email: "mathis.dousse@example.com",
      password: "IgnitionImpact",
      password_confirmation: "IgnitionImpact",
    });

    response.assertStatus(201);
  });

  test("ensure a user cannot register without an email", async ({ client }) => {
    const response = await client.post("/auth/register").json({
      password: "IgnitionImpact",
      password_confirmation: "IgnitionImpact",
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: "email",
          rule: "required",
          message: "You need to specify an email.",
        },
      ],
    });
  });

  test("ensure a user cannot register with an invalid email", async ({
    client,
  }) => {
    const response = await client.post("/auth/register").json({
      email: "mathis",
      password: "IgnitionImpact",
      password_confirmation: "IgnitionImpact",
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: "email",
          rule: "email",
          message: "Your email is not valid.",
        },
      ],
    });
  });

  test("ensure a user cannot register with an existing email", async ({
    client,
  }) => {
    await UserFactory.merge({ email: "mathis.dousse@example.com" }).create();
    const response = await client.post("/auth/register").json({
      email: "mathis.dousse@example.com",
      password: "IgnitionImpact",
      password_confirmation: "IgnitionImpact",
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: "email",
          rule: "unique",
          message: "An account already exists with the provided email.",
        },
      ],
    });
  });

  test("ensure a user cannot register without a password", async ({
    client,
  }) => {
    const response = await client.post("/auth/register").json({
      email: "mathis.dousse@example.com",
      password_confirmation: "IgnitionImpact",
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: "password",
          rule: "required",
          message: "You need to specify a password.",
        },
      ],
    });
  });

  test("ensure a user cannot register with password too short", async ({
    client,
  }) => {
    const response = await client.post("/auth/register").json({
      email: "mathis.dousse@example.com",
      password: "GS",
      password_confirmation: "GS",
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: "password",
          rule: "minLength",
          message: "Your password needs to be at least 8 characters long.",
        },
      ],
    });
  });

  test("ensure a user cannot register with passwords that do not match", async ({
    client,
  }) => {
    const response = await client.post("/auth/register").json({
      email: "mathis.dousse@example.com",
      password: "AntiqueMachinaGS",
      password_confirmation: "IgnitionImpact",
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: "password_confirmation",
          rule: "confirmed",
          message: "Passwords do not match.",
        },
      ],
    });
  });
});
