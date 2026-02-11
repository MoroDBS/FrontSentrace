# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation structure in `docs/` directory
  - Architecture overview
  - Project structure guide
  - API integration guide
  - Deployment guide
  - Contributing guidelines
  - Quick start guide
- Professional README with detailed project information
- `.env.example` file for environment configuration
- Updated `.gitignore` for Next.js project structure

### Changed
- Migrated from React Router to Next.js App Router
- Updated project structure for better organization
- Improved documentation and code organization
- Simplified build system (Next.js only)

### Removed
- React Router DOM dependency
- Vite and related dependencies
- Obsolete configuration files and legacy routing code

## [6.11.1] - 2024-02-11

### Initial State
- React 19 with Next.js 16
- Material-UI 7 component library
- Redux Toolkit for state management
- MapLibre GL for mapping
- PWA support with offline capabilities
- Real-time tracking with WebSocket
- Comprehensive reporting system
- Multi-user management with RBAC

---

## Migration Notes

This project is currently undergoing migration from React Router to Next.js App Router. See [docs/MIGRATION_TODO.md](docs/MIGRATION_TODO.md) for progress tracking.

### Breaking Changes in Progress

- Navigation patterns changing from React Router to Next.js
- Component structure updates for Server/Client components
- Import paths may change during migration

### Upgrade Path

For users upgrading from previous versions:

1. Pull latest changes
2. Run `npm install` to update dependencies
3. Review `.env.example` and update your `.env` file
4. Run `npm run build` to test build
5. Check [docs/MIGRATION.md](docs/MIGRATION.md) for detailed changes

---

[Unreleased]: https://github.com/yourusername/FrontSentrace/compare/v6.11.1...HEAD
[6.11.1]: https://github.com/yourusername/FrontSentrace/releases/tag/v6.11.1
