# Quick Start Guide

Get up and running with FrontSentrace in minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend Traccar server (or access to one)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd FrontSentrace

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your backend API URL
nano .env  # or use your preferred editor
```

## Configuration

Edit `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8082
```

Replace `http://localhost:8082` with your Traccar backend URL.

## Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
FrontSentrace/
├── app/           # Next.js pages and routing
├── src/           # Source code
│   ├── common/    # Shared utilities
│   ├── map/       # Map components
│   ├── main/      # Main tracking UI
│   ├── settings/  # Settings pages
│   ├── reports/   # Reports
│   └── store/     # Redux state
├── public/        # Static assets
└── docs/          # Documentation
```

## Common Tasks

### Add a New Page

1. Create file in `app/` directory:
   ```tsx
   // app/(main)/my-page/page.tsx
   'use client';
   
   export default function MyPage() {
     return <div>My Page</div>;
   }
   ```

2. Access at `/my-page`

### Add a New Component

1. Create in `src/common/components/`:
   ```jsx
   // src/common/components/MyComponent.jsx
   export default function MyComponent({ prop }) {
     return <div>{prop}</div>;
   }
   ```

2. Import and use:
   ```jsx
   import MyComponent from '@/common/components/MyComponent';
   ```

### Add Redux State

1. Create slice in `src/store/`:
   ```javascript
   // src/store/mySlice.js
   import { createSlice } from '@reduxjs/toolkit';
   
   const mySlice = createSlice({
     name: 'myFeature',
     initialState: { data: [] },
     reducers: {
       setData: (state, action) => {
         state.data = action.payload;
       },
     },
   });
   
   export const { setData } = mySlice.actions;
   export default mySlice.reducer;
   ```

2. Add to store:
   ```javascript
   // src/store/index.js
   import myFeature from './mySlice';
   
   export default configureStore({
     reducer: {
       // ... other reducers
       myFeature,
     },
   });
   ```

### Make API Call

```javascript
import fetchOrThrow from '@/common/util/fetchOrThrow';

const fetchData = async () => {
  try {
    const response = await fetchOrThrow('/api/devices');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
};
```

### Add Map Feature

```javascript
// src/map/MyMapFeature.js
import { useEffect } from 'react';
import { useMap } from './core/MapContext';

export default function MyMapFeature() {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    // Add map layer, source, etc.
    map.addLayer({
      id: 'my-layer',
      type: 'circle',
      source: 'my-source',
    });
    
    return () => {
      if (map.getLayer('my-layer')) {
        map.removeLayer('my-layer');
      }
    };
  }, [map]);
  
  return null;
}
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues

# PWA
npm run generate-pwa-assets  # Generate PWA icons
```

## Debugging

### Enable Debug Logs

```javascript
// In browser console
localStorage.setItem('debug', 'true');
```

### Check Redux State

Install Redux DevTools browser extension, then inspect state in browser.

### Check API Calls

Open browser DevTools → Network tab → Filter by XHR/Fetch

## Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

- Read [Architecture Overview](./ARCHITECTURE.md)
- Check [API Integration Guide](./API.md)
- Review [Contributing Guidelines](./CONTRIBUTING.md)
- Explore [Project Structure](./PROJECT_STRUCTURE.md)

## Getting Help

- Check [documentation](./README.md)
- Search [GitHub Issues](../../issues)
- Ask in [GitHub Discussions](../../discussions)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Material-UI Documentation](https://mui.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [MapLibre GL Documentation](https://maplibre.org)
- [Traccar API Reference](https://www.traccar.org/api-reference/)
