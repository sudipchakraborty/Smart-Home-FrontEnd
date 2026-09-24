import { apiRequest } from './apiClient';

export const outputAccessApi = Object.freeze({
  read: () => apiRequest('/output-access'),
  update: (outputName, enabled) => apiRequest(`/output-access/${outputName}`, { method: 'PUT', body: JSON.stringify({ enabled }) }),
});
