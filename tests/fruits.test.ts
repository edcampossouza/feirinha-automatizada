import supertest from "supertest";
import app from "app";

const server = supertest(app);

describe("GET /health", () => {
  it("should be online", async () => {
    const result = await server.get("/health");
    expect(result.text).toBe("I'am alive!");
  });
});

describe("/fruits", () => {
  it("should be empty on start", async () => {
    const result = await server.get("/fruits");
    expect(result.body).toEqual([]);
  });

  it("should return 201 on creation", async () => {
    const result = await server
      .post("/fruits")
      .send({ name: "papaia", price: 20 });
    expect(result.status).toEqual(201);
  });

  it("should return the created fruit", async () => {
    const result = await server.get("/fruits");
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "papaia", price: 20 }),
      ])
    );
    expect(result.body).toHaveLength(1);
  });

  it("should not allow duplicated names", async () => {
    const result = await server
      .post("/fruits")
      .send({ name: "papaia", price: 20 });

    expect(result.status).toBe(409);
  });
});
