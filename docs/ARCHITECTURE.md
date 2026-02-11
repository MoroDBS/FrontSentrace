# Architecture Overview

## System Architecture

FrontSentrace follows a modern client-side architecture built on Next.js 16 with the App Router pattern.

### Core Technologies

- **Next.js 16** - React framework with App Router for file-based routing
- **React 19** - UI library with latest concurrent features
- **Redux Toolkit** - Centralized state management
- **Material-UI 7** - Component library with custom theming
- **MapLibre GL** - Open-source mapping library
- **WebSocket** - Real-time device updates

## Application Layers

### 1. Presentation Layer (`app/`)

Next.js App Router structure:
- `layout.tsx` - Root layout with providers
- `page.tsx` - Entry point
- Route groups for organization:
  - `(auth)/` - Authentication pages
  - `(main)/` - Main application pages
  - `api/` - API routes for client-side operations

### 2. Business Logic Layer (`src/`)

#### State Management (`src/store/`)
Redux slices for:
- `devices` - Device list and selection
- `session` - User session and server config
- `geofences` - Geographic boundaries
- `events` - Real-time events
- `drivers`, `groups`, `calendars`, `maintenances` - Entity management

Custom middleware:
- `throttleMiddleware.js` - Throttles position updates for performance

#### Controllers
- `SocketController.jsx` - WebSocket connection management
- `CachingController.js` - Client-side data caching
- `UpdateController.jsx` - PWA update notifications

### 3. Feature Modules

#### Main Tracking (`src/main/`)
- `MainPage.jsx` - Primary tracking interface
- `DeviceList.jsx` - Device sidebar
- `MainMap.jsx` - Map container
- `MainToolbar.jsx` - Action toolbar
- `EventsDrawer.jsx` - Event notifications

#### Map System (`src/map/`)
- **Core** (`core/`) - Map initialization, styles, utilities
- **Main** (`main/`) - Device markers, routes, accuracy circles
- **Draw** (`draw/`) - Geofence drawing tools
- **Overlay** (`overlay/`) - Custom map overlays
- **Controls** - Geocoder, switcher, legend, scale

#### Reports (`src/reports/`)
- Trip, Stop, Event, Position reports
- Summary and Chart reports
- Excel export functionality
- Scheduled reports

#### Settings (`src/settings/`)
- Device, User, Group management
- Notifications, Geofences, Calendars
- Computed attributes, Maintenance schedules
- Server configuration

### 4. Common Utilities (`src/common/`)

#### Components (`components/`)
Reusable UI components:
- `LocalizationProvider` - i18n support
- `ErrorHandler` - Global error handling
- `BottomMenu` - Mobile navigation
- `StatusCard` - Device status display

#### Utilities (`util/`)
- `formatter.js` - Data formatting (dates, distances, speeds)
- `converter.js` - Unit conversions
- `permissions.js` - Permission checks
- `preferences.js` - User preference management
- `exportExcel.js` - Excel report generation

#### Attributes (`attributes/`)
Configuration hooks for:
- Device attributes
- Position attributes
- User attributes
- Command attributes

#### Theme (`theme/`)
- `palette.js` - Color schemes (light/dark)
- `components.js` - MUI component overrides
- `tokens.js` - Design tokens
- `dimensions.js` - Layout dimensions

## Data Flow

### Real-time Updates

```
WebSocket Server
    ↓
SocketController
    ↓
Redux Store (devices, events)
    ↓
React Components (re-render)
    ↓
Map Updates
```

### User Actions

```
User Interaction
    ↓
Component Event Handler
    ↓
API Call (fetch)
    ↓
Redux Action Dispatch
    ↓
Store Update
    ↓
Component Re-render
```

## Key Design Patterns

### 1. Custom Hooks
- `usePersistedState` - localStorage-backed state
- `useFilter` - Device filtering logic
- `useMapStyles` - Map style management
- `useFeatures` - Feature flag checks
- `useDarkMode` - Theme switching

### 2. Provider Pattern
Multiple context providers wrap the app:
- `LocalizationProvider` - Language/translations
- `ServerProvider` - Server configuration
- `AppThemeProvider` - Theme management
- Redux `Provider` - Global state

### 3. Controller Components
Stateful components that manage side effects:
- `SocketController` - WebSocket lifecycle
- `CachingController` - Data caching
- `UpdateController` - Service worker updates

### 4. Render Props & HOCs
- `ErrorBoundary` - Error catching wrapper
- `makeStyles` (tss-react) - Style injection

## Performance Optimizations

1. **Throttled Updates** - Position updates throttled via middleware
2. **Image Preloading** - Map markers preloaded on startup
3. **Code Splitting** - Route-based code splitting via Next.js
4. **Memoization** - React.memo for expensive components
5. **Virtual Scrolling** - react-window for large device lists
6. **PWA Caching** - Service worker for offline support

## Security Considerations

1. **Authentication** - Session-based auth with token support
2. **Permission Checks** - Role-based access control
3. **API Proxy** - Next.js API routes proxy backend calls
4. **HTTPS** - Enforced in production
5. **CSP Headers** - Content Security Policy configured

## Deployment Architecture

```
User Browser
    ↓
Next.js Server (SSR/SSG)
    ↓
Static Assets (CDN)
    ↓
Backend API (Traccar Server)
    ↓
Database
```

## Future Improvements

1. Complete TypeScript migration
2. Enhanced test coverage
3. Micro-frontend architecture for scalability
4. GraphQL API layer
5. Advanced caching strategies
