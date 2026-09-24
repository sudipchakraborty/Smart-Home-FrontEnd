## 2026-09-24 - Planned frontend Modbus device controls

- Add an output-control panel for register `0`: Relay 1, Relay 2, buzzer, TX LED, RX LED, and status LED.
- Add frontend API and hook support for reading output state and updating one output bit with read-after-write verification.
- Align the existing relay schedule and device-clock screens with the supplied edge register map through backend APIs.
- Expected files: `src/services/outputAccessApi.js`, `src/hooks/useOutputAccess.js`, `src/components/OutputAccessEditor.jsx`, `src/App.jsx`, and `src/App.css`.
- Verification planned: `npm run lint` and `npm run build`, followed by a Vite development-server startup check.

## 2026-09-24 - Frontend Modbus device controls implemented

- Added `src/services/outputAccessApi.js`, `src/hooks/useOutputAccess.js`, and `src/components/OutputAccessEditor.jsx`.
- Added responsive controls for Relay 1, Relay 2, buzzer, TX LED, RX LED, and status LED, backed by register `0` APIs.
- Existing date/time and relay schedule editors now use the corrected backend register configuration.
- Validation: `npm run lint` PASS, `npm run build` PASS, Vite returned HTTP 200 on port 5173.
- Live serial device behavior remains pending because COM15 hardware was not connected during this run.

## 2026-09-24 - Fixed browser/API origin mismatch

- Backend now allows the frontend when opened at either `http://localhost:5173` or `http://127.0.0.1:5173`.
- The frontend can now reach the backend device-clock API from the documented `127.0.0.1` Vite URL.
- Live backend verification returned HTTP 200 from the COM15 device-clock read path.

## 2026-09-24 - Added visible device configuration tab

- Added top-level `Control` and `Configuration` tabs to `src/App.jsx`.
- Added a visible `Scan Modbus Devices` action and tabular scan result area in the Configuration tab.
- The first scan uses the existing backend Modbus status endpoint and reports the configured COM15 device while the full identity scan API is added.

## 2026-09-24 - Real 0-to-255 Modbus scan

- Configuration scan now probes slave IDs `0..255` through the backend.
- Added circular percentage progress with the current address during scanning.
- Table populates only with responding devices and decoded identity registers.

## 2026-09-24 - Configurable scan range and one-second probes

- Added scan start and scan end textboxes, defaulting to slave IDs `1` and `32`.
- Scan requests now send the selected range to the backend.
- Progress display reports the current address within the selected range.

## 2026-09-24 - Default scan range 1 to 32

- Added start/end scan address fields defaulting to `1` and `32`.
- Each address probe now uses a one-second backend timeout.
- Progress and scan request use the selected range.

## 2026-09-24 - Realtime results and row identity editor planned

- Found devices will be appended to the table during scanning.
- Clicking a row will open device details with editable device ID and device name fields.
- Update will save the edited identity and refresh the selected row.

## 2026-09-24 - Realtime device rows and row editor implemented

- Newly responding devices are added to the table during scanning.
- Clicking a row opens device details with editable Device ID and Device Name fields.
- Update writes through the backend and refreshes the row from readback.

## 2026-09-24 - Planned scan stop control

- Add a Scan stop button that cancels the active backend scan at any point between address probes.
- Keep already discovered devices visible and report that the scan was stopped.

## 2026-09-24 - Scan stop control implemented

- Added a Stop scan button while scanning.
- Stopping preserves the realtime device rows already found.

## 2026-09-24 - Updated displayed Modbus port to COM9

- Updated the frontend documentation for the backend Modbus port change from COM15 to COM9.

## 2026-09-24 - Planned animated Modbus scan

- Replace the status-only scan with a `0..255` slave-ID scan API.
- Show an elegant circular progress indicator with current address and percentage while scanning.
- Populate the device table only with responding Modbus devices.
