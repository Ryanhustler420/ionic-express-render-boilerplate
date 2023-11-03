import request from "supertest";
import { app } from "../../app";
import { ENV } from "../../env";

it("can't drop collections if env is production", async () => {
  process.env.ENV = 'production';
  const response = await request(app).post("/api/drop/collections").expect(200);
  expect(response.body.message).toEqual("You can't perform as of now");
});

it("drop collections if env is development", async () => {
  process.env.ENV = 'development';
  const response = await request(app).post("/api/drop/collections").expect(200);
  expect(response.body).toHaveProperty("key");
  expect(response.body).toHaveProperty("backup");
  expect(response.body.key.length).toEqual(0);
  expect(response.body.backup.length).toEqual(1);
});