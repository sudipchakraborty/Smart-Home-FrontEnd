# Smart Home Frontend

React/Vite control panel organized as room nodes with reusable modules beneath each node. Relay 1 and Relay 2 support schedules; buzzer and LED are separate modules for future control APIs.

## Run locally

Start the backend first, then run `npm install`, copy `.env.example` to `.env`, and run `npm run dev`. Open `http://127.0.0.1:5173`.

## Structure

```text
src/
  components/    Reusable node, module, time, status, and schedule controls
  config/        API URL and selectable device configuration
  hooks/         Relay schedule state and synchronization workflow
  services/      Framework-independent backend API client
  App.jsx        Thin screen composition
```

Select a room node first and then choose Relay 1 or Relay 2 beneath it. Buzzer and LED are not sent to relay-register routes. The backend writes and reads back both relay values before reporting success. Close ModScan while using this UI because COM15 supports one controlling application at a time.

## Progress

- [x] Modular React/Vite foundation and API service
- [x] Room-node selector with Relay 1, Relay 2, buzzer, and LED modules
- [x] Relay schedule selector and second-precision time controls
- [x] Device read, update, readback, refresh, and error states
- [ ] Bedroom node backend/Modbus address mapping
- [ ] Buzzer and LED control APIs
- [ ] Authentication and remote access
