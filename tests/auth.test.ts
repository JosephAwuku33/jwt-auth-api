import request from "supertest";
import fs from "fs";
import app from "../src/app";
import { config } from "../src/config/config";

// Reset users.json before tests
beforeAll(() => {
  fs.writeFileSync(config.USER_FILE_PATH, "[]");
});

describe("Authentication Flow", () => {
  const testUser = { username: "john", password: "testpass123" };
  let token: string;

  it("should register a new user", async () => {
    const res = await request(app).post("/register").send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully.");
  });

  it("should not allow duplicate registration", async () => {
    const res = await request(app).post("/register").send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should login the user and return a JWT", async () => {
    const res = await request(app).post("/login").send(testUser);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("should not login with wrong password", async () => {
    const res = await request(app).post("/login").send({
      username: testUser.username,
      password: "wrongpass",
    });
    expect(res.status).toBe(401);
  });

  it("should access protected route with valid token", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toContain(testUser.username);
  });

  it("should deny access to protected route without token", async () => {
    const res = await request(app).get("/profile");
    expect(res.status).toBe(401);
  });

  it("should deny access with invalid token", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer invalidtoken`);
    expect(res.status).toBe(403);
  });
});
