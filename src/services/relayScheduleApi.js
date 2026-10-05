import { deviceApiRequest } from './apiClient';

export const relayScheduleApi = Object.freeze({
  read: (relayNumber, unitId) => deviceApiRequest(`/relays/${relayNumber}/schedule`, unitId),
  update: (relayNumber, schedule, unitId) => deviceApiRequest(`/relays/${relayNumber}/schedule`, unitId, {
    method: 'PUT',
    body: JSON.stringify(schedule),
  }),
});
