export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly type: 'client' | 'server' | 'network' | 'unknown',
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function buildApiError(error: unknown): ApiError {
  // Network / no-response error (axios throws AxiosError with no response)
  if (isAxiosLikeError(error)) {
    if (!error.response) {
      return new ApiError(
        0,
        'network',
        'Network error: unable to reach the server. Check your internet connection.',
        error
      );
    }

    const status: number = error.response.status;

    if (status >= 400 && status < 500) {
      const messages: Record<number, string> = {
        400: 'Bad request: the server could not understand the request.',
        401: 'Unauthorized: please check your credentials.',
        403: 'Forbidden: you do not have permission to access this resource.',
        404: 'Not found: the requested resource does not exist.',
        408: 'Request timeout: the server took too long to respond.',
        429: 'Too many requests: please slow down and try again later.',
      };
      return new ApiError(
        status,
        'client',
        messages[status] ?? `Client error (${status}).`,
        error
      );
    }

    if (status >= 500) {
      const messages: Record<number, string> = {
        500: 'Internal server error: something went wrong on the server.',
        502: 'Bad gateway: invalid response from upstream server.',
        503: 'Service unavailable: the server is temporarily offline.',
        504: 'Gateway timeout: the server did not respond in time.',
      };
      return new ApiError(
        status,
        'server',
        messages[status] ?? `Server error (${status}).`,
        error
      );
    }
  }

  if (error instanceof Error) {
    return new ApiError(0, 'unknown', error.message, error);
  }

  return new ApiError(0, 'unknown', 'An unexpected error occurred.', error);
}

interface AxiosLikeError {
  response?: { status: number; data?: unknown };
  request?: unknown;
  message?: string;
}

function isAxiosLikeError(error: unknown): error is AxiosLikeError {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'request' in error)
  );
}
