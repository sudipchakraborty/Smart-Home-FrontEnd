export const deviceModules = [
  { id: 'relay-1', name: 'Relay 1', type: 'relay', relayNumber: 1, schedulable: true },
  { id: 'relay-2', name: 'Relay 2', type: 'relay', relayNumber: 2, schedulable: true },
  { id: 'buzzer', name: 'Buzzer', type: 'buzzer', schedulable: false },
  { id: 'led', name: 'LED', type: 'led', schedulable: false },
];

export const appConfig = Object.freeze({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:4000/api',

});
