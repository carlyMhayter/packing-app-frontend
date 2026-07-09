# frontend-wiring - Work Plan

## TL;DR (For humans)
<!-- Filled LAST, after the detailed plan below. -->

**What you'll get:** _pending_

**Why this approach:** _pending_

**What it will NOT do:** _pending_

**Effort:** _pending_
**Risk:** _pending_
**Decisions to sanity-check:** _pending_

Your next move: _pending_. Full execution detail follows below.

---

> TL;DR (machine): _pending_

## Scope

### Must have

1. Every `console.log` in production render paths listed in `.omo/drafts/frontend-wiring.md` findings is removed.
2. `src/components/home/dashboard/DestinationsSection.tsx` no longer defines or calls `subarraySum`; component renders identically to today (empty state).
3. `src/components/trips/TripPage.tsx` fetches via a new `getTripById(tripId)` in `src/services/trips.ts` — no `mockTripData` overwrite path exists in the source.
4. `src/components/trips/TripSummary.tsx` renders trip depart date from `Trip.start_date` and return date from `Trip.end_date`; no crash when either is undefined.
5. `src/components/trips/OverallConditions.tsx` has an explicit TypeScript function signature typed against `TripForecastPublic`; camelCase field names (`dayConditions`, `dayHigh`, …) are consumed and match `src/types/trip.ts`.
6. `src/app/routes.tsx` exports a `ProtectedRoute` wrapper used on every internal route; unauthenticated navigation to `/dashboard`, `/trip_planner`, `/trip_summary`, `/packing_planner`, `/traveler_planner`, `/trips`, `/trips/:tripId`, `/account_settings` redirects to `/auth/login`.
7. Every hamburger/dropdown link to `/account` becomes `/account_settings`; every link to `/settings` is removed. Applies to `RootLayout.tsx`, `AuthLayout.tsx`, `InternalLayout.tsx`.
8. `src/components/home/dashboard/dashboard.tsx` welcome header reads `user.name ?? user.email?.split("@")[0] ?? "User"` from `useAuth()`.
9. `src/components/tripPlanner/tripPlanner.tsx` uses `useAuth()` for `user_id` (no `2` literal remains); on save success navigates to `/trips/:tripId` with the newly-returned id; on failure shows the `saveError` banner.
10. `src/services/api.ts` reads `import.meta.env.VITE_API_BASE_URL`; `.env.local` uses `VITE_API_BASE_URL` and adds `VITE_USE_MOCKS=true`.
11. New service files exist: `src/services/travelers.ts`, `src/services/routines.ts`, `src/services/user.ts`. Each wrapper calls the real API and — only when `import.meta.env.VITE_USE_MOCKS === "true"` — returns a typed mock on network/404 error with `console.warn`.
12. `src/services/trips.ts` gains `getTripById`, `createTrip`, `updateTrip`, `deleteTrip`, and `mapTripPublicToDetail` — each with the same mock-fallback pattern.
13. New mock fixtures exist: `src/mocks/trips.ts`, `src/mocks/travelers.ts`, `src/mocks/routines.ts`, `src/mocks/user.ts` — all typed against domain types.
14. `src/types/trip.ts` defines `DestinationPublic` and `ForecastDestinationPublic` (concrete non-`any` shapes). New files `src/types/traveler.ts`, `src/types/routine.ts`, `src/types/user.ts` define the domain types.
15. `src/components/home/dashboard/TravelerSection.tsx` renders travelers fetched via `services/travelers.ts` (no commented fetch remains).
16. `src/components/home/dashboard/dashboard.tsx` Routines section fetches from `services/routines.ts` and lists real routines; "add a routine" opens the routine edit modal (not self-nav to `/dashboard`).
17. `src/components/trips/TripsListPage.tsx` fetches recent trips via a service call and renders a real list with loading/empty/error states.
18. `src/components/accountSettings/accountSettings.tsx` — every save button (Profile, Password, Preferences, Notifications, Delete Account) has an `onClick` calling the corresponding wrapper in `services/user.ts`. Initial state hydrates from `useAuth()` on mount.
19. `src/components/modals/travelerEdit/TravelerEditModal.tsx` accepts an `onSave` callback and persists a saved traveler via `services/travelers.ts` and a saved routine via `services/routines.ts`.
20. `src/components/modals/travelerEdit/TravelerEditSlidePanel.tsx` initial state is prop-driven (no hardcoded `"Carly"`, no hardcoded medications, no hardcoded `previousTrips`).
21. Duplicate `src/components/trips/TravelerSection.tsx` (singular) is deleted; unrouted `src/components/tripPlanner/tripSummary.tsx` is deleted.
22. `src/utils/trips.ts` guards `formatShortDate(undefined | null | "")` to return `""` and `calculateNights` to handle invalid inputs; unit tests under `test/` (mocha) cover both.
23. `npx tsc -b` completes with zero NEW errors (existing pre-existing warnings noted in AGENTS.md may remain).
24. `npm run dev` starts and every route in `src/app/routes.tsx` renders without a runtime crash in a smoke navigation (agent-executed).

### Must NOT have (guardrails, anti-slop, scope boundaries)

- **NO** implementation of `PackingPlanner` page — its `src/components/packingPlanner/packingPlanner.tsx` stays a 7-line empty div.
- **NO** implementation of `TravelerPlanner` page — its `src/components/travelerPlanner/travelerPlanner.tsx` stays a 7-line empty div.
- **NO** Google OAuth wiring on `login.tsx:55-58` or `createUser.tsx:48-51` — the console.log stubs stay.
- **NO** new package added to `package.json` (no Tailwind, no styled-components/emotion, no Zustand/Redux/MobX, no react-datepicker/react-calendar, no MUI/Ant Design/Bootstrap).
- **NO** direct `fetch()` call added anywhere outside `src/services/api.ts`.
- **NO** token relocation (stays in `localStorage` under keys `platypak_access_token` and `platypak_refresh_token`).
- **NO** visual redesign of any component — pixels stay identical modulo new loading/error states in wired components.
- **NO** replacement of the custom two-month `Calendar` with a library.
- **NO** hamburger/dropdown redesign beyond broken-link fix.
- **NO** backend code changes (this repo is frontend-only; backend contract mismatches are surfaced as service-layer mappers, not as backend fixes).
- **NO** removal of the existing `console.log` in `TripSection.tsx`, `TravelerSection.tsx`, `DestinationsSection.tsx`, `TripPage.tsx`, `tripPlanner.tsx` deferred to a later plan — they're removed in this plan.
- **NO** commit squashing during execution — worker commits per-todo, user squashes if desired.
- **NO** RootLayout/AuthLayout style changes beyond dropdown link edits.
- **NO** commit that leaves `npx tsc -b` broken.

## Verification strategy

> Zero human intervention — all verification is agent-executed.

- **Test decision**: tests-after. Utility unit tests under `test/*.test.ts` via existing `mocha` + `chai` setup (`package.json:7-11`). Component behavior verified by agent-executed manual QA (LSP + type-check + dev-server smoke) per todo.
- **Test framework**: `mocha` + `chai` (already in `package.json:18,29-30`); test files use `.test.ts` suffix and are picked up by `.mocharc.json`.
- **Type-check**: `npx tsc -b` from repo root (per AGENTS.md line 156) is the source of truth for TS errors. Zero new errors introduced.
- **Lint**: `npm run lint` — no new errors (existing warnings on untouched files may remain per AGENTS.md line 235).
- **Dev-server smoke**: `npm run dev` boots on Node 20.19+ (AGENTS.md line 60); agent hits each route via `curl -sI http://localhost:5173<route>` or Playwright, verifies HTTP 200 and no console error.
- **Evidence path per todo**: `.omo/evidence/task-<N>-frontend-wiring.<ext>` — stdout/stderr snapshots, screenshots, or type-check logs.

## Execution strategy

### Parallel execution waves

> Target 5-8 todos per wave.

- **Wave 1 (foundation, 8 todos):** env vars, domain types, mock fixtures, service files, utility null-guards. Todos 1-8 are independent of each other except type-file dependencies (todo 2 lands types before mocks/services import them). Suggested intra-wave ordering: todo 2 first, then todos 3-8 in parallel.
- **Wave 2 (critical bugs + auth guard, 6 todos):** independent of Wave 1 except where noted. Todos 9-14. Todo 13 (tripPlanner user_id + navigate) benefits from todo 4 (services/trips.ts extension) but works without it (existing `api.request` call remains valid).
- **Wave 3 (TripPage + Dashboard + List, 7 todos):** requires Wave 1 complete (services + types exist). Todos 15-21.
- **Wave 4 (AccountSettings + Modals, 6 todos):** requires Wave 1 complete. Todos 22-27. Can run in parallel with Wave 3.
- **Final verification wave (F1-F4)** after all 27 todos.

### Dependency matrix

| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 (env rename) | — | 4,5,6,7 (services read env) | 2,3,8,9,10,11,12,14 |
| 2 (types) | — | 3,4,5,6,7 | 1,8,9,10,11,12,14 |
| 3 (mocks) | 2 | 4,5,6,7 | 1,8,9,10,11,12,14 |
| 4 (services/trips.ts extend) | 1,2,3 | 13,16,17,20 | 5,6,7,8 (within Wave 1) |
| 5 (services/travelers.ts) | 1,2,3 | 18,26 | 4,6,7,8 |
| 6 (services/routines.ts) | 1,2,3 | 19,27 | 4,5,7,8 |
| 7 (services/user.ts) | 1,2,3 | 22,23,24,25 | 4,5,6,8 |
| 8 (utils null-guards + tests) | — | 17 (TripSummary uses formatShortDate) | 1,2,3,4,5,6,7 |
| 9 (delete dead code) | — | — | 10,11,12,13,14 |
| 10 (fix layout links) | — | — | 9,11,12,13,14 |
| 11 (ProtectedRoute) | — | — | 9,10,12,13,14 |
| 12 (Welcome name) | — | — | 9,10,11,13,14 |
| 13 (user_id + navigate) | — (softly 4) | — | 9,10,11,12,14 |
| 14 (remove console.logs) | — | — | 9,10,11,12,13 |
| 15 (OverallConditions types) | 2,4 | 16 | 17,18,19,20,21 |
| 16 (TripPage real API) | 2,4,15 | — | 17,18,19,20,21 |
| 17 (TripSummary dates) | 2,8 | — | 15,16,18,19,20,21 |
| 18 (TravelerSection wiring) | 5 | — | 15,16,17,19,20,21 |
| 19 (Routines section) | 6 | 27 | 15,16,17,18,20,21 |
| 20 (TripsListPage) | 2,4 | — | 15,16,17,18,19,21 |
| 21 (DestinationCard types alignment) | 2 | — | 15,16,17,18,19,20 |
| 22 (AccountSettings Profile) | 7 | — | 23,24,25,26,27 |
| 23 (AccountSettings Password) | 7 | — | 22,24,25,26,27 |
| 24 (AccountSettings Prefs+Notif) | 7 | — | 22,23,25,26,27 |
| 25 (Delete Account) | 7 | — | 22,23,24,26,27 |
| 26 (TravelerEditModal persist) | 5 | — | 22,23,24,25,27 |
| 27 (RoutineEditSlidePanel persist) | 6 | — | 22,23,24,25,26 |

## Todos

> Implementation + Test = ONE todo. Never separate.

- [x] 1. `src/services/api.ts` + `.env.local`: Rename `VITE_API_URL` → `VITE_API_BASE_URL`, add `VITE_USE_MOCKS=true` for dev — expect all future service wrappers to read the same env vars
  What to do: In `src/services/api.ts:1` replace `import.meta.env.VITE_API_URL` with `import.meta.env.VITE_API_BASE_URL`. In `.env.local:1` rename the key. Append `VITE_USE_MOCKS=true` on a new line in `.env.local`. Update `.env.production` if it exists and uses the old name (`grep VITE_API_URL /Users/carlyhayter/Documents/Coding/packing-app-frontend/.env.production`).
  Must NOT: touch any other file; introduce a `VITE_API_URL` fallback (clean rename); modify `.env` (public/marketing).
  Parallelization: Wave 1 | Blocked by: — | Blocks: 4,5,6,7
  References: `src/services/api.ts:1`; `.env.local:1`; AGENTS.md line 76 (`VITE_API_BASE_URL`).
  Acceptance criteria: `grep -rn 'VITE_API_URL' /Users/carlyhayter/Documents/Coding/packing-app-frontend/src /Users/carlyhayter/Documents/Coding/packing-app-frontend/.env.local` returns zero results; `grep -c 'VITE_API_BASE_URL' src/services/api.ts` returns `1`; `grep -c 'VITE_USE_MOCKS' .env.local` returns `1`.
  QA scenarios: **happy** — `npm run dev` boots and `api.request('/auth/me')` fires against `http://localhost:8000/auth/me` (verify via network tab or `console.log(API_BASE_URL)` temp print then revert). **failure** — set `VITE_API_BASE_URL=""` in `.env.local`, restart dev, expect `TypeError: Failed to fetch` or CORS error on any request (proves the env is consumed). Evidence: `.omo/evidence/task-1-frontend-wiring.txt`.
  Commit: Y | `chore(env): rename VITE_API_URL to VITE_API_BASE_URL and add VITE_USE_MOCKS flag`

- [x] 2. `src/types/trip.ts` + new `src/types/{traveler,routine,user}.ts`: Add concrete types for `DestinationPublic`, `ForecastDestinationPublic`, `ConditionsMap`, plus new `Traveler`, `Routine`, `User` domain types — expect zero `any` in the new + edited type declarations
  What to do: In `src/types/trip.ts` (a) resolve TODO on line 129 by adding `interface DestinationPublic { id: number; name: string; label: string; arrival_date: string; departure_date: string; nights: number; has_laundry: boolean; order: number; address?: DestinationAddress; }` where `DestinationAddress` mirrors `CreateDestinationData['addressData']`; (b) resolve TODO on line 141 by defining `interface ConditionsMap { conditions: Record<string, number>; total_hours: number; }` and `interface ForecastDestinationPublic { destination_id: number; day_conditions: ConditionsMap; night_conditions: ConditionsMap; day_high: number; day_low: number; night_high: number; night_low: number; sunrise: string; sunset: string; }`; (c) replace `forecastDestinations: any` in `TripForecastPublic` (line 147) with `forecastDestinations: ForecastDestinationPublic[]`; (d) replace `destinations: any[]` in `TripPublic` (line 137) with `destinations: DestinationPublic[]`. Create `src/types/traveler.ts` with `interface Traveler { id: string; name: string; avatar?: string; type: "adult" | "child" | "infant" | "pet"; temperaturePreferences?: { cold: number; cool: number; warm: number; hot: number; unit: "F" | "C" }; medications?: string[]; routineIds?: string[]; }`. Create `src/types/routine.ts` with `interface Routine { id: string; name: string; items: string[]; travelerId?: string; }`. Create `src/types/user.ts` with `interface User { id: number; email: string; name?: string; username?: string; language?: string; timezone?: string; unit?: "imperial" | "metric"; notifications?: { email: boolean; weather: boolean; packing: boolean }; }`.
  Must NOT: use `any`; break existing `Trip` / `Traveler` / `WeatherData` types already used elsewhere (`Traveler` interface currently exists at `src/types/trip.ts:115-119` — RE-EXPORT the new one from `src/types/traveler.ts` and remove the duplicate in `trip.ts` OR keep the current one and add a supplementary `TravelerProfile` type — pick one and be consistent).
  Parallelization: Wave 1 | Blocked by: — | Blocks: 3,4,5,6,7
  References: `src/types/trip.ts:115-153`; existing `Traveler` at 115-119; TODOs at 129,141.
  Acceptance criteria: `npx tsc -b` passes with no new errors; `grep -n 'any' src/types/trip.ts src/types/traveler.ts src/types/routine.ts src/types/user.ts` returns only occurrences inside comments or none; `grep -c 'DestinationPublic' src/types/trip.ts` ≥ 1; `grep -c 'ForecastDestinationPublic' src/types/trip.ts` ≥ 1.
  QA scenarios: **happy** — import `DestinationPublic` in a new scratch `.ts` file, assign a valid object, expect no TS error; delete file. **failure** — deliberately import `DestinationPublic` from `./trip` with a wrong field, expect `npx tsc -b` to emit an error naming the missing field. Evidence: `.omo/evidence/task-2-frontend-wiring.txt`.
  Commit: Y | `feat(types): add DestinationPublic + ForecastDestinationPublic + Traveler/Routine/User domain types`

- [x] 3. `src/mocks/{trips,travelers,routines,user}.ts`: Create typed mock fixtures for offline / backend-unavailable development — expect each fixture to satisfy the corresponding domain type
  What to do: Create four files. `src/mocks/trips.ts` exports `mockTripList: TripPublic[]` and `mockTripDetail: TripPublic` (based on the shape TripPage's inlined mock already uses, but typed against `TripPublic`). `src/mocks/travelers.ts` exports `mockTravelers: Traveler[]` (at least 2 entries). `src/mocks/routines.ts` exports `mockRoutines: Routine[]` (at least 1 entry mirroring the "Standard Hygiene Routine" already hardcoded in `TravelerEditModal.tsx:26-42`). `src/mocks/user.ts` exports `mockUser: User` (the current hardcoded values from `accountSettings.tsx:5-7`).
  Must NOT: use `any`; embed dates via `new Date()` (use static ISO strings for reproducibility); import from `src/components/`.
  Parallelization: Wave 1 | Blocked by: 2 | Blocks: 4,5,6,7
  References: existing hardcoded shapes at `src/components/trips/TripPage.tsx:13-101`; `src/components/modals/travelerEdit/TravelerEditModal.tsx:26-42`; `src/components/accountSettings/accountSettings.tsx:5-7`.
  Acceptance criteria: `ls src/mocks/*.ts` returns 4 files; `npx tsc -b` passes with no new errors; each file has an explicit `: TripPublic[]` / `: Traveler[]` / `: Routine[]` / `: User` annotation on its export.
  QA scenarios: **happy** — `import { mockTripDetail } from './mocks/trips'` in a scratch file, `mockTripDetail.name` returns a string, no TS error; delete file. **failure** — deliberately misspell a required field in `mockTripDetail`; expect `npx tsc -b` to fail. Evidence: `.omo/evidence/task-3-frontend-wiring.txt`.
  Commit: Y | `feat(mocks): add typed fixtures for trips, travelers, routines, user`

- [x] 4. `src/services/trips.ts`: Extend with `getTripById`, `createTrip`, `updateTrip`, `deleteTrip`, `mapTripPublicToDetail`, each with `VITE_USE_MOCKS` fallback — expect `TripPage` and `TripsListPage` to consume these instead of raw `api.request`
  What to do: Add `getTripById(tripId: string): Promise<TripPublic>` calling `GET /trips/{tripId}`. Add `createTrip(payload): Promise<TripPublic>` calling `POST /trips/create`. Add `updateTrip(tripId, payload): Promise<TripPublic>` calling `PATCH /trips/{tripId}`. Add `deleteTrip(tripId): Promise<void>` calling `DELETE /trips/{tripId}`. Add pure `mapTripPublicToDetail(t: TripPublic): TripDetailData` that reshapes snake_case backend keys → camelCase UI keys. Each function follows the pattern: `try { const res = await api.request(url, ...); if (!res.ok) throw new Error(...); return res.json(); } catch (err) { if (import.meta.env.VITE_USE_MOCKS === "true") { console.warn(...); return mockFixture; } throw err; }`. Also update the pre-existing `fetchRecentTrips` to use the same fallback pattern.
  Must NOT: use direct `fetch()`; introduce a new axios/http lib; hard-code paths outside the function (paths are function-local); use `any`.
  Parallelization: Wave 1 | Blocked by: 1,2,3 | Blocks: 13,16,17,20
  References: `src/services/trips.ts:1-9`; `src/services/api.ts:22-42`; `src/types/trip.ts:71-78` (`Trip`), `130-139` (`TripPublic`), `121-127` (`TripDetailData`).
  Acceptance criteria: `grep -c 'export const' src/services/trips.ts` ≥ 5; `grep -c 'VITE_USE_MOCKS' src/services/trips.ts` ≥ 5; `npx tsc -b` passes; unit-test the mapper: create a fixture `TripPublic`, run `mapTripPublicToDetail(fixture)`, assert every field on `TripDetailData` is populated (mocha in `test/trips-service.test.ts`).
  QA scenarios: **happy** — call `getTripById("1")` in a scratch component, with `VITE_USE_MOCKS=true` and dev server pointed at unreachable URL, expect `mockTripDetail` returned + console.warn. **failure** — set `VITE_USE_MOCKS=false`, unreachable URL, expect thrown error. Evidence: `.omo/evidence/task-4-frontend-wiring.txt` (test output + type-check log).
  Commit: Y | `feat(services): extend trips.ts with getTripById/createTrip/updateTrip/deleteTrip and mapping`

- [x] 5. `src/services/travelers.ts`: New service for traveler CRUD with `VITE_USE_MOCKS` fallback — expect dashboard `TravelerSection` and `TravelerEditModal` to consume it
  What to do: New file exporting `listTravelers(limit?): Promise<Traveler[]>` (`GET /travelers`), `getTravelerById(id): Promise<Traveler>` (`GET /travelers/{id}`), `createTraveler(payload): Promise<Traveler>` (`POST /travelers`), `updateTraveler(id, payload): Promise<Traveler>` (`PATCH /travelers/{id}`), `deleteTraveler(id): Promise<void>` (`DELETE /travelers/{id}`). Each wraps `api.request` with the same try/catch fallback pattern used in todo 4.
  Must NOT: use `fetch()`; hardcode a user id; use `any`.
  Parallelization: Wave 1 | Blocked by: 1,2,3 | Blocks: 18,26
  References: pattern in `src/services/trips.ts` (as of todo 4 output); `src/types/traveler.ts` (created in todo 2); `src/mocks/travelers.ts` (created in todo 3).
  Acceptance criteria: `ls src/services/travelers.ts` exists; `grep -c 'export const' src/services/travelers.ts` = 5; `npx tsc -b` passes; each function has an explicit return-type annotation.
  QA scenarios: **happy** — call `listTravelers()` in scratch component with `VITE_USE_MOCKS=true` and unreachable URL, expect `mockTravelers` returned + console.warn. **failure** — same call with `VITE_USE_MOCKS=false`, expect thrown error. Evidence: `.omo/evidence/task-5-frontend-wiring.txt`.
  Commit: Y | `feat(services): add travelers.ts with CRUD + mock fallback`

- [x] 6. `src/services/routines.ts`: New service for routine CRUD with `VITE_USE_MOCKS` fallback — expect Routine edit modal and dashboard Routines section to consume it
  What to do: New file exporting `listRoutines(limit?): Promise<Routine[]>` (`GET /routines`), `getRoutineById(id): Promise<Routine>` (`GET /routines/{id}`), `createRoutine(payload): Promise<Routine>` (`POST /routines`), `updateRoutine(id, payload): Promise<Routine>` (`PATCH /routines/{id}`), `deleteRoutine(id): Promise<void>` (`DELETE /routines/{id}`). Same fallback pattern.
  Must NOT: use `fetch()`; couple to a specific traveler id at the service level (that's per-call).
  Parallelization: Wave 1 | Blocked by: 1,2,3 | Blocks: 19,27
  References: `src/types/routine.ts` (todo 2); `src/mocks/routines.ts` (todo 3); pattern in `src/services/trips.ts`.
  Acceptance criteria: `ls src/services/routines.ts` exists; `grep -c 'export const' src/services/routines.ts` = 5; `npx tsc -b` passes; explicit return-type annotations.
  QA scenarios: **happy** — call `listRoutines()` in scratch component with `VITE_USE_MOCKS=true` + unreachable URL, expect `mockRoutines` + console.warn. **failure** — same with mocks off, expect thrown error. Evidence: `.omo/evidence/task-6-frontend-wiring.txt`.
  Commit: Y | `feat(services): add routines.ts with CRUD + mock fallback`

- [x] 7. `src/services/user.ts`: New service for account/profile actions with `VITE_USE_MOCKS` fallback — expect AccountSettings to consume it
  What to do: New file exporting `getMe(): Promise<User>` (`GET /auth/me` — note: this endpoint already exists via `services/auth.ts:97-107`; the new wrapper is user-domain-scoped and can call the same endpoint), `updateProfile({ name, email, username }): Promise<User>` (`PATCH /user/profile`), `updatePassword({ current, next }): Promise<void>` (`POST /user/password`), `updatePreferences({ language, timezone, unit }): Promise<User>` (`PATCH /user/preferences`), `updateNotifications({ email, weather, packing }): Promise<User>` (`PATCH /user/notifications`), `deleteAccount(): Promise<void>` (`DELETE /user`). Same fallback pattern; on mock fallback for mutations, return `mockUser` (updated in-memory) or `void`.
  Must NOT: use `fetch()`; duplicate the auth token logic (rely on `api.request`); use `any`.
  Parallelization: Wave 1 | Blocked by: 1,2,3 | Blocks: 22,23,24,25
  References: `src/services/auth.ts:97-107` (existing `getCurrentUser`); `src/types/user.ts` (todo 2); `src/mocks/user.ts` (todo 3).
  Acceptance criteria: `ls src/services/user.ts` exists; `grep -c 'export const' src/services/user.ts` = 6; `npx tsc -b` passes; explicit return-type annotations.
  QA scenarios: **happy** — `updateProfile({name: "X", email: "x@y.z", username: "x"})` with mocks on + unreachable URL, expect updated `mockUser`. **failure** — same with mocks off, expect thrown error. Evidence: `.omo/evidence/task-7-frontend-wiring.txt`.
  Commit: Y | `feat(services): add user.ts for profile/password/preferences/notifications/delete`

- [x] 8. `src/utils/trips.ts` + `test/trip-utils.test.ts`: Add null-guards to `formatShortDate` and `calculateNights` + mocha unit tests — expect no crash on `undefined` / empty string input
  What to do: In `src/utils/trips.ts:1-8` change `formatShortDate` to `if (!dateStr) return ""; const date = new Date(dateStr); if (isNaN(date.getTime())) return ""; return date.toLocaleDateString(...)`. In `calculateNights:11-15` add `if (!start || !end) return 0; if (isNaN(new Date(start).getTime()) || isNaN(new Date(end).getTime())) return 0;`. Create `test/trip-utils.test.ts` importing `chai.expect`; test cases: `formatShortDate(undefined)` → `""`, `formatShortDate("")` → `""`, `formatShortDate("invalid")` → `""`, `formatShortDate("2026-06-15")` returns `"6/15/26"` or locale-appropriate; `calculateNights("", "")` → `0`, `calculateNights("2026-06-15", "2026-06-20")` → `5`. Also cover the TODO at `src/utils/trips.ts:10` by adding a JSDoc: `@param dateStr YYYY-MM-DD or ISO 8601`.
  Must NOT: change function signatures; add new exports; delete the TODO comment (upgrade it into a JSDoc); rely on external lib for date parsing (uses built-in Date + `date-fns` if already imported).
  Parallelization: Wave 1 | Blocked by: — | Blocks: 17
  References: `src/utils/trips.ts:1-16`; `package.json:11-14` (mocha scripts); `.mocharc.json`.
  Acceptance criteria: `npm test` passes with 5+ new passing tests; `grep -c '@param' src/utils/trips.ts` ≥ 1; `npx tsc -b` passes.
  QA scenarios: **happy** — run `npm test`, all tests green. **failure** — remove the null guard, expect `formatShortDate(undefined)` test to fail with a specific message. Evidence: `.omo/evidence/task-8-frontend-wiring.txt` (mocha output).
  Commit: Y | `fix(utils): add null-guards to formatShortDate and calculateNights + tests`

- [x] 9. `src/components/home/dashboard/DestinationsSection.tsx` + `src/components/trips/TravelerSection.tsx` + `src/components/tripPlanner/tripSummary.tsx`: Delete dead code — subarraySum demo, duplicate TravelerSection, unrouted empty stub
  What to do: In `DestinationsSection.tsx` remove the entire `subarraySum` function (lines 22-53) and its invocation on line 55, and remove the unused `sub` import from `date-fns` on line 2 (only kept if actually used elsewhere in this file — it's not). Delete `src/components/trips/TravelerSection.tsx` entirely (singular, unused). Delete `src/components/tripPlanner/tripSummary.tsx` entirely (empty stub, not routed). Verify neither deleted file is imported anywhere: `grep -rn "from.*TravelerSection'\"" src/ | grep -v TravelersSection` should return no results referring to `trips/TravelerSection`; `grep -rn "from.*tripPlanner/tripSummary" src/` should return no results.
  Must NOT: touch `TravelersSection.tsx` (plural, in same folder — kept); touch `TripSummary.tsx` (in `trips/` folder — kept); touch other functions in `DestinationsSection.tsx`.
  Parallelization: Wave 2 | Blocked by: — | Blocks: —
  References: `src/components/home/dashboard/DestinationsSection.tsx:2,21-55`; `src/components/trips/TravelerSection.tsx:1-46`; `src/components/tripPlanner/tripSummary.tsx:1-6`.
  Acceptance criteria: `ls src/components/trips/TravelerSection.tsx` returns "No such file"; `ls src/components/tripPlanner/tripSummary.tsx` returns "No such file"; `grep -c 'subarraySum' src/components/home/dashboard/DestinationsSection.tsx` = 0; `npx tsc -b` passes; `npm run dev` boots.
  QA scenarios: **happy** — navigate to `/dashboard`, verify Destinations section renders "No trips saved" empty state without console errors. **failure** — leave `subarraySum` in and observe console runs it on every render (baseline before deletion). Evidence: `.omo/evidence/task-9-frontend-wiring.txt`.
  Commit: Y | `chore(cleanup): remove subarraySum demo and duplicate/empty stub files`

- [x] 10. `src/components/layouts/RootLayout.tsx` + `AuthLayout.tsx` + `InternalLayout.tsx`: Fix broken dropdown links — `/account` → `/account_settings`, remove `/settings`
  What to do: In `RootLayout.tsx:56` change `to="/account"` → `to="/account_settings"`; delete the `<Link to="/settings">Settings</Link>` block at lines 59-61. In `AuthLayout.tsx:42` change `to="/account"` → `to="/account_settings"`; delete `<Link to="/settings">Settings</Link>` at line 45. In `InternalLayout.tsx:43` change `to="/account"` → `to="/account_settings"` (there is no `/settings` link in InternalLayout — verify with grep).
  Must NOT: touch any other link; touch the `href` on `<a>` tags in `TripSection.tsx`; add a new `/settings` route.
  Parallelization: Wave 2 | Blocked by: — | Blocks: —
  References: `src/components/layouts/RootLayout.tsx:56-61`; `src/components/layouts/AuthLayout.tsx:42-45`; `src/components/layouts/InternalLayout.tsx:43`; `src/app/routes.tsx:72-75` (`/account_settings` route).
  Acceptance criteria: `grep -rn 'to="/account"' src/components/layouts/` returns zero results; `grep -rn 'to="/settings"' src/components/layouts/` returns zero results; `grep -c 'to="/account_settings"' src/components/layouts/` ≥ 3; `npx tsc -b` passes.
  QA scenarios: **happy** — click hamburger dropdown on `/` (unauth'd), click "Account", land on `/account_settings` (should redirect to login post-todo-11). **failure** — click "Settings" link → should not exist (visual verification). Evidence: `.omo/evidence/task-10-frontend-wiring.txt` (screenshots).
  Commit: Y | `fix(layouts): correct broken /account and /settings dropdown links`

- [x] 11. `src/app/routes.tsx`: Add `<ProtectedRoute>` wrapper redirecting unauthenticated users to `/auth/login` — expect all internal routes to enforce it
  What to do: In `src/app/routes.tsx` define `function ProtectedRoute({ children }: { children: React.ReactNode }) { const { isAuthenticated, isLoading } = useAuth(); if (isLoading) return <LoadingDots />; if (!isAuthenticated) return <Navigate to="/auth/login" replace />; return <>{children}</>; }` (imports: `Navigate` from `react-router-dom`, `useAuth` from `../contexts/AuthContext`, `LoadingDots` from `../components/basic/loading`). Wrap the `InternalLayout` element definitions at lines 37-75 in `ProtectedRoute` — cleanest approach is to define a `RequireAuth` route element and use `element:` instead of `Component:` for the internal layout, or wrap the `Component` at layout-level: `Component: () => <ProtectedRoute><InternalLayout /></ProtectedRoute>`. Choose the latter (minimal API surface change).
  Must NOT: modify `InternalLayout.tsx`; modify `AuthContext.tsx`; require re-render loops (the `isLoading` gate prevents flicker); protect `/` or `/auth/*` routes.
  Parallelization: Wave 2 | Blocked by: — | Blocks: —
  References: `src/app/routes.tsx:36-75`; `src/contexts/AuthContext.tsx:20-64` (already provides `isAuthenticated`, `isLoading`); `src/components/basic/loading.tsx`.
  Acceptance criteria: `grep -c 'ProtectedRoute' src/app/routes.tsx` ≥ 8 (definition + 7 usages, or 1 definition + wrapped InternalLayout used everywhere); `npx tsc -b` passes; visit `/dashboard` in an incognito window → redirected to `/auth/login`.
  QA scenarios: **happy** — clear localStorage, navigate to `/dashboard`, redirected to `/auth/login`. **failure** — log in, navigate to `/dashboard`, page renders normally (no redirect loop). Evidence: `.omo/evidence/task-11-frontend-wiring.txt` (curl -sI logs or Playwright).
  Commit: Y | `feat(auth): add ProtectedRoute wrapper for internal routes`

- [x] 12. `src/components/home/dashboard/dashboard.tsx`: Replace hardcoded "Welcome Carly!" with `useAuth()` — expect user's real name displayed
  What to do: In `src/components/home/dashboard/dashboard.tsx:1-6` add `import { useAuth } from "../../../contexts/AuthContext";`. In the `Dashboard` function body add `const { user } = useAuth();` and `const displayName = user?.name ?? user?.email?.split("@")[0] ?? "there";`. Change line 28 from `<h1 className="dashboard-welcome">Welcome Carly!</h1>` to `<h1 className="dashboard-welcome">Welcome {displayName}!</h1>`.
  Must NOT: touch other JSX in this file; remove the `SectionLink` inline component; use `useContext` directly (use the hook).
  Parallelization: Wave 2 | Blocked by: — | Blocks: —
  References: `src/components/home/dashboard/dashboard.tsx:1-30`; `src/contexts/AuthContext.tsx:67-72` (`useAuth` hook); pattern in `InternalLayout.tsx:10-12`.
  Acceptance criteria: `grep -c 'Welcome Carly' src/` returns 0; `grep -c 'useAuth' src/components/home/dashboard/dashboard.tsx` = 1; `npx tsc -b` passes.
  QA scenarios: **happy** — log in as a user whose email is `alice@example.com` (no name set), navigate to `/dashboard`, header reads "Welcome alice!". **failure** — clear user, navigate to `/dashboard` — post-todo-11 this should be a redirect, so this scenario tests the fallback "Welcome there!" string when user is null (which would only happen if todo 11 isn't done yet). Evidence: `.omo/evidence/task-12-frontend-wiring.txt`.
  Commit: Y | `fix(dashboard): use authenticated user name in welcome header`

- [x] 13. `src/components/tripPlanner/tripPlanner.tsx`: Replace hardcoded `user_id: 2` with `useAuth()` + navigate on save success + toast/error UX
  What to do: Import `useAuth` and `useNavigate`. Read `const { user } = useAuth();` and `const navigate = useNavigate();`. Replace `user_id: 2` on lines 117 and 135 with `user_id: user?.id`. Guard the save with `if (!user) { setSaveError("You must be logged in to save a trip."); return; }` at the top of `handleSave` (line 105). After the `await api.request("/trips/create", ...)` call (line 143), replace the `console.log("response", response)` (line 148) with `if (!response.ok) throw new Error("Failed to create trip"); const created: TripPublic = await response.json(); navigate("/trips/" + created.id);`. Optionally replace `api.request` with `createTrip` from `services/trips.ts` (todo 4) — do it if the service exists at execution time. Delete `console.log("payload", payload)` and `console.log("JSON.stringify(payload)", JSON.stringify(payload))` (lines 138-139). Replace TODO comment on line 142 with a note that this is now wired.
  Must NOT: leave any `console.log` in `handleSave`; hard-code the id `2` anywhere; navigate before checking `response.ok`.
  Parallelization: Wave 2 | Blocked by: — (soft: 4 if available) | Blocks: —
  References: `src/components/tripPlanner/tripPlanner.tsx:105-153`; `src/contexts/AuthContext.tsx`; `src/services/trips.ts` (todo 4 adds `createTrip`); `src/types/trip.ts` (`TripPublic`).
  Acceptance criteria: `grep -c 'user_id: 2' src/components/tripPlanner/tripPlanner.tsx` = 0; `grep -c 'console.log' src/components/tripPlanner/tripPlanner.tsx` = 0; `grep -c 'useAuth' src/components/tripPlanner/tripPlanner.tsx` = 1; `npx tsc -b` passes.
  QA scenarios: **happy** — log in, add a valid destination, click "Next >>", navigate to `/trips/{new id}`. **failure** — clear user then trigger save (post-ProtectedRoute this is impossible, so test in isolation): expect `saveError` banner "You must be logged in to save a trip." Evidence: `.omo/evidence/task-13-frontend-wiring.txt`.
  Commit: Y | `fix(tripPlanner): use authenticated user id, navigate on save success, remove debug logs`

- [x] 14. Remove production `console.log` debug statements across dashboard/trips/planner components
  What to do: Delete these console statements (leaving surrounding code intact):
  - `src/components/home/dashboard/TripSection.tsx:16` (`console.log("Fetched trips:", response);`)
  - `src/components/home/dashboard/TripSection.tsx:40-42` (three `console.log` for trips debug)
  - `src/components/home/dashboard/TravelerSection.tsx:42-44` (three `console.log` for travelers debug)
  - `src/components/home/dashboard/DestinationsSection.tsx:34,43,50` (already removed by todo 9 as part of subarraySum deletion — verify)
  - `src/components/trips/TripPage.tsx:119` (`console.log("data", data);` — will be removed as part of todo 16 too; safe to no-op)
  - Leave `console.warn` in service mock fallbacks (todos 4-7) intact
  - Leave commented `console.log` in `OverallConditions.tsx:18,29-42` and `weatherCodes.ts:22,31` intact (they're comments; not production noise)
  - Leave `console.log("Google login clicked")` and `console.log("Google sign up clicked")` in `login.tsx:57` and `createUser.tsx:50` intact (deferred to Tier 3)
  - Leave `console.error` in `TripSection.tsx:20` and `contexts/AuthContext.tsx` catch blocks intact (real error logging is fine)
  Must NOT: remove commented lines; remove `console.error`; remove OAuth stubs (deferred).
  Parallelization: Wave 2 | Blocked by: — | Blocks: —
  References: grep of production `console.log` (see AGENTS.md-style summary); specific files/lines listed above.
  Acceptance criteria: `grep -rn 'console.log' src/components/home/ src/components/trips/TripPage.tsx src/components/tripPlanner/ | grep -v '//'` returns only the Google OAuth stubs (2 lines) and mock-fallback `console.warn` calls; `npx tsc -b` passes.
  QA scenarios: **happy** — load `/dashboard`, open browser dev tools console, see no "Fetched trips" / "Trips to display" / "Travelers to display" / "data" chatter. **failure** — leave one console.log in, expect to see it in console (baseline before removal). Evidence: `.omo/evidence/task-14-frontend-wiring.txt` (console snapshot).
  Commit: Y | `chore(logging): remove production console.log debug statements`

- [x] 15. `src/components/trips/OverallConditions.tsx`: Add explicit prop types (`TripForecastPublic`) and resolve snake/camel field mismatch
  What to do: Change the function signature at lines 9-17 to `export default function OverallConditions({ forecastTrip }: { forecastTrip: TripForecastPublic })`. Update the destructure at lines 20-27 to use camelCase to match `src/types/trip.ts:142-153`: `const { dayConditions, dayHigh, dayLow, nightConditions, nightHigh, nightLow } = forecastTrip;`. The service-layer mapper `mapTripPublicToDetail` (todo 4) will be responsible for converting backend snake_case → these camelCase names. Fix the copy-paste bug on lines 97-101 where nighttime section shows `dayHigh` / `dayLow` (should be `nightHigh` / `nightLow`). Remove the commented `console.log`s at lines 18, 29-42 for cleanliness (optional per the "leave commented logs" rule in todo 14 — but this file's are notably noisy; commit removal as separate line if you're conservative).
  Must NOT: change the CSS classes; change the aggregation logic in `aggregateConditions`; use `any`.
  Parallelization: Wave 3 | Blocked by: 2,4 | Blocks: 16
  References: `src/components/trips/OverallConditions.tsx:1-129`; `src/types/trip.ts:142-153` (`TripForecastPublic`); `src/utils/weatherCodes.ts`.
  Acceptance criteria: `grep -c 'day_conditions' src/components/trips/OverallConditions.tsx` = 0; `grep -c 'TripForecastPublic' src/components/trips/OverallConditions.tsx` ≥ 1; `grep -c 'nightHigh' src/components/trips/OverallConditions.tsx` ≥ 1; `npx tsc -b` passes.
  QA scenarios: **happy** — with mocks on and a mock `TripPublic` containing populated forecast, navigate to `/trips/1` and see both day + night sections render distinct temps. **failure** — set `forecastTrip.dayConditions` to `undefined` in the mock, expect either a graceful empty render or a caught error (add optional-chaining if not present). Evidence: `.omo/evidence/task-15-frontend-wiring.txt`.
  Commit: Y | `fix(trips): type OverallConditions and align snake/camel forecast fields`

- [x] 16. `src/components/trips/TripPage.tsx`: Remove mock overwrite; use `services/trips.ts` `getTripById` + `mapTripPublicToDetail`; add loading/error UI
  What to do: Delete the entire `mockTripData` constant at lines 13-101. In `useEffect` at lines 112-144 replace the body with: `try { setLoading(true); const publicTrip = await getTripById(tripId!); setTripData(mapTripPublicToDetail(publicTrip)); } catch (err) { setError(err instanceof Error ? err.message : "Failed to load trip"); } finally { setLoading(false); }`. Delete the `realData` state (line 106) and every reference to it (lines 130, 171-177). Update `TripSummary` props at lines 170-178 to pass the fields from `tripData.trip` (`name`, `start_date`, `end_date`, `updated_at`, `created_at`) plus `tripData.overallDayWeather` / `overallNightWeather` — OR restructure `TripSummary` to accept `TripDetailData` directly (see todo 17). Remove `console.log("data", data)` (line 119). Wire the Add Traveler button — the `handleAddTraveler` function (line 146-148) exists but there's no button referencing it in the JSX; add one via reintroducing `<TravelersSection travelers={tripData.travelers} onAddTraveler={handleAddTraveler} />` in the JSX (mid-page, above or below destinations).
  Must NOT: leave `mockTripData` in any form; leave `realData` state; leave `console.log`.
  Parallelization: Wave 3 | Blocked by: 2,4,15 | Blocks: —
  References: `src/components/trips/TripPage.tsx:1-199`; `src/services/trips.ts` (after todo 4); `src/types/trip.ts:121-127` (`TripDetailData`); existing wiring at `src/components/trips/TravelersSection.tsx:1-61`.
  Acceptance criteria: `grep -c 'mockTripData' src/components/trips/TripPage.tsx` = 0; `grep -c 'realData' src/components/trips/TripPage.tsx` = 0; `grep -c 'getTripById' src/components/trips/TripPage.tsx` ≥ 1; `grep -c 'TravelersSection' src/components/trips/TripPage.tsx` ≥ 1; `npx tsc -b` passes.
  QA scenarios: **happy** — with `VITE_USE_MOCKS=true` and unreachable backend, navigate to `/trips/1`, see fully-rendered TripSummary + destinations + travelers list. **failure** — set mocks off, expect error banner "Failed to load trip" or the specific message from the service. Evidence: `.omo/evidence/task-16-frontend-wiring.txt`.
  Commit: Y | `refactor(trips): remove TripPage mock, wire real API via services/trips.ts`

- [x] 17. `src/components/trips/TripSummary.tsx`: Use `Trip.start_date` and `Trip.end_date` (not `departDate` twice); remove hardcoded "100 nights"; guard undefined dates
  What to do: The component currently receives `TripPublic` props but the fields don't match what `TripPublic` actually contains (`TripPublic` has `departDate`, `arrivalDate` — same shape). Change the prop shape to accept a `TripDetailData` (see todo 16). Update signature: `export default function TripSummary({ trip, overallDayWeather, overallNightWeather }: TripDetailData)`. In the JSX at lines 25-32 use `trip.start_date` for depart and `trip.end_date` for return (not `departDate` twice). Compute nights: `const nights = calculateNights(trip.start_date, trip.end_date);` and render `{nights} nights` instead of hardcoded `100 nights`. Update `OverallConditions` usage at line 46 to pass a `forecastTrip` derived from `overallDayWeather` and `overallNightWeather` (or accept that this may require an additional mapping — flag as a follow-up if the current data shape can't produce a full `TripForecastPublic`).
  Must NOT: keep `100 nights` hardcoded; call `formatShortDate(undefined)` without the null-guard from todo 8; import unused `TripPublic`.
  Parallelization: Wave 3 | Blocked by: 2,8 | Blocks: —
  References: `src/components/trips/TripSummary.tsx:1-54`; `src/utils/trips.ts:11-15` (`calculateNights`, now null-safe post-todo-8); `src/types/trip.ts:71-127`.
  Acceptance criteria: `grep -c 'formatShortDate(departDate)' src/components/trips/TripSummary.tsx` = 0 (was 2 before); `grep -c '100 nights' src/components/trips/TripSummary.tsx` = 0; `grep -c 'calculateNights' src/components/trips/TripSummary.tsx` = 1; `npx tsc -b` passes.
  QA scenarios: **happy** — mock trip with start_date 2026-06-15, end_date 2026-06-22 renders "7 nights", depart "6/15/26", return "6/22/26". **failure** — mock trip with undefined end_date renders "0 nights" and empty return date (no crash). Evidence: `.omo/evidence/task-17-frontend-wiring.txt`.
  Commit: Y | `fix(trips): TripSummary uses distinct start/end dates and computed nights`

- [x] 18. `src/components/home/dashboard/TravelerSection.tsx`: Wire to `services/travelers.ts` — expect real travelers displayed instead of "No travelers yet!"
  What to do: Un-comment lines 4-5 imports and change to `import { listTravelers } from "../../../services/travelers"; import { type Traveler } from "../../../types/traveler";`. Un-comment the `useEffect` block at lines 15-23 and change `fetchRecentTravelers(4)` → `listTravelers(4)`. Change `useState<Traveler[]>([])` (uncomment the typed version on line 9, remove the untyped version on line 10). Set `isLoading` default to `true` (currently `false` on line 12). Add error state: `const [error, setError] = useState<string | null>(null);` and `.catch((err) => setError(err.message))` in the useEffect chain. When `travelers.length > 0`, render a list of traveler chips similar to `src/components/trips/TravelersSection.tsx:17-25`. Remove `console.log` at lines 42-44.
  Must NOT: import from `TravelerSection.tsx` (was deleted in todo 9); use `any`.
  Parallelization: Wave 3 | Blocked by: 5 | Blocks: —
  References: `src/components/home/dashboard/TravelerSection.tsx:1-61`; `src/services/travelers.ts` (todo 5); `src/types/traveler.ts` (todo 2); pattern in `src/components/home/dashboard/TripSection.tsx:1-90`.
  Acceptance criteria: `grep -c 'listTravelers' src/components/home/dashboard/TravelerSection.tsx` = 1; `grep -c 'console.log' src/components/home/dashboard/TravelerSection.tsx` = 0; `grep -c '//' src/components/home/dashboard/TravelerSection.tsx | grep -v useEffect` (visual check: no stale commented block); `npx tsc -b` passes.
  QA scenarios: **happy** — with mocks on, dashboard shows the mock travelers (Alice, Bob, or whatever is in `src/mocks/travelers.ts`). **failure** — set mocks off + break URL, expect empty state or error UI (never crashes). Evidence: `.omo/evidence/task-18-frontend-wiring.txt`.
  Commit: Y | `feat(dashboard): wire TravelerSection to services/travelers.ts`

- [x] 19. `src/components/home/dashboard/dashboard.tsx` Routines section: Wire to `services/routines.ts`; fix self-nav "add a routine"
  What to do: In `dashboard.tsx` add `const [routines, setRoutines] = useState<Routine[]>([])` and a `useEffect` fetching via `listRoutines()`. Replace the hardcoded `<button ...>Basic Routine</button>` block at lines 40-73 with a `routines.map()` rendering one button per real routine, each opening `routineModalOpen` for THAT routine (need to track editing id — add `editingRoutineId` state). Replace the "add a routine" button at lines 74-93 which currently navigates to `/dashboard` (self-nav!) with one that opens the routine edit modal in "new" mode (`setRoutineModalOpen(true); setEditingRoutineId(null);`). The existing `TravelerEditModal` used for routines on line 105-109 already supports routine editing via its slide panel — verify or adjust.
  Must NOT: use `TravelerEditModal` for routine-only editing (it's coupled to traveler flow via `TravelerEditSlidePanel`). Preferred: introduce a dedicated Routine-only modal OR always open `TravelerEditModal` with `activePanel=1` (routine panel). Latter is simpler; use it.
  Parallelization: Wave 3 | Blocked by: 6 | Blocks: 27
  References: `src/components/home/dashboard/dashboard.tsx:37-95,105-109`; `src/services/routines.ts` (todo 6); `src/types/routine.ts` (todo 2); `src/components/modals/travelerEdit/TravelerEditModal.tsx:24,50-98` (activePanel prop).
  Acceptance criteria: `grep -c 'listRoutines' src/components/home/dashboard/dashboard.tsx` = 1; `grep -c '/dashboard' src/components/home/dashboard/dashboard.tsx` ≤ 1 (only the SectionLink base which is a no-op today — deferred to a follow-up if kept); `grep -c 'Basic Routine' src/components/home/dashboard/dashboard.tsx` = 0; `npx tsc -b` passes.
  QA scenarios: **happy** — dashboard shows real routines from mock fixture; clicking "add a routine" opens the routine edit modal in new mode. **failure** — click an existing routine, modal opens pre-populated with its items. Evidence: `.omo/evidence/task-19-frontend-wiring.txt`.
  Commit: Y | `feat(dashboard): wire Routines section to services/routines.ts and fix self-nav`

- [x] 20. `src/components/trips/TripsListPage.tsx`: Implement real trips list via `fetchRecentTrips` (or new `listTrips`) with loading/empty/error states
  What to do: Replace the entire file body. Import `useState`, `useEffect`, `useNavigate`, `fetchRecentTrips` from `services/trips.ts`, `type Trip` from `types/trip.ts`. Component: `const [trips, setTrips] = useState<Trip[]>([]); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);` — useEffect fetches all trips (large limit, e.g. 100) — render list of clickable rows navigating to `/trips/{trip.id}`. Empty state: "No trips yet — plan your first trip!" with a button routing to `/trip_planner`. Error state: banner with the message and a retry button. Loading state: `<LoadingDots />`. Add a page title `<h1>Your Trips</h1>` and basic CSS (create `src/components/trips/styles/tripsList.css` if needed, or reuse existing styles).
  Must NOT: use direct `fetch()`; introduce a new state library; add a new dependency.
  Parallelization: Wave 3 | Blocked by: 2,4 | Blocks: —
  References: `src/components/trips/TripsListPage.tsx:1-9` (current empty stub); `src/services/trips.ts:3-9` (`fetchRecentTrips`); pattern in `src/components/home/dashboard/TripSection.tsx`; `src/components/basic/loading.tsx`.
  Acceptance criteria: `wc -l src/components/trips/TripsListPage.tsx` > 40 (real implementation); `grep -c 'fetchRecentTrips\\|listTrips' src/components/trips/TripsListPage.tsx` ≥ 1; navigate to `/trips` in dev renders a list; `npx tsc -b` passes.
  QA scenarios: **happy** — with mocks on, `/trips` shows 3+ mock trips; click one → navigate to `/trips/{id}`. **failure** — with mocks off + broken URL, `/trips` shows the error banner + retry button. Evidence: `.omo/evidence/task-20-frontend-wiring.txt`.
  Commit: Y | `feat(trips): implement TripsListPage with real data + loading/empty/error states`

- [x] 21. `src/components/tripPlanner/DestinationCard.tsx` + `src/types/trip.ts` alignment: Ensure `CreateDestinationData` remains authoritative for planner flow; add `DestinationPublic` mapper if the two shapes diverge
  What to do: Verify `CreateDestinationData` (`src/types/trip.ts:1-26`) still matches what `DestinationCard.tsx` writes on `onChange` (line 90-91). If the new `DestinationPublic` from todo 2 diverges from `CreateDestinationData`, add a `mapDestinationPublicToCreate` and inverse `mapCreateToDestinationPublic` in `src/services/trips.ts` (or a new `src/services/destinations.ts` — decide based on cohesion). No JSX change unless the Mapbox response shape breaks — it should not, since `handleSearchBoxRetrieve` uses local shape (`DestinationResponse` from `types/trip.ts:67-69`).
  Must NOT: break existing `DestinationCard` behavior; couple the card to a service (it stays presentational and delegates to `onChange`).
  Parallelization: Wave 3 | Blocked by: 2 | Blocks: —
  References: `src/components/tripPlanner/DestinationCard.tsx:1-420`; `src/types/trip.ts:1-26,67-69`; `src/components/tripPlanner/tripPlanner.tsx:116-126` (payload shape when saving).
  Acceptance criteria: `npx tsc -b` passes; `DestinationCard` renders identically in the planner (visual smoke — no JSX diff).
  QA scenarios: **happy** — navigate to `/trip_planner`, add a destination, edit label + date + laundry, click "Next >>", trip saves (post-todo-13 wiring). **failure** — deliberately break `CreateDestinationData` shape, expect `npx tsc -b` to fail with specific field. Evidence: `.omo/evidence/task-21-frontend-wiring.txt`.
  Commit: Y | `chore(types): ensure DestinationCard remains aligned with CreateDestinationData`

- [x] 22. `src/components/accountSettings/accountSettings.tsx` Profile section: Wire Save Profile button to `services/user.ts.updateProfile` + hydrate initial state from `useAuth()`
  What to do: Import `useAuth` and `updateProfile` from `services/user.ts`. Add `const { user } = useAuth();`. Change `useState("Carly Hayter")`, `useState("carly@example.com")`, `useState("carlyh")` (lines 5-7) to `useState(user?.name ?? "")`, `useState(user?.email ?? "")`, `useState(user?.username ?? "")`. Add a `useEffect` that syncs local state when `user` changes (handles the initial hydration when AuthContext finishes loading). Add `const [profileSaving, setProfileSaving] = useState(false); const [profileError, setProfileError] = useState<string | null>(null); const [profileSuccess, setProfileSuccess] = useState(false);`. Add an `async function handleSaveProfile()` that calls `updateProfile({ name, email, username })` and sets success/error accordingly. Wire the button at line 78 with `onClick={handleSaveProfile} disabled={profileSaving}`. Show `profileError` in a banner above the button; show a "Saved!" transient message after success.
  Must NOT: use `fetch()`; store passwords; leave the "Carly Hayter" hardcoded string.
  Parallelization: Wave 4 | Blocked by: 7 | Blocks: —
  References: `src/components/accountSettings/accountSettings.tsx:1-82`; `src/services/user.ts` (todo 7); `src/contexts/AuthContext.tsx`.
  Acceptance criteria: `grep -c 'Carly Hayter' src/components/accountSettings/accountSettings.tsx` = 0; `grep -c 'updateProfile' src/components/accountSettings/accountSettings.tsx` = 1; `grep -c 'onClick=' src/components/accountSettings/accountSettings.tsx` ≥ 1 for Save Profile; `npx tsc -b` passes.
  QA scenarios: **happy** — log in, change name, click Save Profile, see success message + persisted mock (with mocks on). **failure** — trigger with mocks off + broken URL, expect error banner. Evidence: `.omo/evidence/task-22-frontend-wiring.txt`.
  Commit: Y | `feat(accountSettings): wire Profile section to services/user.ts`

- [x] 23. `src/components/accountSettings/accountSettings.tsx` Password section: Wire Update Password button + client-side match validation
  What to do: Add `async function handleUpdatePassword()` that: validates `newPassword === confirmPassword` (show error banner if not), validates non-empty current password, then calls `updatePassword({ current: currentPassword, next: newPassword })` from `services/user.ts`. On success clear all three fields and show "Password updated!" transient message. Wire button at line 132.
  Must NOT: log passwords; store them beyond component state; skip the match check.
  Parallelization: Wave 4 | Blocked by: 7 | Blocks: —
  References: `src/components/accountSettings/accountSettings.tsx:84-136`; `src/services/user.ts`; existing pattern in `src/components/auth/resetPassword/resetPassword.tsx:16-52` (password match logic).
  Acceptance criteria: `grep -c 'updatePassword' src/components/accountSettings/accountSettings.tsx` = 1; a passwords-do-not-match error banner is rendered inline; `npx tsc -b` passes.
  QA scenarios: **happy** — enter valid current + matching new/confirm, click Update Password, see success. **failure** — enter mismatched new/confirm, see error banner "Passwords do not match" without triggering an API call. Evidence: `.omo/evidence/task-23-frontend-wiring.txt`.
  Commit: Y | `feat(accountSettings): wire Password section with match validation`

- [x] 24. `src/components/accountSettings/accountSettings.tsx` Preferences + Notifications sections: Wire both save buttons
  What to do: Add `async function handleSavePreferences()` calling `updatePreferences({ language, timezone, unit })` and `async function handleSaveNotifications()` calling `updateNotifications(notifications)`. Wire buttons at lines 202 and 268. Add per-section saving/error/success state (mirror todo 22 pattern).
  Must NOT: batch both saves into one call; touch the toggle knob logic (already wired to local state).
  Parallelization: Wave 4 | Blocked by: 7 | Blocks: —
  References: `src/components/accountSettings/accountSettings.tsx:138-272`; `src/services/user.ts`.
  Acceptance criteria: `grep -c 'updatePreferences' src/components/accountSettings/accountSettings.tsx` = 1; `grep -c 'updateNotifications' src/components/accountSettings/accountSettings.tsx` = 1; both buttons show a success transient message after click; `npx tsc -b` passes.
  QA scenarios: **happy** — flip unit toggle to Metric, click Save Preferences, see success. Toggle email notification, click Save Notifications, see success. **failure** — mocks off + broken URL: expect error banner per section (not affecting each other). Evidence: `.omo/evidence/task-24-frontend-wiring.txt`.
  Commit: Y | `feat(accountSettings): wire Preferences and Notifications sections`

- [x] 25. `src/components/accountSettings/accountSettings.tsx` Delete Account button: Wire with confirmation dialog + logout redirect
  What to do: Add `const [confirmOpen, setConfirmOpen] = useState(false);`. Change the "Delete Account" button at line 286 to `onClick={() => setConfirmOpen(true)}`. Add a confirmation UI (reuse `Modal` component from `src/components/modals/modal/Modal.tsx`) with body text "This is permanent. Type your email to confirm." (or a simpler "Are you sure?" per your call — pick simpler for MVP) and two buttons: "Cancel" (closes modal) and "Delete Account" (calls `deleteAccount()` from `services/user.ts`, then `logout()` from `useAuth()`, then `navigate("/")`). Import `useAuth`, `useNavigate`, `deleteAccount`.
  Must NOT: skip the confirmation; leave user logged in after deletion.
  Parallelization: Wave 4 | Blocked by: 7 | Blocks: —
  References: `src/components/accountSettings/accountSettings.tsx:274-291`; `src/services/user.ts`; `src/components/modals/modal/Modal.tsx`; `src/contexts/AuthContext.tsx:47-50` (`logout`).
  Acceptance criteria: `grep -c 'deleteAccount' src/components/accountSettings/accountSettings.tsx` = 1; `grep -c 'confirmOpen' src/components/accountSettings/accountSettings.tsx` ≥ 2; clicking Delete Account does NOT immediately fire the API — it opens the modal first; `npx tsc -b` passes.
  QA scenarios: **happy** — click Delete Account → modal opens → click Delete Account in modal → user is logged out + navigated to `/`. **failure** — click Delete Account → modal opens → click Cancel → nothing happens (no API call, user still logged in). Evidence: `.omo/evidence/task-25-frontend-wiring.txt`.
  Commit: Y | `feat(accountSettings): wire Delete Account with confirmation + logout`

- [x] 26. `src/components/modals/travelerEdit/TravelerEditModal.tsx` + `TravelerEditSlidePanel.tsx`: Persist traveler via `services/travelers.ts`; make initial state prop-driven
  What to do: Add props to `TravelerEditModal`: `travelerId?: string | null` (null = new), `onSaved?: (traveler: Traveler) => void`. Fetch initial traveler via `getTravelerById(travelerId)` if `travelerId` provided; otherwise seed a blank Traveler. Pass the initial `Traveler` down to `TravelerEditSlidePanel` (add matching prop). In `TravelerEditSlidePanel.tsx` replace `useState("Carly")` on line 34, hardcoded medications on lines 55-58, hardcoded `previousTrips` on lines 76-80 with prop-driven initial values (default empty arrays for lists). Add an `async function handleSave()` in the panel or the parent modal that calls `createTraveler` or `updateTraveler` (depending on `travelerId`) with the current form state; on success invokes `onSaved(traveler)` then closes the modal. Wire a Save button (add if not present — the panel currently has no explicit save; the modal's onClose closes without saving today).
  Must NOT: leave `"Carly"` hardcoded; leave hardcoded medications; use `fetch()`.
  Parallelization: Wave 4 | Blocked by: 5 | Blocks: —
  References: `src/components/modals/travelerEdit/TravelerEditModal.tsx:1-100`; `src/components/modals/travelerEdit/TravelerEditSlidePanel.tsx:1-403` (esp. 34,55-58,76-80); `src/services/travelers.ts` (todo 5); `src/types/traveler.ts` (todo 2).
  Acceptance criteria: `grep -c '"Carly"' src/components/modals/travelerEdit/TravelerEditSlidePanel.tsx` = 0; `grep -c 'Allergy pills' src/components/modals/travelerEdit/TravelerEditSlidePanel.tsx` = 0; `grep -c 'createTraveler\\|updateTraveler' src/components/modals/travelerEdit/` ≥ 2; `npx tsc -b` passes.
  QA scenarios: **happy** — dashboard → Add Traveler → modal opens blank → fill name → Save → modal closes → traveler list refreshes with new name. **failure** — with mocks off + broken URL, Save shows an error banner in the modal (do not close). Evidence: `.omo/evidence/task-26-frontend-wiring.txt`.
  Commit: Y | `feat(modals): persist traveler via services/travelers.ts; prop-driven initial state`

- [x] 27. `src/components/modals/routineEdit/RoutineEditSlidePanel.tsx`: Persist routine via `services/routines.ts` — expect parent to receive persisted `Routine`
  What to do: The panel already has `onSave` callback (line 6). Change the parent (`TravelerEditModal.tsx:78-97`) to make the onSave handler `async` and call `createRoutine` or `updateRoutine` from `services/routines.ts`, updating parent state with the persisted `Routine` (server-generated `id`). The panel itself needs minimal change — it just calls `onSave` with `{ name, items }`. Parent decides whether to persist. Alternative: let the panel itself call the service and pass a persisted `Routine` to `onSave` — decide based on where the auth/error UX belongs. Prefer parent-persists for testability.
  Must NOT: duplicate persistence in both panel and parent; leave localStorage-only state; use `fetch()`.
  Parallelization: Wave 4 | Blocked by: 6,19 | Blocks: —
  References: `src/components/modals/routineEdit/RoutineEditSlidePanel.tsx:1-169`; `src/components/modals/travelerEdit/TravelerEditModal.tsx:78-97`; `src/services/routines.ts` (todo 6).
  Acceptance criteria: `grep -c 'createRoutine\\|updateRoutine' src/components/modals/` ≥ 1; the routine `id` returned from the mock service is used in the local list (verify via console.log during test then remove); `npx tsc -b` passes.
  QA scenarios: **happy** — open traveler edit → create routine → Save → routine appears in the traveler's routine list with a server-generated id. **failure** — with mocks off + broken URL, expect error handling (banner in modal). Evidence: `.omo/evidence/task-27-frontend-wiring.txt`.
  Commit: Y | `feat(modals): persist routine via services/routines.ts`

## Final verification wave

> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.

- [x] F1. Plan compliance audit — for each of the 27 todos, verify the acceptance-criteria greps return the expected counts, `npx tsc -b` passes, and the commit line matches the executed commit. Agent-executed.
- [x] F2. Code quality review — spawn Oracle to audit new service files (`services/travelers.ts`, `routines.ts`, `user.ts`, extended `trips.ts`), new mocks, new types, and updated components for: (a) no `any`; (b) explicit return types on all service exports; (c) consistent error handling; (d) no direct `fetch()` outside `services/api.ts`; (e) no new deps in `package.json`; (f) all `Must NOT` clauses from each todo hold.
- [x] F3. Real manual QA — `npm run dev`, hit every route in `src/app/routes.tsx` in an incognito window: `/`, `/auth/login`, `/auth/create_user`, then log in → `/dashboard`, `/trip_planner`, `/trips`, `/trips/1`, `/account_settings`. Verify no console errors; verify protected routes redirect when logged out; verify dashboard shows real user name + mock travelers + mock routines; verify TripPage renders with mock data; verify AccountSettings save buttons produce success/error UX.
- [x] F4. Scope fidelity — confirm no PackingPlanner/TravelerPlanner implementation was smuggled in; no Google OAuth added; no new deps in `package.json`; no CSS-in-JS or Tailwind; token storage still `localStorage` under `platypak_access_token`/`platypak_refresh_token`.

## Commit strategy

- **Style**: Conventional Commits (`type(scope): summary`).
- **Types used**: `feat`, `fix`, `refactor`, `chore`, `test`.
- **One commit per todo** by default (per each todo's `Commit:` line). Worker never squashes; user squashes locally if desired.
- **Never commit** a state that leaves `npx tsc -b` broken.
- **Never commit** WIP with `console.log` in production paths.
- **Final commit** after F1-F4 pass: `chore(release): frontend-wiring Tier 2 complete` — the worker asks the user before making this one.

## Success criteria

1. All 27 todos are checked with green acceptance criteria and evidence files under `.omo/evidence/`.
2. `npx tsc -b` passes cleanly at HEAD.
3. `npm run lint` shows no new errors (existing pre-existing warnings noted in AGENTS.md may remain).
4. `npm test` passes (new mocha unit tests for utils + service mapper are green).
5. F1-F4 all APPROVE.
6. Unauthenticated navigation to any internal route redirects to `/auth/login`.
7. Every AccountSettings save button, TravelerEditModal Save, RoutineEditSlidePanel Save, and TripPlanner "Next >>" produces either a success signal or an error banner — never a silent no-op.
8. `grep -rn 'console.log' src/components/home src/components/trips/TripPage.tsx src/components/tripPlanner/tripPlanner.tsx | grep -v '//' | grep -v console.warn` returns only the Google OAuth stubs (2 lines).
9. `grep -rn 'user_id: 2\\|Welcome Carly\\|subarraySum\\|mockTripData\\|"Carly"' src/` returns zero results.
10. `grep -rn 'VITE_API_URL' src/ .env.local` returns zero results.
