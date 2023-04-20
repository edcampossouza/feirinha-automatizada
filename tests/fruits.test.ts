import supertest from "supertest";
import app from "app";

const server = supertest(app);

describe("GET /health", () => {
  it("should be online", async () => {
    const result = await server.get("/health");
    expect(result.text).toBe("I'am alive!");
  });
});
