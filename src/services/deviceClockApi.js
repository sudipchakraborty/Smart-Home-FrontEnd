import { deviceApiRequest } from './apiClient';

export const deviceClockApi = Object.freeze({
  read: (unitId) => deviceApiRequest('/device-clock', unitId),
  update: (dateTime, unitId) => deviceApiRequest('/device-clock', unitId, {
    method: 'PUT',
    body: JSON.stringify({ dateTime }),
  }),
});
