# Project Structure

## Directory Overview

```
FrontSentrace/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication route group
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── change-server/
│   ├── (main)/                   # Main application route group
│   │   ├── position/
│   │   ├── replay/
│   │   ├── settings/
│   │   ├── reports/
│   │   └── page.tsx              # Main tracking page
│   ├── api/                      # API routes
│   │   └── client-debug/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Entry point
│   └── providers.tsx             # Context providers
│
├── src/                          # Source code
│   ├── common/                   # Shared utilities
│   │   ├── components/           # Reusable UI components
│   │   │   ├── BottomMenu.jsx
│   │   │   ├── ErrorHandler.jsx
│   │   │   ├── LocalizationProvider.jsx
│   │   │   ├── NativeInterface.js
│   │   │   ├── StatusCard.jsx
│   │   │   └── ...
│   │   ├── util/                 # Helper functions
│   │   │   ├── converter.js      # Unit conversions
│   │   │   ├── formatter.js      # Data formatting
│   │   │   ├── permissions.js    # Permission checks
│   │   │   ├── preferences.js    # User preferences
│   │   │   ├── exportExcel.js    # Excel export
│   │   │   ├── fetchOrThrow.js   # API wrapper
│   │   │   └── ...
│   │   ├── attributes/           # Attribute configurations
│   │   │   ├── useDeviceAttributes.js
│   │   │   ├── usePositionAttributes.js
│   │   │   ├── useUserAttributes.js
│   │   │   └── ...
│   │   └── theme/                # Theme configuration
│   │       ├── palette.js        # Color schemes
│   │       ├── components.js     # MUI overrides
│   │       ├── tokens.js         # Design tokens
│   │       └── dimensions.js     # Layout dimensions
│   │
│   ├── map/                      # Map components
│   │   ├── core/                 # Core map utilities
│   │   │   ├── mapUtil.js
│   │   │   ├── preloadImages.js
│   │   │   └── useMapStyles.js
│   │   ├── main/                 # Main map features
│   │   │   ├── MapDefaultCamera.js
│   │   │   ├── MapAccuracy.js
│   │   │   ├── MapLiveRoutes.js
│   │   │   ├── MapSelectedDevice.js
│   │   │   └── PoiMap.js
│   │   ├── draw/                 # Drawing tools
│   │   │   ├── MapGeofenceEdit.js
│   │   │   └── theme.js
│   │   ├── overlay/              # Map overlays
│   │   │   ├── MapOverlay.js
│   │   │   └── useMapOverlays.js
│   │   ├── geocoder/             # Geocoding
│   │   │   └── MapGeocoder.js
│   │   ├── legend/               # Map legend
│   │   │   └── MapSpeedLegend.js
│   │   ├── switcher/             # Style switcher
│   │   │   └── switcher.js
│   │   ├── notification/         # Notification control
│   │   │   └── MapNotification.js
│   │   ├── MapPositions.js       # Device positions
│   │   ├── MapMarkers.js         # Map markers
│   │   ├── MapGeofence.js        # Geofence display
│   │   ├── MapRoutePath.js       # Route paths
│   │   ├── MapRoutePoints.js     # Route points
│   │   └── ...
│   │
│   ├── main/                     # Main tracking interface
│   │   ├── MainPage.jsx          # Main page container
│   │   ├── MainMap.jsx           # Map component
│   │   ├── MainToolbar.jsx       # Action toolbar
│   │   ├── DeviceList.jsx        # Device sidebar
│   │   ├── DeviceRow.jsx         # Device list item
│   │   ├── EventsDrawer.jsx      # Event notifications
│   │   └── useFilter.js          # Device filtering
│   │
│   ├── settings/                 # Settings pages
│   │   ├── common/
│   │   │   └── useSettingsStyles.js
│   │   ├── components/
│   │   ├── DevicesPage.jsx
│   │   ├── DevicePage.jsx
│   │   ├── UsersPage.jsx
│   │   ├── UserPage.jsx
│   │   ├── GroupsPage.jsx
│   │   ├── GroupPage.jsx
│   │   ├── GeofencePage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── NotificationPage.jsx
│   │   ├── PreferencesPage.jsx
│   │   ├── ServerPage.jsx
│   │   └── ...
│   │
│   ├── reports/                  # Reports
│   │   ├── common/
│   │   │   ├── scheduleReport.js
│   │   │   └── useReportStyles.js
│   │   ├── components/
│   │   ├── TripReportPage.jsx
│   │   ├── StopReportPage.jsx
│   │   ├── EventReportPage.jsx
│   │   ├── PositionsReportPage.jsx
│   │   ├── SummaryReportPage.jsx
│   │   ├── ChartReportPage.jsx
│   │   ├── CombinedReportPage.jsx
│   │   └── ...
│   │
│   ├── other/                    # Other features
│   │   ├── ReplayPage.jsx        # Route replay
│   │   ├── GeofencesPage.jsx     # Geofence management
│   │   ├── PositionPage.jsx      # Position details
│   │   ├── EventPage.jsx         # Event details
│   │   ├── NetworkPage.jsx       # Network info
│   │   └── EmulatorPage.jsx      # Device emulator
│   │
│   ├── login/                    # Authentication
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   ├── ChangeServerPage.jsx
│   │   ├── LoginLayout.jsx
│   │   └── LogoImage.jsx
│   │
│   ├── store/                    # Redux state
│   │   ├── index.js              # Store configuration
│   │   ├── devices.js            # Device slice
│   │   ├── session.js            # Session slice
│   │   ├── geofences.js          # Geofence slice
│   │   ├── events.js             # Events slice
│   │   ├── drivers.js            # Drivers slice
│   │   ├── groups.js             # Groups slice
│   │   ├── calendars.js          # Calendars slice
│   │   ├── maintenances.js       # Maintenances slice
│   │   ├── errors.js             # Error slice
│   │   └── throttleMiddleware.js # Throttle middleware
│   │
│   ├── resources/                # Static resources
│   │   ├── l10n/                 # Translations
│   │   ├── images/               # Images
│   │   └── alarm.mp3             # Notification sound
│   │
│   ├── SocketController.jsx      # WebSocket management
│   ├── CachingController.js      # Data caching
│   ├── UpdateController.jsx      # PWA updates
│   ├── ServerProvider.jsx        # Server config provider
│   ├── AppThemeProvider.jsx      # Theme provider
│   ├── ErrorBoundary.jsx         # Error boundary
│   ├── Navigation.jsx            # Router (to be removed)
│   ├── App.jsx                   # App wrapper (to be removed)
│   ├── index.jsx                 # Entry point (to be removed)
│   └── reactHelper.js            # React utilities
│
├── public/                       # Static assets
│   ├── manifest.webmanifest      # PWA manifest
│   ├── favicon.ico
│   ├── logo.svg
│   ├── alarm.mp3
│   └── pwa-*.png                 # PWA icons
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md           # Architecture overview
│   ├── MIGRATION.md              # Migration guide
│   ├── MIGRATION_TODO.md         # Migration checklist
│   ├── API.md                    # API integration
│   ├── DEPLOYMENT.md             # Deployment guide
│   └── CONTRIBUTING.md           # Contributing guidelines
│
├── .github/                      # GitHub configuration
│   ├── workflows/                # CI/CD workflows
│   │   ├── build.yml
│   │   ├── lint.yml
│   │   └── translation.yml
│   ├── dependabot.yml
│   └── FUNDING.yml
│
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── .env                          # Environment variables (gitignored)
├── .gitignore                    # Git ignore rules
├── .npmrc                        # npm configuration
├── README.md                     # Project overview
└── LICENSE.txt                   # Apache 2.0 license
```

## Key Directories Explained

### `/app` - Next.js App Router
- File-based routing system
- Route groups `(auth)` and `(main)` for organization
- Server and client components
- API routes for backend proxy

### `/src/common` - Shared Code
- Reusable components across features
- Utility functions and helpers
- Theme and styling configuration
- Attribute configuration hooks

### `/src/map` - Mapping System
- MapLibre GL integration
- Custom map controls
- Geofence drawing tools
- Map overlays and markers

### `/src/store` - State Management
- Redux Toolkit slices
- Global application state
- Real-time data synchronization

### `/src/main` - Core Tracking UI
- Main tracking interface
- Device list and selection
- Real-time position updates

### `/src/settings` - Configuration
- Device, user, group management
- Notification configuration
- System preferences

### `/src/reports` - Reporting
- Various report types
- Excel export functionality
- Report scheduling

### `/public` - Static Assets
- PWA assets and manifest
- Images and icons
- Audio files

### `/docs` - Documentation
- Architecture documentation
- API guides
- Migration guides
- Contributing guidelines

## File Naming Conventions

- **Pages**: `PageName.jsx` or `page.tsx` (Next.js)
- **Components**: `ComponentName.jsx`
- **Utilities**: `utilityName.js`
- **Hooks**: `useHookName.js`
- **Styles**: `useComponentStyles.js`
- **Types**: `types.ts`

## Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./app/*"],
      "@/public/*": ["./public/*"]
    }
  }
}
```

Usage:
```javascript
import { formatSpeed } from '@/common/util/formatter';
import DeviceList from '@/main/DeviceList';
```

## Migration Status

- ✅ Next.js configuration
- ✅ Documentation structure
- 🚧 Route migration (in progress)
- ⏳ Component updates (pending)
- ⏳ React Router removal (pending)

See [MIGRATION_TODO.md](./MIGRATION_TODO.md) for detailed migration checklist.
