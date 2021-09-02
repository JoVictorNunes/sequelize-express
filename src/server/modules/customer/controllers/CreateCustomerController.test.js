/**
 * @jest-environment ./test.environment
 */

const request = require("supertest");
const app = require("../../../app");

describe("Create Customer Tests", () => {
  test("should not create { customer: { name } }", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        customer: {
          name: "João Victor",
        },
      });

    expect(res.status).toBe(400);
    expect(res.headers).not.toHaveProperty("location");
  });

  test("should create { customer: { name, cpf } }", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        customer: {
          name: "João Victor",
          cpf: "178.292.317-96",
        },
      });

    expect(res.status).toBe(201);
    expect(res.headers).toHaveProperty("location");
  });

  test("should create { customer: { name, cpf }, phones: [{ kind, number }] }", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        customer: {
          name: "Kassio",
          cpf: "111.111.111-11",
        },
        phones: [
          {
            kind: "cel",
            number: "28999999999",
          },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.headers).toHaveProperty("location");
  });

  test("should create { customer: { name, cpf }, phones: [{ kind, number }], cars: [{ brand, model, license, year }] }", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        customer: {
          name: "Raissa",
          cpf: "111.111.111-22",
        },
        phones: [
          {
            kind: "cel",
            number: "28999999988",
          },
        ],
        cars: [
          {
            brand: "Ford",
            model: "Focus",
            license: "HRT1178",
            year: "2010",
          },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.headers).toHaveProperty("location");
  });

  test("should create { customer: { name, cpf }, phones: [{ kind, number }], cars: [{ brand, model, license }] }", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        customer: {
          name: "Fatima",
          cpf: "111.111.111-33",
        },
        phones: [
          {
            kind: "cel",
            number: "28999999977",
          },
        ],
        cars: [
          {
            brand: "Ford",
            model: "Focus",
            license: "HRT1125",
          },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.headers).toHaveProperty("location");
  });
});
