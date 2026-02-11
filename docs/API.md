# API Integration Guide

## Overview

FrontSentrace integrates with the Traccar backend API for GPS tracking functionality. This guide covers API configuration, authentication, and usage patterns.

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8082

# Optional: API timeout (ms)
NEXT_PUBLIC_API_TIMEOUT=30000
```

### API Proxy

Next.js API routes proxy requests to the backend server:

```typescript
// app/api/[...path]/route.ts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const response = await fetch(`${apiUrl}${url.pathname}`, {
    headers: request.headers,
  });
  
  return response;
}
```

## Authentication

### Session-Based Authentication

```javascript
// Login
const response = await fetch('/api/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ email, password }),
});

const user = await response.json();
```

### Token Authentication

```javascript
// Login with token
await fetch(`/api/session?token=${encodeURIComponent(token)}`);
```

### Logout

```javascript
await fetch('/api/session', { method: 'DELETE' });
```

## Core API Endpoints

### Devices

```javascript
// Get all devices
GET /api/devices

// Get device by ID
GET /api/devices/:id

// Get device by unique ID
GET /api/devices?uniqueId=DEVICE_UNIQUE_ID

// Create device
POST /api/devices
Body: { name, uniqueId, groupId, ... }

// Update device
PUT /api/devices/:id
Body: { name, category, ... }

// Delete device
DELETE /api/devices/:id
```

### Positions

```javascript
// Get latest positions
GET /api/positions

// Get positions for device
GET /api/positions?deviceId=123&from=2024-01-01T00:00:00Z&to=2024-01-02T00:00:00Z
```

### Geofences

```javascript
// Get all geofences
GET /api/geofences

// Create geofence
POST /api/geofences
Body: { name, area, ... }

// Update geofence
PUT /api/geofences/:id

// Delete geofence
DELETE /api/geofences/:id
```

### Reports

```javascript
// Trip report
GET /api/reports/trips?deviceId=123&from=...&to=...

// Stop report
GET /api/reports/stops?deviceId=123&from=...&to=...

// Summary report
GET /api/reports/summary?deviceId=123&from=...&to=...

// Events report
GET /api/reports/events?deviceId=123&from=...&to=...

// Route report
GET /api/reports/route?deviceId=123&from=...&to=...
```

### Users

```javascript
// Get current user
GET /api/session

// Get all users (admin only)
GET /api/users

// Create user
POST /api/users
Body: { name, email, password, ... }

// Update user
PUT /api/users/:id

// Delete user
DELETE /api/users/:id
```

### Groups

```javascript
// Get all groups
GET /api/groups

// Create group
POST /api/groups
Body: { name, groupId, ... }

// Update group
PUT /api/groups/:id

// Delete group
DELETE /api/groups/:id
```

### Notifications

```javascript
// Get all notifications
GET /api/notifications

// Create notification
POST /api/notifications
Body: { type, notificators, ... }

// Update notification
PUT /api/notifications/:id

// Delete notification
DELETE /api/notifications/:id
```

### Commands

```javascript
// Send command to device
POST /api/commands/send
Body: { deviceId, type, attributes }

// Get saved commands
GET /api/commands

// Create saved command
POST /api/commands
Body: { description, type, attributes }
```

## WebSocket Connection

### Real-time Updates

```javascript
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new WebSocket(`${protocol}//${window.location.host}/api/socket`);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.positions) {
    // Handle position updates
  }
  
  if (data.devices) {
    // Handle device updates
  }
  
  if (data.events) {
    // Handle events
  }
};
```

### Message Types

- `positions` - Device position updates
- `devices` - Device status changes
- `events` - Alarm and notification events

## Utility Functions

### Fetch Wrapper

```javascript
// src/common/util/fetchOrThrow.js
export default async function fetchOrThrow(url, options) {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(await response.text());
  }
  
  return response;
}
```

### Usage

```javascript
import fetchOrThrow from '@/common/util/fetchOrThrow';

try {
  const response = await fetchOrThrow('/api/devices');
  const devices = await response.json();
} catch (error) {
  console.error('Failed to fetch devices:', error);
}
```

## Error Handling

### Global Error Handler

```javascript
// src/common/components/ErrorHandler.jsx
export default function ErrorHandler() {
  const errors = useSelector((state) => state.errors.errors);
  
  return errors.map((error) => (
    <Snackbar key={error.id} message={error.message} />
  ));
}
```

### Redux Error Actions

```javascript
import { errorsActions } from '@/store';

dispatch(errorsActions.push('Failed to load devices'));
```

## Data Formatting

### Formatters

```javascript
import { formatPosition, formatSpeed, formatDistance } from '@/common/util/formatter';

// Format position attributes
const formatted = formatPosition(position.attributes, 'speed', t);

// Format speed
const speed = formatSpeed(value, speedUnit, t);

// Format distance
const distance = formatDistance(value, distanceUnit, t);
```

### Unit Conversion

```javascript
import { speedFromKnots, distanceFromMeters } from '@/common/util/converter';

// Convert speed
const kmh = speedFromKnots(speedInKnots, 'kmh');

// Convert distance
const km = distanceFromMeters(distanceInMeters, 'km');
```

## Permissions

### Permission Checks

```javascript
import { useAdministrator, useManager, useReadonly } from '@/common/util/permissions';

const admin = useAdministrator();
const manager = useManager();
const readonly = useReadonly();

if (admin) {
  // Show admin features
}
```

### Permission Levels

- **Administrator** - Full system access
- **Manager** - Manage users and devices
- **User** - View and manage own devices
- **Readonly** - View-only access

## Rate Limiting

The API implements rate limiting. Handle 429 responses:

```javascript
const response = await fetch('/api/devices');

if (response.status === 429) {
  const retryAfter = response.headers.get('Retry-After');
  // Wait and retry
}
```

## Best Practices

1. **Use fetchOrThrow** - Consistent error handling
2. **Cache responses** - Reduce API calls with CachingController
3. **Throttle updates** - Use Redux throttle middleware for positions
4. **Handle errors** - Always catch and display errors to users
5. **Validate input** - Validate data before sending to API
6. **Use TypeScript** - Type API responses for safety
7. **Optimize queries** - Use query parameters to filter data

## Example: Complete CRUD Flow

```javascript
// List devices
const fetchDevices = async () => {
  const response = await fetchOrThrow('/api/devices');
  const devices = await response.json();
  dispatch(devicesActions.refresh(devices));
};

// Create device
const createDevice = async (device) => {
  const response = await fetchOrThrow('/api/devices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });
  const newDevice = await response.json();
  dispatch(devicesActions.update([newDevice]));
};

// Update device
const updateDevice = async (id, updates) => {
  const response = await fetchOrThrow(`/api/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const updated = await response.json();
  dispatch(devicesActions.update([updated]));
};

// Delete device
const deleteDevice = async (id) => {
  await fetchOrThrow(`/api/devices/${id}`, { method: 'DELETE' });
  dispatch(devicesActions.remove([id]));
};
```

## Troubleshooting

### CORS Issues

Ensure backend server allows requests from frontend origin:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
```

### Session Persistence

Sessions are cookie-based. Ensure cookies are enabled and `credentials: 'include'` is set for cross-origin requests.

### WebSocket Connection Fails

Check:
1. WebSocket endpoint is accessible
2. Firewall allows WebSocket connections
3. Proxy configuration supports WebSocket upgrade

## Resources

- [Traccar API Documentation](https://www.traccar.org/api-reference/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
