/**
 * Install dependencies before you attempt to run the tests!!
 * ****** run npm i in termnal, under this directory *****
 * Start your server before running the test
 * run npm test when you are ready
 * A report will be automatically generated under this directory
 */
const axios = require("axios");
const { v4: uuid } = require("uuid");
const to = require("./lib/to");
const https = require("https");

//If you are serving your server on any port other than 3000, change the port here, or alternatively change the url to approriate
const REMOTE_API_URL = `http://localhost:3000`;
const EMAIL = `${uuid()}@fake-email.com`;
const PASSWORD = "webcomputing";
let TOKEN = "";

https.globalAgent.options.rejectUnauthorized = false;
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

describe("rankings", () => {
  describe("with invalid query parameter", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(
          `${REMOTE_API_URL}/rankings?country=Australia&year=2020&name=a`
        )
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 400", () =>
      expect(response.status).toBe(400));
    test("should return status text - Bad Request", () =>
      expect(response.statusText).toBe("Bad Request"));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
    test("should be an object result", () =>
      expect(response.data).toBeInstanceOf(Object));
  });

  describe("country with invalid name", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(
          `${REMOTE_API_URL}/rankings?country=industry=country_that_doesn't exist`
        )
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 400", () =>
      expect(response.status).toBe(400));
    test("should return status text - Bad Request", () =>
      expect(response.statusText).toBe("Bad Request"));
    test("should return error with boolean of true", () =>
      expect(response.data.error).toBe(true));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
    test("should be an object result", () =>
      expect(response.data).toBeInstanceOf(Object));
  });

  describe("year with lets in year format", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings?year=twentytwenty`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 400", () =>
      expect(response.status).toBe(400));
    test("should return status text - Bad Request", () =>
      expect(response.statusText).toBe("Bad Request"));
    test("should return error with boolean of true", () =>
      expect(response.data.error).toBe(true));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
    test("should be an object result", () =>
      expect(response.data).toBeInstanceOf(Object));
  });

  describe("with no query parameters", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return status OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should return an array", () =>
      expect(response.data).toBeInstanceOf(Array));
    test("should return 935 results", () =>
      expect(response.data.length).toBe(935));
    test("should contain correct first country property", () =>
      expect(response.data[0].country).toBe("Finland"));
    test("should contain correct first rank property", () =>
      expect(response.data[0].rank).toBe(1));
    test("should contain correct first score property", () =>
      expect(response.data[0].score).toBe("7.809"));
    test("should contain correct first year property", () =>
      expect(response.data[0].year).toBe(2020));
  });

  describe("with valid country query parameter", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings?country=Australia`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return status OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should return an array", () =>
      expect(response.data).toBeInstanceOf(Array));
    test("should return an array", () => expect(response.data.length).toBe(6));
    test("should contain correct first country property", () =>
      expect(response.data[0].country).toBe("Australia"));
    test("should contain correct first rank property", () =>
      expect(response.data[0].rank).toBe(12));
    test("should contain correct first score property", () =>
      expect(response.data[0].score).toBe("7.223"));
    test("should contain correct first year property", () =>
      expect(response.data[0].year).toBe(2020));
  });

  describe("with country that doesn't exist", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings?country=NotARealCountry`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return an array", () =>
      expect(response.data).toBeInstanceOf(Array));
    test("should return 0 results", () => expect(response.data.length).toBe(0));
  });

  describe("with valid year query parameter", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings?year=2015`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return status OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should contain correct first country property", () =>
      expect(response.data[0].country).toBe("Switzerland"));
    test("should contain correct first rank property", () =>
      expect(response.data[0].rank).toBe(1));
    test("should contain correct first score property", () =>
      expect(response.data[0].score).toBe("7.587"));
    test("should contain correct first year property", () =>
      expect(response.data[0].year).toBe(2015));
  });

  describe("with country that doesn't exist", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings?year=2000`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return an array", () =>
      expect(response.data).toBeInstanceOf(Array));
    test("should return 0 results", () => expect(response.data.length).toBe(0));
  });

  describe("with country and year parameters", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.get(`${REMOTE_API_URL}/rankings?&year=2019&country=Australia`)
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return an array", () =>
      expect(response.data).toBeInstanceOf(Array));
    test("should return 0 results", () => expect(response.data.length).toBe(1));
    test("should contain correct  country property", () =>
      expect(response.data[0].country).toBe("Australia"));
    test("should contain correct  rank property", () =>
      expect(response.data[0].rank).toBe(11));
    test("should contain correct  score property", () =>
      expect(response.data[0].score).toBe("7.228"));
    test("should contain correct  year property", () =>
      expect(response.data[0].year).toBe(2019));
  });
});
