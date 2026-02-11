# FrontSentrace

> Modern GPS tracking and fleet management web application

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE.txt)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)

## Overview

FrontSentrace is a comprehensive GPS tracking platform frontend built with modern web technologies. It provides real-time vehicle tracking, fleet management, geofencing, reporting, and analytics capabilities.

### Key Features

- **Real-time Tracking** - Live device monitoring with WebSocket updates
- **Interactive Maps** - MapLibre GL-based mapping with custom controls
- **Geofencing** - Create and manage geographic boundaries
- **Reports & Analytics** - Trip, stop, event, and summary reports with Excel export
- **Multi-user Management** - Role-based access control
- **Notifications** - Configurable alerts for events
- **PWA Support** - Installable progressive web app with offline capabilities
- **Responsive Design** - Optimized for desktop and mobile devices

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Component Library:** Material-UI 7
- **State Management:** Redux Toolkit
- **Maps:** MapLibre GL
- **Styling:** Emotion + TSS React
- **Language:** JavaScript/TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API server (Traccar server)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd FrontSentrace

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API endpoint
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

## Project Structure

```
FrontSentrace/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   └── layout.tsx         # Root layout
├── src/
│   ├── common/            # Shared utilities & components
│   │   ├── components/    # Reusable UI components
│   │   ├── util/          # Helper functions
│   │   ├── attributes/    # Attribute configurations
│   │   └── theme/         # Theme configuration
│   ├── map/               # Map components & controls
│   │   ├── core/          # Core map utilities
│   │   ├── main/          # Main map features
│   │   ├── draw/          # Drawing tools
│   │   └── overlay/       # Map overlays
│   ├── store/             # Redux state management
│   ├── resources/         # Static resources (i18n, images)
│   └── components/        # Feature components
├── public/                # Static assets
├── docs/                  # Documentation
└── package.json
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Quick Start Guide](docs/QUICK_START.md)** - Get started in minutes
- **[Architecture Overview](docs/ARCHITECTURE.md)** - System architecture and design patterns
- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Directory organization and file conventions
- **[API Integration](docs/API.md)** - Backend API integration guide
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Contributing Guidelines](docs/CONTRIBUTING.md)** - How to contribute to the project

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8082
```

### Map Configuration

Map styles and providers can be configured in user preferences. Supported providers:
- OpenStreetMap
- Google Maps
- Custom tile servers

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE.txt](LICENSE.txt) file for details.

## Acknowledgments

Built on top of [Traccar](https://www.traccar.org/) - open source GPS tracking system.

## Support

For issues and questions:
- GitHub Issues: [Report a bug](../../issues)
- Documentation: [docs/](docs/)

---

**Version:** 6.11.1
