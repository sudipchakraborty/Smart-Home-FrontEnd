import { apiRequest } from './apiClient';

export const deviceClockApi = Object.freeze({
  read: () => apiRequest('/device-clock'),
  update: (dateTime) => apiRequest('/device-clock', {
    method: 'PUT',
    body: JSON.stringify({ dateTime }),
  }),
});
