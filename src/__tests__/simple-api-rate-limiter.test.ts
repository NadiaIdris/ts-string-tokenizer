import { acceptOrDenyRequest } from "../simple-api-rate-limiter";

const maxRequests = 2;
const timeWindowInMs = 1000;
const newRequestTimestampInMs = 1668536464110;

// First timestamp gets approved.
test("Empty array works", () => {
  const successfulRequests: number[] = [];
  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );
  expect(requestResult).toBe("accept");
});

// Second timestamp gets approved.
test("One in window bounds timesamp in array works", () => {
  const successfulRequests: number[] = [
    1668536463610 /* 500ms from newRequestTimestampInMs: in window */,
  ];
  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );

  expect(requestResult).toBe("accept");
});

// Second timestamp gets approved.
test("One out of window bounds timesamp in array works", () => {
  const successfulRequests: number[] = [
    1668536462110 /* 2000ms from newRequestTimestampInMs: expired */,
  ];
  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );

  expect(requestResult).toBe("accept");
});

// Third timestamp gets approved.
test("Two timestamps, one expired works", () => {
  const successfulRequests: number[] = [
    1668536462110 /* 2000ms from newRequestTimestampInMs: expired */,
    1668536463610 /* 500ms from newRequestTimestampInMs: in window */,
  ];
  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );

  expect(requestResult).toBe("accept");
});

// Third timestamp gets approved.
test("Two timestamps, both expired works", () => {
  const successfulRequests: number[] = [
    1668536462110 /* 2000ms: expired */, 1668536462111 /* 1999ms: expired */,
  ];
  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );

  expect(requestResult).toBe("accept");
});

// Third timestamp gets denied.
test("Two timestamps, both in window works", () => {
  const successfulRequests: number[] = [
    1668536464000 /* 110ms: in window */, 1668536464010 /* 100ms: in window */,
  ];
  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );

  expect(requestResult).toBe("deny");
});

// Forth timestamp gets denied.
test("Two timestamps, both in window works", () => {
  const successfulRequests: number[] = [
    1668536464000 /* 110ms: in window */, 1668536464010 /* 100ms: in window */,
    1668536464020 /* 90ms: in window */,
  ];

  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestampInMs
  );

  expect(requestResult).toBe("deny");
});
