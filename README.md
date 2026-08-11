# Robot Market Offline UI for ESP32

A responsive, offline-first administration interface for Robot Market vending machines. The UI is built with plain HTML, CSS, and JavaScript so it can be served directly by an ESP32 web server without a heavy client runtime.

> [!WARNING]
> Development behavior is controlled by `VITE_DEV_MODE`. Mock data and automatic sign-in are enabled by `.env.development` and disabled by `.env.production`. Verify every real API operation before deploying to a device.

## Features

- Password and one-time-password authentication
- Password recovery and first-login password change
- Sales, transaction, inventory, and device-health dashboard
- Product price and channel inventory management
- Client and wallet balance management
- Wi-Fi station, access point, date, time, and POS settings
- Payment, auxiliary hardware, and elevator configuration
- Factory, MQTT, DNS, and OTA settings
- Device firmware, hardware, memory, and network information
- Notifications, logs, and real-time events
- Persian RTL interface
- Mobile drawer navigation and a fixed desktop sidebar from `992px`

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Vite development server
- Locally hosted Vazirmatn font

All core UI assets are stored locally. The interface does not require a CDN or an internet connection to render.

## Requirements

- Node.js 20.19+, 22.12+, or a newer supported release
- npm
- Network access to an ESP32 when testing the real API

## Local development

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The server listens on `0.0.0.0`, so it can also be reached from another device on the same network when the local firewall allows it.

## Production build

Create the optimized multi-page production output:

```bash
npm run build
```

The `dist` directory contains:

- `index.html` — login, OTP, and password recovery;
- `app.html` — the main administration panel;
- minified, content-hashed JavaScript and static assets under `dist/assets`.

Production JavaScript is bundled with identifier mangling enabled. Public names required by inline HTML event handlers are intentionally preserved on `window`; internal function and variable names are shortened. Source maps are disabled.

Preview the production output locally:

```bash
npm run preview
```

## Connecting to an ESP32

During local development, Vite proxies `/api` requests to the target configured in `vite.config.js`:

```js
proxy: {
  "/api": {
    target: "http://192.168.1.118",
    changeOrigin: true,
  },
}
```

Replace `target` with the IP address of the ESP32 and restart the development server.

When the UI is hosted directly by the ESP32, API URLs remain relative and are sent to the same host. The Vite proxy is only needed for local development.

## Development mode and mock data

Development mode is controlled by Vite environment files:

```dotenv
# .env.development
VITE_DEV_MODE=true

# .env.production
VITE_DEV_MODE=false
```

Both JavaScript entry modules derive their flag from the environment:

```js
const DEVELOP_MODE = import.meta.env.VITE_DEV_MODE === "true";
```

When development mode is enabled:

- the login page creates a development token after a short delay;
- real authentication is bypassed;
- `src/app.js` dynamically imports development data from `src/mock-data.mjs`;
- dashboard, clients, balances, settings, prices, device information, service configuration, and factory views use mock data;
- the development route is visible in navigation.

Production mode does not import or read the mock-data module. Run Vite with the appropriate mode instead of editing application source.

## Application routes

| Hash route | View |
| --- | --- |
| `#/` | Dashboard |
| `#/notifications` | Notifications |
| `#/prices` | Price management |
| `#/clients` | Client management |
| `#/balance` | Wallet balances |
| `#/settings` | General and network settings |
| `#/factory` | Factory settings |
| `#/logs` | Device logs |
| `#/info` | Device information |
| `#/service-configuration` | Service configuration |
| `#/dev` | Development tools |

Hash routing is used so the ESP32 does not need server-side route fallback handling.

## Project structure

```text
.
├── index.html                    # Login, OTP, and password recovery
├── app.html                      # Administration panel and hash router
├── src/
│   ├── login.js                  # Login application entry
│   ├── app.js                    # Main panel application entry
│   └── mock-data.mjs             # Development-only mock data module
├── .env.development              # Enables development mode
├── .env.production               # Disables development mode
├── document-Api-RobotMarket.txt  # Frontend API contract
├── vite.config.js                # Development server and API proxy
├── package.json                  # npm metadata and commands
├── fonts/                        # Local fonts
├── images/                       # Logo and favicon
└── assets/                       # Additional UI assets
```

## Authentication

After a successful login, the client stores the token in `localStorage` as `rm_token`. Protected requests send it using:

```http
Authorization: Bearer <token>
```

A `401 Unauthorized` response clears the session and redirects the user to `index.html`.

## API documentation

The frontend-facing API contract is documented in [`document-Api-RobotMarket.txt`](./document-Api-RobotMarket.txt). Keep the document, firmware implementation, and frontend calls synchronized.

## Deployment checklist

1. Build or serve with `VITE_DEV_MODE=false` (the default in `.env.production`).
2. Confirm that the automatic development login and mock-data import are inactive.
3. Verify that all endpoint paths match the installed firmware.
4. Connect mock-only client, settings, and Wi-Fi operations to real APIs.
5. Copy the complete contents of `dist` to the device. Do not deploy files directly from `src`.
6. Test authentication, logout, API failures, and `401` handling on the physical device.

> [!IMPORTANT]
> Minification and identifier mangling are obfuscation measures, not a security boundary. Never place passwords, permanent API secrets, private keys, or authorization decisions in frontend code.

## Tests

No automated test suite is currently configured, and `test.js` is empty. Recommended initial coverage:

- password and OTP authentication;
- protected routes without a token;
- API error states;
- route rendering;
- settings and client mutations;
- Persian RTL rendering;
- mobile, tablet, and desktop navigation.

## License

This project is distributed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See [`LICENSE`](./LICENSE).

> [!NOTE]
> The `license` field in `package.json` currently says `ISC`, which does not match the repository license. Change it to `AGPL-3.0` before publishing the package.
