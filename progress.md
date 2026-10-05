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

## 2026-09-27 - Planned Edge reset command and relay status controls

- Add a visible device reset action backed by the Edge `RESET` command registers `91..95`.
- Show Relay 1 and Relay 2 state from Edge status registers `96..97`.
- Add refresh/operation feedback and verify with lint/build; live hardware behavior remains dependent on a connected Edge device.

## 2026-09-27 - Edge reset command and relay status controls implemented

- Added a visible Relay 1/Relay 2 status panel with refresh support.
- Added a confirmation-protected Reset device action using the backend Edge command API.
- Validation: frontend lint PASS and production build PASS. Live hardware behavior remains pending a connected Edge device.

## 2026-09-27 - Shared V1/V2 Modbus map confirmed from supplied register deck

- Confirmed frontend schedule controls use the backend API for the supplied shared HH/MM/SS register map.
- No frontend register changes are required; V2 firmware must match the backend/deck contract.
## 2026-10-05 - Align Modbus connection label

- Plan: update the Kitchen Node connection label to slave ID 2, matching the working ModScan settings and backend configuration.
- Updated connection label to Modbus ID 2. Validation: frontend lint and production build passed.

## 2026-10-05 - Planned device identity form validation

- Validate Device ID as 1..3 decimal digits, with numeric value 1..247 to match the Edge address contract; send valid IDs padded to three digits.
- Limit Device Name to 18 characters and reject blank/whitespace-only names.
- Show field-level errors and block invalid submissions before calling the backend.
- Verify boundary values, production build, lint, and the rendered form where browser access is available.

### Completed and verified

- Device details now limits the ID input to 3 characters and requires decimal digits with value 1..247; submission pads valid shorter IDs to three digits for the Edge ASCII register contract.
- Device Name input now has an 18-character limit (previously 19), with blank-name rejection and a visible character counter.
- Added field-level error messages, invalid-field borders, and an explicit submission guard so invalid data never reaches the update API.
- Validation: frontend lint and production build passed; direct boundary checks passed for valid IDs, invalid digits/ranges, blank names, 18-character names, and 19-character rejection. git diff --check passed.
- Rendered browser verification could not run: browser runtime reported no browser available and its connection list was empty. Physical device update was not invoked.

## 2026-10-05 - Planned saved device selection in Control

- Load backend-saved scan results at startup and populate Control from actual devices instead of static room examples.
- Configuration restores the saved list, refreshes it after scans/identity edits, and indicates when results have been saved.
- Control selects a saved device and sends its unitId on schedule, date/time, output, relay-status, and reset requests.
- Reset device-specific UI state on selection; no device controls are shown until a saved device is selected. Empty inventory points to Configuration, and loading errors offer retry.
- Verify frontend lint/build and selected-device API request construction; record runtime/hardware verification boundaries.

### Completed and verified

- Replaced static Kitchen/Bedroom examples with the backend-saved device inventory. Control loads it at startup and displays actual names and Modbus addresses; empty inventory points to Configuration.
- Configuration restores saved devices and refreshes both pages after scan/identity edits. Scans save automatically; no duplicate scan can start while results are being saved. Stale scan polls cannot overwrite the finished list.
- All 8 Control API calls explicitly carry selected unitId. Schedule, date/time, outputs, status and reset therefore operate on the chosen saved device, not the backend default.
- Device selection resets device-specific state; relay changes reload schedules and ignore older read responses while preserving date/time edits. Inventory load errors show Retry.
- Verification: clean frontend lint and production build; API construction checks for all 8 selected-address calls; server-rendered dropdown check for actual name/ID; all 35 backend tests passed; git diff --check passed.
- Live backend is running updated code; frontend returns HTTP 200. Live scan of addresses 1..3 found no responding devices, leaving the initial saved JSON empty. Browser interactive/rendered and physical write verification remain pending. Future successful Configuration scans will populate Control automatically.
