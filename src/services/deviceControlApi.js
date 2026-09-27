import { apiRequest } from './apiClient';

export const deviceControlApi = Object.freeze({
  readRelayStatus: () => apiRequest('/device-control/relay-status'),
  reset: () => apiRequest('/device-control/reset', { method: 'POST' }),
});
