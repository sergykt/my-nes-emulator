# NES Emulator — Workspace Instructions

## Quick Start

- **Dev environment**: `npm install && npm run dev` (localhost:3000, Vite auto-reload)
- **Build**: `npm run build` → Vite + TypeScript strict mode
- **Lint**: `npm run lint` (Airbnb config via ESLint)
- **Preview**: `npm run preview` (test production build locally)

## Project Overview

A browser-based NES emulator built with React 18 + TypeScript + Vite. Wraps the [jsnes](https://github.com/bfirsh/jsnes) library with a modern UI, mobile support (PWA), and state management via Zustand. See [README.md](../../README.md) for feature overview.

## Architecture

### Emulator Core (`src/engine/`)

- **`NesGame` class**: Main orchestrator—wraps jsnes instance, manages 60 FPS rendering loop via `requestAnimationFrame`, handles pause/resume
- **`screen.ts`**: Canvas rendering; converts NES pixel buffer to 2D context
- **`speaker.ts`**: AudioWorklet-based playback; syncs sample rate with frame timing; frame-skips if audio falls behind
- **`gamepad.ts`**: Keyboard input (WASD + arrow keys); turbo button support defined as constants
- **`zapper.ts`**: Light gun support via pointer/touch events

**Key pattern**: Emulator loop is stopped when paused; all listeners clean up on destroy. Frame timing is critical—do NOT block the event loop.

### UI Layer (`src/components/`)

Folder-per-component structure:
```
Component/
  Component.tsx       # FC + memo
  Component.module.scss
  index.ts           # Barrel export
```

**Core components**:
- `Screen`: Canvas wrapper for NES output
- `Gamepad`: Virtual controller (desktop + mobile)
- `GameLibrary`: ROM list with search/filter
- `GamesSwiper`: Carousel for featured/recent games
- `Header` / `Footer`: Layout chrome

**Patterns**:
- Import styles as `styles` from `.module.scss`
- Use `clsx()` for conditional classes
- Props are typed; no untyped `any`
- Export components via barrel `index.ts`

### Pages (`src/pages/`)

Router-level components:
- `StarterPage`: Game selection UI
- `EmulatorPage`: Fullscreen player route (`/emulator/:id`)
- `PageNotFound`: 404 fallback

### State Management (`src/store/`)

Zustand stores with Immer middleware:
- **`emulatorStore`**: Active game, pause/mute flags, fullscreen, NES instance reference
- **`romStore`**: ROM library (IndexedDB via idb-keyval); persistent local uploads

**Pattern**: Actions are typed; avoid mutations outside Immer context.

## Code Conventions

### Naming
- **Components**: PascalCase (`GameLibrary.tsx`)
- **Functions/constants**: camelCase
- **Types/interfaces**: PascalCase (`GamepadButtons`, `NesOptions`) → centralized in `src/types/index.ts`
- **Styles**: `.module.scss`; class names in camelCase

### TypeScript Strict Mode
Enabled: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCases`, `strict: true`

### Type Definitions
All shared types live in `src/types/index.ts`. Import as:
```tsx
import { GamepadButtons, NesOptions } from '@/types';
```

### Exports
Use barrel `index.ts` pattern in each component folder:
```ts
// components/Screen/index.ts
export { Screen } from './Screen';
export { ScreenProps } from './Screen'; // if needed
```

## Critical Patterns

### ROM Loading
- ArrayBuffer is converted to string via `TextDecoder('x-user-defined')` before passing to jsnes
- See `src/utils/arrayBuffer.ts` for utility functions

### Frame Timing & Performance
- 60 FPS target via `requestAnimationFrame`; skips frames if audio falls behind
- **Do NOT** block the main thread—use `queueMicrotask()` for deferred work
- Pause logic: stop `requestAnimationFrame` loop immediately
- Frame timing compensation: `lastTime = time - (delta % frameTime)` carries leftover time to next frame, preventing cumulative drift over long sessions

### Event Listener Cleanup
All event listeners (keyboard, pointer, window resize) must unsubscribe on unmount. The `NesGame` instance handles this in its `destroy()` method.

**Pattern:** Store handler references in `useRef` or `Map` to ensure cleanup removes the same function instance added:
```tsx
const handlersRef = useRef<Map<Button, Function>>(new Map());
const handler = (e) => { /* ... */ };
handlersRef.current.set(button, handler);
element.addEventListener('click', handler);

// Cleanup: retrieve SAME instance
element.removeEventListener('click', handlersRef.current.get(button));
```
**Why:** Creating new functions in cleanup causes memory leaks—the browser matches by reference, not behavior.

### Mobile Input
- Pointer + touch events for light gun; prevent default on canvas
- Virtual gamepad on mobile touch screens with d-pad joystick + A/B/START/SELECT buttons
- D-pad uses touch position tracking and boundary detection to emit directional inputs
- Touch events dispatch synthetic keyboard events to reuse gamepad input logic
- **Fullscreen**: State-based (Zustand) by design. The browser Fullscreen API is unavailable on iOS/iPhone, so fullscreen is managed via CSS layout state for consistent UX across desktop, Android, and iOS

### iOS/Safari Platform Quirks
- **Gesture events** (`gesturestart`, `gesturechange`, `gestureend`): Prevent pinch-zoom by calling `preventDefault()` in handlers
- Requires `{ passive: false }` to make `preventDefault()` effective
- Used in `Screen.tsx` to protect canvas from accidental zoom during gameplay
- D-pad caches position via `getBoundingClientRect()` and invalidates on `resize` to stay accurate during orientation changes

### Audio
- AudioWorklet (`public/audio-processor.js`) handles sample buffering in separate thread
- Sample rate synced with requestAnimationFrame; frame-skip if buffer starves
- Do NOT access Web Audio API from main thread for samples
- Context suspend/resume on pause/resume via `audioContext.suspend()` / `audioContext.resume()`

## Performance Patterns

### useRef vs useState
- Use `useRef` when tracking state that **doesn't need UI updates** (e.g., d-pad active buttons, cached DOM rects)
- Prevents unnecessary re-renders and improves touch responsiveness
- Example: `activeButtonsRef` in Dpad tracks which buttons are pressed but never triggers a render

### Event Handler Storage
- Store handler references in Maps/objects to avoid memory leaks in cleanup
- Creating new functions in cleanup causes memory leaks—the browser matches by reference, not behavior
- Pattern: `handlersRef.current.set(button, handlerFunction); ... removeEventListener(handlersRef.current.get(button))`

### Component Memoization
- Memoize components with `memo()` to prevent parent re-renders from cascading
- All components in `/src/components/` use memo by default (except container wrappers)

### Input Abstraction
- Virtual gamepad simulates keyboard events via `document.dispatchEvent()` to reuse desktop input logic
- Eliminates duplicated button handling; all buttons flow through the same `Gamepad` class handlers

## File Structure Reference

| Path | Purpose |
|------|---------|
| `src/engine/` | jsnes wrapper, NesGame orchestrator, audio/video/input |
| `src/components/` | Reusable UI components (1 folder per component) |
| `src/pages/` | Router page-level components |
| `src/store/` | Zustand state stores (emulator + ROM library) |
| `src/types/` | Centralized TypeScript interfaces & constants |
| `src/utils/` | Utilities: ArrayBuffer conversion, IndexedDB helpers |
| `src/hooks/` | Custom React hooks (if any) |
| `public/games/` | 32 pre-loaded NES ROM files |
| `public/audio-processor.js` | AudioWorklet script |
| `tsconfig.json` | Compiler + strict mode (tsconfig.node.json for Vite) |
| `vite.config.ts` | Vite + Vercel PWA plugin config |

## Common Development Tasks

### Adding a New Component
1. Create `src/components/MyComponent/` folder
2. Add `MyComponent.tsx`, `MyComponent.module.scss`, `index.ts`
3. Use React FC + memo pattern
4. Export via barrel
5. Import styles: `import styles from './MyComponent.module.scss'`

### Adding a New Game ROM
1. Drop `.nes` file in `public/games/`
2. Update game manifest in `src/engine/games.ts` (if centralized)
3. Refresh app

### Modifying Emulator Behavior
- Pause/resume: Toggle `emulatorStore.paused` → stops `requestAnimationFrame` loop
- Volume: `emulatorStore.mute` → mutes Speaker instance
- Fullscreen: Toggle `emulatorStore.fullscreen` flag (state-based for iOS compatibility; Fullscreen API unavailable on iPhone)

### Adding New Input Buttons
- Define button mapping in `src/engine/gamepad.ts` (e.g., `START: 'Enter'`)
- Add to `GamepadButtons` type in `src/types/index.ts`
- Update virtual gamepad UI in `src/components/Gamepad/`

## Linting & Formatting

**ESLint**: Airbnb config (`npm run lint`)
- No console warnings in production
- Arrow functions over `function` keyword
- Consistent semicolons, quotes (single), trailing commas

## Deployment

- **Host**: Vercel (`vercel.json` configured)
- **Build output**: `dist/` (Vite standard)
- **PWA support**: Enabled via Vite PWA plugin → distributes `manifest.json` + service worker

## Related Documentation

- See [README.md](../../README.md) for feature overview and live demo
- [jsnes docs](https://github.com/bfirsh/jsnes) for emulator-specific questions
- `package.json` for full dependency list and script definitions
