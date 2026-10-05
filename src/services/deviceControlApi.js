import { deviceApiRequest } from './apiClient';

export const deviceControlApi = Object.freeze({
  readRelayStatus: (unitId) => deviceApiRequest('/device-control/relay-status', unitId),
  reset: (unitId) => deviceApiRequest('/device-control/reset', unitId, { method: 'POST' }),
});
