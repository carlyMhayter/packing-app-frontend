---
slug: frontend-wiring
status: approved
intent: clear
review_required: false
pending-action: append todos to .omo/plans/frontend-wiring.md; run Metis; fill TL;DR last
approach: Tier 2 wiring pass - fix critical crashes (Category A), wire dashboard/services/TripPage/AccountSettings via a new src/services/* + src/mocks/* pattern with VITE_USE_MOCKS fallback, add ProtectedRoute for internal routes, replace hardcoded user_id/name with useAuth(). Leave PackingPlanner + TravelerPlanner as stubs, defer Google OAuth. Plain CSS, existing api singleton, no new libs.
approval-received-at: turn after brief presentation; user reply "proceed"
---

# Draft: frontend-wiring

## Components (topology ledger)
<!-- One row per top-level component that can succeed or fail independently. -->

| id | outcome | status | evidence path |
|---|---|---|---|
| C1 | **Critical bug/crash fixes** - dashboard/TripPage/TripSummary/OverallConditions render without runtime errors on both mock and real data | active | src/components/home/dashboard/DestinationsSection.tsx:21-55; src/components/trips/TripPage.tsx:112-144; src/components/trips/TripSummary.tsx:31,39; src/components/trips/OverallConditions.tsx:9-27 |
| C2 | **Auth guard + user identity plumbing** - internal routes protected, hardcoded user_id/name replaced with `useAuth()` context values, broken layout links corrected | active | src/components/layouts/InternalLayout.tsx:1-63; src/components/layouts/RootLayout.tsx:56-61; src/components/tripPlanner/tripPlanner.tsx:117,135; src/components/home/dashboard/dashboard.tsx:28 |
| C3 | **Service layer + mocks infrastructure** - new services/travelers.ts / routines.ts / user.ts, extended trips.ts (getTripById/createTrip/updateTrip), src/mocks/*.ts fixtures, VITE_USE_MOCKS fallback pattern, VITE_API_URL → VITE_API_BASE_URL rename | active | src/services/api.ts:1-87; src/services/trips.ts:1-9; src/services/auth.ts:1-111; .env.local:1; AGENTS.md (env rules) |
| C4 | **Dashboard wiring + TripsListPage** - TravelerSection reads from services/travelers.ts (with mocks), Routines section uses services/routines.ts, TripsListPage renders real list via fetchRecentTrips, dead console.logs removed | active | src/components/home/dashboard/TravelerSection.tsx:1-61; src/components/home/dashboard/TripSection.tsx:16,40-42; src/components/home/dashboard/dashboard.tsx:37-95; src/components/trips/TripsListPage.tsx:1-9 |
| C5 | **TripPage real-API + type alignment** - remove mock overwrite, fix TripPublic/TripDetailData mapping, add types for DestinationPublic and forecastDestinations, fix OverallConditions snake/camel mismatch, TripSummary depart/return bug | active | src/components/trips/TripPage.tsx:13-144; src/types/trip.ts:129-153; src/components/trips/OverallConditions.tsx:20-27; src/components/trips/TripSummary.tsx:31,39; src/components/trips/TravelerSection.tsx (unused-duplicate) |
| C6 | **AccountSettings + TravelerEditModal persistence** - Save Profile/Password/Preferences/Notifications/Delete-Account handlers call services/user.ts; TravelerEditModal saves via services/travelers.ts and routines.ts; hardcoded modal defaults removed | active | src/components/accountSettings/accountSettings.tsx:1-295 (esp. buttons at 78,132,202,268,286); src/components/modals/travelerEdit/TravelerEditModal.tsx:25-97; src/components/modals/travelerEdit/TravelerEditSlidePanel.tsx:34,55-58,76-80 |

## Open assumptions (announced defaults)
<!-- The user vetoes any of these at the gate. -->

| assumption | adopted default | rationale | reversible? |
|---|---|---|---|
| Where do backend calls live? | New files in `src/services/` (`travelers.ts`, `routines.ts`, `user.ts`); extend `trips.ts`; all use existing `api` singleton | AGENTS.md forbids ad-hoc `fetch`/Axios instances; matches existing pattern of `services/auth.ts` + `services/trips.ts` | Yes - can relocate |
| How is dummy data delivered when backend endpoint missing? | Each service wrapper `try { real API } catch { if VITE_USE_MOCKS return src/mocks/*.ts fixture with console.warn } else throw`. Fixtures typed against `src/types/trip.ts` + new `traveler.ts`/`routine.ts`/`user.ts` types | User said "using dummy data if needed" - matches; keeps a single code path; toggle off via env for prod | Yes - remove fallback per-service |
| Auth guard mechanism | New `<ProtectedRoute>` React Router element wrapping all `InternalLayout` children in `src/app/routes.tsx`; redirects to `/auth/login` when `!isLoading && !isAuthenticated`; shows loader when `isLoading` | Standard react-router v7 pattern; leaves `AuthContext` unchanged | Yes - can inline into `InternalLayout` |
| Broken layout link fixes | `/account` → `/account_settings` in both `RootLayout` + `InternalLayout`; remove `/settings` link from both hamburger dropdowns (no such route) | Simplest fix matching existing routes | Yes - can add `/settings` route later |
| Env var name | Rename `VITE_API_URL` → `VITE_API_BASE_URL` in `src/services/api.ts:1` + `.env.local`; add `VITE_USE_MOCKS=true` to `.env.local` for dev | AGENTS.md documents `VITE_API_BASE_URL` as the canonical name; current code drifted | Yes - trivial |
| `TripDetailData` vs `TripPublic` reconciliation | Keep both. `TripDetailData` = frontend view model. `TripPublic` = wire format. Add a `mapTripPublicToDetail()` function in `src/services/trips.ts` | Existing types already split this way; TripPage tries to hold both but muddles them | Yes |
| `DestinationsSection` demo `subarraySum` | Delete the function entirely. Section stays as-is (empty state) until a real destinations feed exists | It's obvious dev leftover; not part of user request | Yes - trivial |
| Duplicate traveler components (`TravelerSection.tsx` vs `TravelersSection.tsx` in `src/components/trips/`) | Keep `TravelersSection.tsx` (plural, list-oriented). Delete `TravelerSection.tsx` (singular, duplicate summary already covered by `TripSummary.tsx`) | Reduces confusion; `TripSummary.tsx` already imports the singular one but it duplicates its own header | Yes |
| `console.log` statements in production code | Remove all `console.log` from `TripSection.tsx:16,40-42`, `TravelerSection.tsx:42-44`, `DestinationsSection.tsx:34,43,50`, `TripPage.tsx:119`, `tripPlanner.tsx:138-148`, `OverallConditions.tsx:18,29-42` | Debug leftovers; safe cleanup | Yes |
| Test strategy | **Tests-after** with the existing mocha setup for utility functions only (nightsBetween, addDays, mapTripPublicToDetail); UI wiring verified via agent-executed manual QA per todo (LSP diagnostics + dev-server smoke check + type-checker `npx tsc -b`) | Project has mocha configured but light coverage; utility layer benefits from unit tests; component behaviour is easier to verify by real execution | Yes - can add component tests later |
| Google OAuth stubs at `login.tsx:55-58` + `createUser.tsx:48-51` | Leave as-is (out of scope for Tier 2); comment made more explicit | User already picked Tier 2 which excludes OAuth | Yes - Tier 3 could add |
| PackingPlanner and TravelerPlanner empty pages | Out of scope for Tier 2. Keep the stubs untouched | User's Tier 2 choice explicitly deferred them | Yes - Tier 3 |
| Type-checker / build validator | `npx tsc -b` from repo root (per AGENTS.md) as canonical acceptance signal | Already the documented source-of-truth for TS errors | Yes |

## Findings (cited - path:lines)

**Category A - broken/crashing:**
- `src/components/home/dashboard/DestinationsSection.tsx:21-55` — `subarraySum` function defined and CALLED on every render (line 55). Untyped params (lines 22: `function subarraySum(arr, target) {`). Not exported, no purpose in app.
- `src/components/trips/TripPage.tsx:112-144` — `fetchTrip` calls real API (line 116), maps into `formattedData` (lines 120-129) with bug `destinations: data.created_at` (line 122), stores in `realData`, then **always** overwrites with `mockTripData` (line 135). Both `realData` and `tripData` end up populated; UI uses `realData` for `TripSummary` (lines 170-178) but `tripData` for destinations (lines 183-190).
- `src/components/trips/TripSummary.tsx:31,39` — `formatShortDate(departDate)` called for BOTH depart AND return date (lines 31, 39, they're identical). Also `formatShortDate` in `src/utils/trips.ts:1-8` has no null-guard - `new Date(undefined).toLocaleDateString()` throws.
- `src/components/trips/OverallConditions.tsx:9-17` — function signature has NO TypeScript types (implicit `any` for the destructured props). Lines 20-27 destructure `day_conditions`, `day_high`, `day_low`, `night_conditions`, `night_high`, `night_low` (snake_case). BUT `src/types/trip.ts:142-153` defines `TripForecastPublic` with `dayConditions`, `dayHigh`, etc. (camelCase). One of them is wrong — real API shape unknown from frontend alone.
- `src/components/layouts/InternalLayout.tsx:1-63` — no auth guard. Also line 43 links to `/account` (nonexistent — real route is `/account_settings` per `routes.tsx:72-75`).
- `src/components/layouts/RootLayout.tsx:56,59` — hamburger links to `/account` and `/settings` (both nonexistent). `AuthLayout.tsx:42,45` mirrors this bug.

**Category B - empty stubs (per user's Tier 2 choice, only TripsListPage is in scope):**
- `src/components/trips/TripsListPage.tsx:1-9` — returns `<div>TripsListPage</div>`. Route `/trips` maps to it (`routes.tsx:62-65`).
- `src/components/packingPlanner/packingPlanner.tsx:1-7` — 7-line empty div. **DEFERRED to Tier 3.**
- `src/components/travelerPlanner/travelerPlanner.tsx:1-7` — 7-line empty div. **DEFERRED to Tier 3.**
- `src/components/tripPlanner/tripSummary.tsx:1-6` — 6-line empty file (lowercase, different from `trips/TripSummary.tsx`). Unused (not routed). Remove or keep as-is.

**Category C - unwired handlers / hardcoded IDs:**
- `src/components/tripPlanner/tripPlanner.tsx:117,135` — `user_id: 2` hardcoded. Line 142 has `// TODO: wire to actual API` (but the actual call at line 143 goes through `api.request`, so wiring is real; the TODO likely refers to error/success UX). Line 148 `console.log("response", response)` but no navigate on success.
- `src/components/accountSettings/accountSettings.tsx` — every save button is a no-op:
  - line 78: `<button className="account-settings-btn-primary" type="button">Save Profile</button>` (no onClick)
  - line 132: `<button ...>Update Password</button>` (no onClick)
  - line 202: `<button ...>Save Preferences</button>` (no onClick)
  - line 268: `<button ...>Save Notifications</button>` (no onClick)
  - line 286: `<button className="account-settings-btn-danger" ...>Delete Account</button>` (no onClick)
  - lines 5-7: `useState("Carly Hayter")`, `useState("carly@example.com")`, `useState("carlyh")` hardcoded (should hydrate from `useAuth()` user)
- `src/components/modals/travelerEdit/TravelerEditModal.tsx:25-97` — routines saved to local `useState` only (line 25); no persistence, no callback to parent to notify save.
- `src/components/modals/travelerEdit/TravelerEditSlidePanel.tsx:34` — `useState("Carly")` hardcoded; lines 55-58 hardcoded medications `["Allergy pills", "Ibuprofen"]`; lines 76-80 hardcoded `previousTrips` fixture.
- `src/components/home/dashboard/dashboard.tsx:28` — `<h1 className="dashboard-welcome">Welcome Carly!</h1>` hardcoded.
- `src/components/home/dashboard/TravelerSection.tsx:15-23` — fetch commented out; state stays empty forever.
- `src/components/home/dashboard/dashboard.tsx:42,76` — Routines section has hardcoded "Basic Routine" button opening TravelerEdit modal (wrong modal), and "+ add a routine" navigates to `/dashboard` (self-nav).

**Category D - missing service files:**
- No `src/services/travelers.ts`, `src/services/routines.ts`, `src/services/user.ts`.
- `src/services/trips.ts:1-9` has only `fetchRecentTrips`. Missing `getTripById`, `createTrip`, `updateTrip`, `deleteTrip`.
- `src/services/api.ts:1` reads `import.meta.env.VITE_API_URL`. AGENTS.md line 76 says `VITE_API_BASE_URL`. `.env.local:1` uses `VITE_API_URL`. **Docs drift.**

**Category E - type gaps:**
- `src/types/trip.ts:129` — `//TODO: create type for DestinationPublic`
- `src/types/trip.ts:141` — `//TODO: types for conditions, forecastDestination` (`TripForecastPublic.forecastDestinations: any`)
- `src/types/trip.ts:142-153` — `TripForecastPublic` uses camelCase; `OverallConditions.tsx:20-27` destructures snake_case. One is wrong.
- `src/components/trips/OverallConditions.tsx:9-17` — no prop types (implicit any).
- `src/components/trips/TripPage.tsx:106,131` — `realData` state declared as `TripPublic | null`, but `formattedData` mapping at lines 120-129 doesn't match the `TripPublic` shape (missing `arrivalDate`, `departDate`, etc.). Line 131 has commented `// setTripData(data);`.

**Debug leftovers to remove:**
- `console.log` in `TripPage.tsx:119`, `tripPlanner.tsx:138,139,148`, `TripSection.tsx:16,40-42`, `TravelerSection.tsx:42-44`, `DestinationsSection.tsx:34,43,50`.
- Commented `console.log` in `OverallConditions.tsx:18,29-42`, `weatherCodes.ts:22,31` (can stay - low signal to remove).

## Decisions (with rationale)

1. **Scope tier: 2** — user's explicit choice. In: A, C (except OAuth), D, E, dashboard/TripsListPage wiring, AccountSettings + TravelerEditModal persistence. Out: PackingPlanner, TravelerPlanner, Google OAuth, RootLayout/AuthLayout redesign beyond broken-link fixes.
2. **Service pattern**: real API first, mock fallback gated by `VITE_USE_MOCKS`. Keeps prod code paths intact; dev-friendly during backend gaps.
3. **Types**: keep `TripDetailData` as UI view-model; keep `TripPublic` as wire shape; introduce a `mapTripPublicToTripDetailData()` mapper in `src/services/trips.ts` so `TripPage` becomes pure presentational.
4. **Snake/camel resolution for `TripForecastPublic`**: The wire shape depends on the backend. Since we don't have runtime access to the backend, we'll **treat `TripPublic`/`TripForecastPublic` in `src/types/trip.ts` as the authoritative frontend contract (camelCase)** and have the service wrapper map snake_case backend responses into it. This is standard practice and matches how `formattedData` was already trying to map (`data.created_at → createdAt`).
5. **`ProtectedRoute`**: implement as a route element in `src/app/routes.tsx`, not in `InternalLayout` — cleaner separation, easier to opt-out per route later.
6. **Deletion decisions**:
   - Delete `src/components/trips/TravelerSection.tsx` (duplicate of `TripSummary.tsx`, unused).
   - Delete `src/components/tripPlanner/tripSummary.tsx` (empty stub, unrouted).
   - Delete `subarraySum` block in `DestinationsSection.tsx`.
7. **Commit style**: conventional commits, one commit per todo (default), squash later if desired.
8. **QA per todo**: LSP diagnostics OK + `npx tsc -b` OK + dev-server smoke via curl/`vite preview` snapshot; failure scenario invoked via each todo's `Must NOT` clause. Utility unit tests only (mocha).

## Scope IN

1. Fix `DestinationsSection.tsx` (remove subarraySum + broken untyped function).
2. Fix `TripPage.tsx` real-API path (remove mock overwrite, fix mapping bug on line 122, remove `console.log`).
3. Fix `TripSummary.tsx` depart/return bug (accept both `departDate` and `returnDate` / trip end_date).
4. Fix `OverallConditions.tsx` types + snake/camel mismatch.
5. Add `ProtectedRoute` in `src/app/routes.tsx` wrapping all internal routes.
6. Fix broken layout dropdown links (`/account` → `/account_settings`; remove `/settings`).
7. Replace hardcoded `user_id: 2` (in `tripPlanner.tsx`) with `useAuth()` user id.
8. Replace hardcoded `"Welcome Carly!"` with `useAuth()` user name.
9. Rename `VITE_API_URL` → `VITE_API_BASE_URL` in `api.ts` + `.env.local`.
10. Create `src/mocks/travelers.ts`, `src/mocks/routines.ts`, `src/mocks/user.ts`, `src/mocks/trips.ts` (typed fixtures).
11. Create `src/services/travelers.ts` (list/get/create/update/delete) with mock fallback.
12. Create `src/services/routines.ts` (list/get/create/update/delete) with mock fallback.
13. Create `src/services/user.ts` (getMe/updateProfile/updatePassword/updatePreferences/updateNotifications/deleteAccount) with mock fallback.
14. Extend `src/services/trips.ts` with `getTripById`, `createTrip`, `updateTrip`, `deleteTrip`, `mapTripPublicToDetail` + mock fallback.
15. Wire `TravelerSection.tsx` (dashboard) to `services/travelers.ts`.
16. Wire `TripsListPage.tsx` to `services/trips.ts` (`fetchRecentTrips` w/o limit, or new `listTrips`).
17. Fix dashboard Routines section (link to real routine list from `services/routines.ts`).
18. Wire all AccountSettings save buttons to `services/user.ts`.
19. Wire `TravelerEditModal` to persist traveler via `services/travelers.ts` + routines via `services/routines.ts` (opt-in `onSave` callback from parent).
20. Add types `DestinationPublic`, `ConditionsMap`, `ForecastDestinationPublic` to `src/types/trip.ts`.
21. Remove debug `console.log` from all production paths listed above.
22. Delete duplicate `src/components/trips/TravelerSection.tsx` (singular).
23. Delete stub `src/components/tripPlanner/tripSummary.tsx` (unrouted).
24. Utility unit tests for new mapper + existing `nightsBetween/addDays/formatShortDate` guards.

## Scope OUT (Must NOT have)

- **NO** implementation of `PackingPlanner` page (deferred to Tier 3).
- **NO** implementation of `TravelerPlanner` page (deferred to Tier 3).
- **NO** Google OAuth implementation on login/createUser (deferred to Tier 3).
- **NO** new dependencies in `package.json` (per AGENTS.md: no Tailwind, no CSS-in-JS lib, no external calendar lib, no MUI/Ant/Bootstrap).
- **NO** direct `fetch()` calls added anywhere outside `src/services/`.
- **NO** token migration to sessionStorage/cookies — stays in localStorage.
- **NO** state library added (Zustand/Redux/MobX).
- **NO** redesign of any component visuals — only wiring + type + bug fixes.
- **NO** backend code changes (this repo is frontend-only; backend contract fixes flagged as issues but not implemented here).
- **NO** replacement of the custom two-month `Calendar` with an external calendar lib.
- **NO** RootLayout/AuthLayout hamburger redesign beyond broken-link fix.
- **NO** commit-squashing during execution — worker commits per-todo, user squashes if desired.

## Open questions

_None._ All forks resolved: user picked Tier 2; test strategy defaulted to tests-after per project setup; approach defaulted to services+mocks pattern with review_required=false.

## Approval gate
status: approved
approval received: user replied "proceed" after brief presentation
next step: hand-build plan skeleton (matching buildPlanSkeleton emitted by scripts/scaffold-plan.mjs since Bash is unavailable in this session), spawn Metis for gap-analysis, APPEND ~27 todos into `## Todos`, fold Metis findings silently, fill `## TL;DR (For humans)` LAST, then present summary + ask start-or-review question
