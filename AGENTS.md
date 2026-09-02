# Packing App — Frontend

This repository houses the React frontend for the Packing App, a travel packing list planner. It pairs with the FastAPI backend at `/Users/carlyhayter/PycharmProjects/PythonProject2`.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Router**: React Router DOM v7 (`createBrowserRouter`)
- **HTTP Client**: Axios (interceptors in `src/services/api.ts`)
- **Styling**: Plain CSS (no Tailwind, no CSS-in-JS). Global resets in `src/index.css`; component-scoped stylesheets alongside components.
- **Date Math**: `date-fns` (installed for calendar math; no external calendar UI library).
- **State Management**: Redux Toolkit with slices for domain state (travelers, trips, etc.). Use `useAppDispatch` and `useAppSelector` from `src/hooks/reduxHooks.ts`.
- **Authentication**: Context-based (`AuthContext.tsx`) storing `access_token` and `refresh_token` in `localStorage`.

## Project Structure

```
├── public/
│   └── icons.svg          # SVG sprite for inline <use> icons
├── src/
│   ├── app/
│   │   └── routes.tsx     # React Router route tree
│   ├── assets/
│   │   ├── icons/         # SVG assets (laundry.svg, etc.)
│   │   ├── locations/     # Destination photos (sydney.jpeg, etc.)
│   │   └── plugs/         # Power plug type images (a.png … n.png)
│   ├── components/
│   │   ├── animations/    # Reusable canvas/CSS animations
│   │   ├── auth/            # Login, create user, 2FA, password reset
│   │   ├── basic/           # Buttons, links, calendar, tooltip
│   │   ├── home/            # Homepage, Dashboard, TripCards, WeatherOverview
│   │   ├── layouts/         # RootLayout, AuthLayout, InternalLayout
│   │   ├── modals/          # Modal system, traveler edit, routine edit
│   │   ├── packingPlanner/  # Packing list UI
│   │   ├── travelerPlanner/ # Traveler CRUD page
│   │   ├── tripPlanner/     # Date/destination picker, trip creation flow
│   │   ├── trips/           # Trip Detail page + sub-components
│   │   ├── accountSettings/ # Account settings page
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   ├── api.ts           # Axios instance + interceptors (baseURL from .env)
│   │   ├── auth.ts          # Auth API wrappers
│   │   └── trips.ts         # Trip API wrappers
│   ├── types/
│   │   └── trip.ts          # Shared domain types (Trip, Destination, WeatherData, etc.)
│   ├── index.css            # Global CSS variables, resets, font faces
│   └── main.tsx             # Entry point (StrictMode + AuthProvider + Router)
├── .env / .env.local / .env.production   # Vite env files (VITE_API_BASE_URL)
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── eslint.config.js
```

## How to Run Locally

### Prerequisites

- Node.js **20.19+** (the project uses Vite 6 features that require Node 20; Node 18 will fail).
- `npm` or compatible package manager.

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure local API URL
#    .env.local is gitignored and auto-loaded by Vite in dev mode.
echo 'VITE_API_BASE_URL=http://localhost:8000' > .env.local

# 3. Start the dev server
npm run dev
# => http://localhost:5173/
```

### Build

```bash
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npx tsc -b           # TypeScript build (catches type errors)
```

## API Integration

All backend communication flows through `src/services/api.ts`:

- Base URL is read from `import.meta.env.VITE_API_BASE_URL`.
- Request interceptor injects `Authorization: Bearer <access_token>`.
- Response interceptor catches 401, attempts refresh via `/auth/refresh`, and retries the original request.
- Auth helpers are in `src/services/auth.ts`.
- Trip-specific endpoints are in `src/services/trips.ts`.

**Do not** create new Axios instances or direct `fetch` calls outside `src/services/`.

## Component & File Conventions

### 1. One Component, One File (or One Folder)

- Keep a component and its dedicated stylesheet together:
  - `Component/` folder containing `Component.tsx`, `SubComponent.tsx`, `styles/`

### 2. Naming

- Components: PascalCase (`TripPage.tsx`, `DestinationCard.tsx`)
- Utilities / hooks: camelCase (`utils.tsx`, `useAuth.ts`)
- CSS files: kebab-case matching component name (`tripDetail.css`, `tripPlanner.css`)

### 3. CSS Patterns

- **Global variables** live in `src/index.css` (colors, spacing, border-radius, font stacks).
- **Component styles** are imported directly into the component file.
- **No Tailwind / no CSS-in-JS library**. Use plain class names.
- Prefer BEM-ish naming when scoped: `.trip-summary`, `.trip-summary-card`, `.trip-summary-card--expanded`.

### 4. Icons

- The project uses an SVG sprite at `public/icons.svg` referenced via `<svg><use href="/icons.svg#icon-name" /></svg>`.
- Some components also import standalone SVGs from `src/assets/icons/`.

### 5. Types

- Shared domain types live in `src/types/trip.ts`.
- Prefer `interface` for object shapes, `type` for unions / aliases.
- Export all shared types; avoid `any`.

## Modal System

The modal architecture was refactored to support generic nested slide navigation.

### Files

- `src/components/modals/modal/Modal.tsx` — base overlay modal (props: `open`, `title`, `onClose`, `children`).
- `src/components/modals/modal/SlideModal.tsx` — slide container with `activePanel: number` (0-based) and `translateX(-${activePanel * 100}%)`.
- `src/components/modals/modal/ModalSlidePanel.tsx` — flex panel wrapper (`flex: 0 0 100%`).

### Rules

- **Panel components are pure content** — they do not wrap themselves in `ModalSlidePanel`. The parent `SlideModal` composes the panels.
- **Navigation is numeric**, not string-based. Consumers pass `activePanel={0|1|2...}`.
- **Panel components are decoupled** from the modal shell. They receive `onNavigateNext` / `onNavigateBack` callbacks rather than a `setView` setter.
- CSS transition: `0.35s cubic-bezier(0.25, 0.1, 0.25, 1)`.

### Current Panels

- `TravelerEditSlidePanel` — traveler form (name, temp preferences, routines)
- `RoutineEditSlidePanel` — routine creation form (name, items list)

## Calendar / Date Picker

A custom-built two-month range calendar (no external calendar UI library).

- **Location**: `src/components/basic/calendar.tsx` + `src/components/basic/styles/calendar.css`
- **Behavior**: two-month side-by-side view, hover preview, range selection, "Done" button (no auto-close on range completion).
- **Math**: `date-fns` handles month navigation, leap years, and date differences.
- **Same-day trips allowed**: `nightsBetween` returns `0` when arrival === departure.
- **Nights are visual only** (no incrementor buttons). Derived automatically from arrival/departure dates.
- **Chevrons**: Google Flights-style chevrons next to each date for ±1 day nudging.

## Temperature Slider

- **Location**: `src/components/modals/TempSlider.tsx`
- **Handles**: 4 draggable handles (Cold, Cool, Warm, Hot) via pointer events.
- **Defaults**: Cold=32°F, Cool=55°F, Warm=75°F, Hot=90°F.
- **Unit toggle**: C/F switch in `TravelerEditModal.tsx`; values convert mathematically on toggle.
- **Enforcement**: adjacent handles maintain a 1-degree gap; slider clamps out-of-order drags.

## Routing

Defined in `src/app/routes.tsx` using `createBrowserRouter`:

| Path                      | Layout         | Component        |
| ------------------------- | -------------- | ---------------- |
| `/`                       | RootLayout     | Homepage         |
| `/auth/login`             | AuthLayout     | Login            |
| `/auth/create_user`       | AuthLayout     | CreateUser       |
| `/auth/retrieve_password` | AuthLayout     | RetrievePassword |
| `/auth/reset_password`    | AuthLayout     | ResetPassword    |
| `/auth/two_factor`        | AuthLayout     | TwoFactorAuth    |
| `/dashboard`              | InternalLayout | Dashboard        |
| `/trip_planner`           | InternalLayout | TripPlanner      |
| `/trip_summary`           | InternalLayout | TripPlanner      |
| `/packing_planner`        | InternalLayout | PackingPlanner   |
| `/traveler_planner`       | InternalLayout | TravelerPlanner  |
| `/trips/:trip_id`         | InternalLayout | TripPage         |
| `/account_settings`       | InternalLayout | AccountSettings  |

## Build / Type Checking

- `npx tsc -b` is the source of truth for TypeScript errors.
- Pre-existing `unused-vars` warnings in untouched files (e.g., `DestinationsSection.tsx`, `SectionLink.tsx`, `TripSection.tsx`) are known and should not block commits.
- All newly modified files compile cleanly.

## What NOT To Do

1. **Do not add Tailwind, Styled Components, or Emotion**. The project uses plain CSS.
2. **Do not add an external calendar library** (e.g., `react-datepicker`, `react-calendar`). The custom two-month calendar is the canonical implementation.
3. **Do not add Material-UI / Ant Design / Bootstrap**.
4. **Do not create ad-hoc Axios instances**. Route all HTTP through `src/services/api.ts`.
5. **Do not store tokens in `sessionStorage` or cookies**. Use `localStorage` keys `access_token` and `refresh_token` to match the interceptor logic.
6. **Do not mutate state directly** in React components. Follow standard React patterns; use Redux for global domain state, `useState` for local UI/form draft state.
7. **Do not use `var`**. Prefer `const`; use `let` only when reassignment is required.

## Current State (as of last update)

### Completed

- Calendar: two-month view, range selection, hover preview, "Done" footer, dual-month CSS layout
- DestinationCard: unified date trigger row, calendar icon, nudge chevrons, nights display, laundry toggle
- Trip Detail page: `TripSummary`, `DestinationSummaryCard` (expandable daily weather), `TravelersSection`
- Temperature slider: 4-handle draggable, pointer events, C/F toggle with live conversion
- Modal system: generic `SlideModal` with numeric `activePanel`, decoupled `ModalSlidePanel`
- Traveler + Routine slide panels wired to dashboard and trip detail "Add Traveler" buttons
- `date-fns` installed and used for calendar math
- Account Settings page: dummy framework with profile, password, preferences, notifications, and danger zone sections

### In Progress

- Connecting `TripPage` to the real backend endpoint (`GET /trips/{trip_id}`) once the backend API is ready.

### Known Issues

- `TripPage` currently renders with mock data; API integration is pending backend availability.
- Vite build requires Node 20.19+. Local environments on Node 18 will fail with compatibility errors.

## Reference Documents

- [Backend AGENTS.md](../packing-app-backend/AGENTS.md) — domain model, API contract, auth flow, environment rules.

## Critical Files Quick Reference

| File                                                 | Purpose                                      |
| ---------------------------------------------------- | -------------------------------------------- |
| `src/services/api.ts`                                | Axios instance, baseURL, interceptors        |
| `src/services/trips.ts`                              | Trip API wrappers                            |
| `src/app/routes.tsx`                                 | All page routes                              |
| `src/contexts/AuthContext.tsx`                       | Auth state, login/logout helpers             |
| `src/types/trip.ts`                                  | Shared domain types                          |
| `src/components/basic/calendar.tsx`                  | Two-month range calendar                     |
| `src/components/modals/modal/SlideModal.tsx`         | Generic multi-panel slide modal              |
| `src/components/modals/TempSlider.tsx`               | 4-handle temperature slider                  |
| `src/components/trips/TripPage.tsx`                  | Trip detail page composition                 |
| `src/components/accountSettings/accountSettings.tsx` | Account settings page                        |
| `vite.config.ts`                                     | Vite configuration (basic React plugin only) |
