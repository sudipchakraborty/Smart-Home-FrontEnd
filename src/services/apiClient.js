import { appConfig } from '../config/appConfig';

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => null);

  if (!response.ok || body?.success === false) {
    throw new ApiError(body?.error?.message ?? `Request failed with status ${response.status}`, {
      status: response.status,
      code: body?.error?.code,
    });
  }
  return body.data;
};
