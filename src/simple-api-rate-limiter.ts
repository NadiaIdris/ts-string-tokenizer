export function processAPIRequest() {
  // We need to keep track of the successful requests.
  const successfulRequests: number[] = [];
  // We need to define the max number of requests per time window.
  const maxRequests = 2;
  // We need to define the time window in milliseconds.
  const timeWindowInMs = 1000;
  // We need to crate a new timestamp for each new request.
  const newRequestTimestamp = new Date().getTime();

  const requestResult = acceptOrDenyRequest(
    maxRequests,
    timeWindowInMs,
    successfulRequests,
    newRequestTimestamp
  );

  if (requestResult === "accept") {
    // Add the successful request timestamp to the successfulRequests array.
    successfulRequests.push(newRequestTimestamp);
    // Give access to the API.
  } else {
    // We need to return a 429 status code.
    return 429;
  }
}

export function acceptOrDenyRequest(
  maxRequests: number,
  timeWindowInMs: number,
  successfulRequests: number[],
  newRequestTimestamp: number
): "accept" | "deny" {
  // We need to keep track of request count in the time window. When the request count is equal to
  // the max requests, we need to deny the request since the time window is full.
  let requestCount = 0;

  /* 
    We will loop through the successfulRequests array from back to front. We will check if the
    previously successful timestamp is still within the time window. If it is, we will increment
    the request count. If it is not, we will stop the loop since we know we have reached outside
    of the window bounds.
   */
  for (const timestamp of successfulRequests.reverse()) {
    const timestampIsInWindow =
      timestamp > newRequestTimestamp - timeWindowInMs;

    if (timestampIsInWindow) {
      requestCount++;
    } else {
      break;
    }
  }

  /* 
    Now that we know how many requests were successful in the current time window, we can compare
    successful requests number with the max requests allowed in the time window. If successful requests
    number is less than max request allowed, then we can accept the request (and push the request timestamp
    to the end of the successfulRequests array). If successful requests number is equal to max requests
    allowed, then we need to deny the request since the time window is full with successful requests already.
  */

  return requestCount < maxRequests ? "accept" : "deny";
}
