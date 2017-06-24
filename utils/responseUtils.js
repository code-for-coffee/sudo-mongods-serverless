/**
 * 200 ok
 * @param body
 * @param headers
 * @returns {{statusCode, headers, body}|*}
 */
export function success(body, headers) {
  return buildResponse(body, headers, 200);
}

/**
 * 500 failure
 * @param body
 * @param headers
 * @returns {{statusCode, headers, body}|*}
 */
export function failure(body, headers) {
  return buildResponse(body, headers, 500);
}

/**
 * generate response body with CORS
 * @param body
 * @param headers
 * @param statusCode
 * @returns {{statusCode: *, headers: {Access-Control-Allow-Origin: string, Access-Control-Allow-Credentials: boolean}, body}}
 */
function buildResponse(body, headers, statusCode) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
			...headers
    },
    body: JSON.stringify(body),
  };
}
