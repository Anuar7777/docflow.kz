const request = require("supertest");
const app = require("../../app.js");
const { User, sequelize } = require("../../models");
const bcrypt = require("bcryptjs");
const TokenService = require("../../services/token-service.js");
const UserDto = require("../../dtos/user-dto.js");

describe("Users API", () => {
  let admin_access_token,
    applicant_access_token,
    reviewer_access_token,
    tester_access_token;
  let refresh_token;
  let tester_user_id, applicant_user_id;

  beforeAll(async () => {
    const admin = await User.create({
      email: "admin@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
      status: "verified",
      verification_token: null,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const reviewer = await User.create({
      email: "reviewer@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "reviewer",
      status: "verified",
      verification_token: null,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const applicant = await User.create({
      email: "applicant@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "applicant",
      status: "verified",
      verification_token: null,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const pendingUser = await User.create({
      email: "pendingUser@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "applicant",
      status: "pending",
      verification_token: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    applicant_user_id = applicant.user_id;
    pendingUser_id = pendingUser.user_id;

    admin_access_token = TokenService.generateToken({
      ...new UserDto(admin),
    }).access_token;
    reviewer_access_token = TokenService.generateToken({
      ...new UserDto(reviewer),
    }).access_token;
    applicant_access_token = TokenService.generateToken({
      ...new UserDto(applicant),
    }).access_token;
    pending_user_access_token = TokenService.generateToken({
      ...new UserDto(pendingUser),
    }).access_token;
  });

  afterAll(async () => {
    await User.destroy({
      where: {
        email: [
          "admin@test.com",
          "reviewer@test.com",
          "applicant@test.com",
          "pendingUser@test.com",
        ],
      },
    });

    sequelize.close();
  });

  describe("Регистрация пользователя", () => {
    it("Должен успешно зарегистрировать нового пользователя", async () => {
      const res = await request(app).post("/api/register").send({
        email: "testuser@test.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("access_token");
      expect(res.body).toHaveProperty("refresh_token");
      expect(res.body).toHaveProperty("user");

      expect(res.body.user).toHaveProperty("user_id");
      expect(res.body.user).toHaveProperty("email", "testuser@test.com");
      expect(res.body.user).toHaveProperty("role", "applicant");
      expect(res.body.user).toHaveProperty("status", "pending");
      expect(res.body.user).toHaveProperty("created_at");
      expect(res.body.user).toHaveProperty("updated_at");

      tester_access_token = res.body.access_token;
      refresh_token = res.body.refresh_token;
      tester_user_id = res.body.user.user_id;
    });

    it("Должен вернуть ошибку при регистрации уже существующего пользователя", async () => {
      const res = await request(app).post("/api/register").send({
        email: "testuser@test.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Пользователь с почтовым адресом testuser@test.com уже существует"
      );
    });

    it("Должен вернуть ошибку при регистрации с некорректным email", async () => {
      const res = await request(app).post("/api/register").send({
        email: "not-an-email",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors[0]).toHaveProperty("msg", "Некорректный email");
    });

    it("Должен вернуть ошибку при регистрации без пароля", async () => {
      const res = await request(app).post("/api/register").send({
        email: "testuser@test.com",
      });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors[0]).toHaveProperty(
        "msg",
        "Пароль должен быть от 3 до 32 символов"
      );
    });
  });

  describe("Авторизация пользователя", () => {
    it("Должен авторизовать пользователя", async () => {
      const res = await request(app).post("/api/login").send({
        email: "testuser@test.com",
        password: "password123",
      });

      expect(res.body).toHaveProperty("access_token");
      expect(res.body).toHaveProperty("refresh_token");
      expect(res.body).toHaveProperty("user");
    });

    it("Должен вернуть ошибку при попытке входа с некорректными данными", async () => {
      const res = await request(app).post("/api/login").send({
        email: "testuser@test.com",
        password: "falsepassword",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Неверный email или пароль");
    });
  });

  describe("Обновление refresh токена", () => {
    it("Должен успешно обновить refresh_token", async () => {
      const res = await request(app)
        .get("/api/refresh")
        .set("refreshToken", refresh_token);
    });

    it("Должен вернуть ошибку, если refresh_token отсутствует", async () => {
      const res = await request(app)
        .get("/api/refresh")
        .set("refreshToken", refresh_token);
    });

    it("Должен вернуть ошибку, если refresh_token недействителен", async () => {
      const res = await request(app)
        .get("/api/refresh")
        .set("refreshToken", refresh_token);
    });
  });

  describe("Получение пользователя по ID", () => {
    it("Должен вернуть пользователя по ID, если запрос отправляет сам пользователь", async () => {
      const res = await request(app)
        .get(`/api/users/${tester_user_id}`)
        .set("Authorization", `Bearer ${tester_access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user_id", tester_user_id);
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("role");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("created_at");
      expect(res.body).toHaveProperty("updated_at");
    });

    it("Должен вернуть пользователя по ID, если запрос отправляет Admin", async () => {
      const res = await request(app)
        .get(`/api/users/${tester_user_id}`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user_id", tester_user_id);
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("role");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("created_at");
      expect(res.body).toHaveProperty("updated_at");
    });

    it("Запрос по ID пользователя должен возвращать ошибку, если его отправляет другой Applicant", async () => {
      const res = await request(app)
        .get(`/api/users/${tester_user_id}`)
        .set("Authorization", `Bearer ${applicant_access_token}`);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("message", "Доступ запрещен");
    });

    it("Запрос по ID пользователя должен возвращать ошибку, если его отправляет Reviewer", async () => {
      const res = await request(app)
        .get(`/api/users/${tester_user_id}`)
        .set("Authorization", `Bearer ${reviewer_access_token}`);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("message", "Доступ запрещен");
    });

    it("Запрос по ID пользователя должен возвращать ошибку, если пользователь не найден", async () => {
      const res = await request(app)
        .get("/api/users/c8677f95-ae22-4337-8cf7-4e2242e25fa4")
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Пользователь не найден");
    });

    it("Запрос по ID пользователя должен возвращать ошибку, если передан некорректный ID (не UUID)", async () => {
      const res = await request(app)
        .get("/api/users/valvajldva546")
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Передан некорректный ID (не UUID)"
      );
    });
  });

  describe("Получить всех пользователей", () => {
    it("Должен вернуть список всех пользователей", async () => {
      const res = await request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      res.body.forEach((user) => {
        expect(user).toHaveProperty("user_id");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("role");
        expect(user).toHaveProperty("status");
        expect(user).toHaveProperty("created_at");
        expect(user).toHaveProperty("updated_at");
      });
    });

    it("Должен вернуть ошибку 403, если запрос отправляет Applicant", async () => {
      const res = await request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${applicant_access_token}`);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("message", "Доступ запрещен");
    });

    it("Должен вернуть ошибку 403, если запрос отправляет Reviewer", async () => {
      const res = await request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${reviewer_access_token}`);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("message", "Доступ запрещен");
    });
  });

  describe("Блокировка пользователя", () => {
    it("Должен успешно заблокировать пользователя", async () => {
      const res = await request(app)
        .put(`/api/users/${applicant_user_id}/block`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Пользователь applicant@test.com заблокирован"
      );
    });

    it("Должен вернуть ошибку 404, если пользователь не найден", async () => {
      const res = await request(app)
        .put(`/api/users/c8677f95-ae22-4337-8cf7-4e2242e25fa4/block`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Пользователь не найден");
    });

    it("Должен вернуть ошибку 400, если пользователь не верифицирован", async () => {
      const res = await request(app)
        .put(`/api/users/${pendingUser_id}/block`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Пользователь не верифицирован"
      );
    });
  });

  describe("Разблокировка пользователя", () => {
    it("Должен успешно разблокировать пользователя", async () => {
      const res = await request(app)
        .put(`/api/users/${applicant_user_id}/unblock`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Пользователь applicant@test.com разблокирован"
      );
    });

    it("Должен вернуть ошибку 404, если пользователь не найден", async () => {
      const res = await request(app)
        .put(`/api/users/c8677f95-ae22-4337-8cf7-4e2242e25fa4/unblock`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Пользователь не найден");
    });

    it("Должен вернуть ошибку 400, если пользователь не верифицирован", async () => {
      const res = await request(app)
        .put(`/api/users/${pendingUser_id}/unblock`)
        .set("Authorization", `Bearer ${admin_access_token}`);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Пользователь не верифицирован"
      );
    });
  });

  describe("Обновление роли пользователя", () => {
    it("Должен успешно обновить роль пользователя (applicant → reviewer)", async () => {
      const res = await request(app)
        .patch(`/api/users/${applicant_user_id}/role`)
        .set("Authorization", `Bearer ${admin_access_token}`)
        .send({ role: "reviewer" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Роль applicant@test.com обновлена до reviewer"
      );
    });

    it("Должен успешно обновить роль пользователя (reviewer → applicant)", async () => {
      const res = await request(app)
        .patch(`/api/users/${applicant_user_id}/role`)
        .set("Authorization", `Bearer ${admin_access_token}`)
        .send({ role: "applicant" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Роль applicant@test.com обновлена до applicant"
      );
    });

    it("Должен вернуть ошибку 404, если пользователь не найден", async () => {
      const res = await request(app)
        .patch(`/api/users/c8677f95-ae22-4337-8cf7-4e2242e25fa4/role`)
        .set("Authorization", `Bearer ${admin_access_token}`)
        .send({ role: "reviewer" });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Пользователь не найден");
    });

    //   ❌ Должен вернуть ошибку 400, если пользователь не верифицирован (pending).

    it("Должен вернуть ошибку 400, если передана некорректная роль", async () => {
      const res = await request(app)
        .patch(`/api/users/${applicant_user_id}/role`)
        .set("Authorization", `Bearer ${admin_access_token}`)
        .send({ role: "invalid_role" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Некорректная роль");
    });
  });

  describe("Удаление пользователя", () => {
    it("Должен вернуть ошибку при удалении без авторизации", async () => {
      const res = await request(app).delete(`/api/users/${tester_user_id}`);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Пользователь не авторизован");
    });

    it("Должен удалить пользователя, если запрос отправляет владелец аккаунта", async () => {
      const res = await request(app)
        .delete(`/api/users/${tester_user_id}`)
        .set("Authorization", `Bearer ${tester_access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Пользователь успешно удален");
    });

    it("Должен вернуть ошибку при удалении несуществующего пользователя", async () => {
      const res = await request(app)
        .delete(`/api/users/${tester_user_id}`)
        .set("Authorization", `Bearer ${tester_access_token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Пользователь не найден");
    });
  });
});
