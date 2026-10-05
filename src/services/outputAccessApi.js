import { deviceApiRequest } from './apiClient';

export const outputAccessApi = Object.freeze({
  read: (unitId) => deviceApiRequest('/output-access', unitId),
  update: (outputName, enabled, unitId) => deviceApiRequest(`/output-access/${outputName}`, unitId, { method: 'PUT', body: JSON.stringify({ enabled }) }),
});
