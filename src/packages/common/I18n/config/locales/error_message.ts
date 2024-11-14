export const error_message = {
  en: {
    HTTP_SERVER_ERROR: 'The server encountered an internal error',
    HTTP_REQUEST_TIMEOUT: 'Network error',
    HTTP_BAD_REQUEST: 'Your browser sent a request that this server could not understand',
    HTTP_UNAUTHORIZED: 'You are not authorized',
    HTTP_FORBIDDEN: "You don't have permission to access this resource",
    HTTP_NOT_FOUND: 'Not found',
    HTTP_UNPROCESSABLE_ENTITY: 'The server was unable to process the request',
    HTTP_TOO_MANY_REQUESTS: 'You have made too many requests in a given amount of time',
    HTTP_BAD_GATEWAY:
      'The server received an invalid response from a upstream server while attempting to fulfill the request',
    HTTP_GATEWAY_TIMEOUT:
      'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server it accessed in attempting to complete the request',
    UNKNOWN: 'Something went wrong',
  },
} as const;
