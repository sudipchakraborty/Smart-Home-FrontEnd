import { apiRequest } from './apiClient';

export const relayScheduleApi = Object.freeze({
  read: (relayNumber) => apiRequest(`/relays/${relayNumber}/schedule`),
  update: (relayNumber, schedule) => apiRequest(`/relays/${relayNumber}/schedule`, {
    method: 'PUT',
    body: JSON.stringify(schedule),
  }),
});
