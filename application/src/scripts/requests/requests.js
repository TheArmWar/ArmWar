import { decodeResponse } from "../protocol/protocol";

/**
 * @enum RequestStatus
 * Describe the end of a request
 */
export const RequestStatus = {
  SUCCESS: 0, // Everything worked
  ERROR: 1, // Server sent an error
  FAILED: 2, // Couldn't send request, or send failed
};

// Timeout for each request (constant)
const timeout_ms = 3000;

/**
 * @function request
 * @param {String} ip
 * @param {String} endpoint
 * @param {Uint8Array<Byte>} payload
 */
export async function request(ip, endpoint, payload) {
  // Sends the requests and wait for the response
  try {
    const response = await fetch(`http://${ip}/${endpoint}`, {
      method: "POST",
      body: payload,
      signal: AbortSignal.timeout(timeout_ms),
    });

    // Gets the response body
    const encodedText = new TextEncoder().encode(await response.text());

    // Decode the response
    const responseObj = decodeResponse(encodedText);

    console.log("Got payload: ");
    console.log(responseObj);

    if (responseObj.success)
      return { result: RequestStatus.SUCCESS, message: "" };
    else return { result: RequestStatus.ERROR, message: responseObj.message };
  } catch (error) {
    return { result: RequestStatus.FAILED, message: error.message };
  }
}
