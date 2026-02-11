# Contributing Guidelines

Thank you for considering contributing to FrontSentrace! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/FrontSentrace.git
   cd FrontSentrace
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

Examples:
- `feature/add-device-filter`
- `fix/map-marker-position`
- `docs/update-api-guide`

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

Examples:
```
feat(map): add custom marker clustering

fix(reports): correct date range calculation

docs(api): update authentication section
```

### Code Style

We use ESLint with Airbnb configuration. Run linting before committing:

```bash
npm run lint
npm run lint:fix
```

#### JavaScript/TypeScript Guidelines

- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Destructure props and state
- Use meaningful variable names
- Add JSDoc comments for complex functions

Example:
```javascript
/**
 * Formats device position data for display
 * @param {Object} position - Position object from API
 * @param {string} attribute - Attribute key to format
 * @returns {string} Formatted value
 */
const formatPosition = (position, attribute) => {
  // Implementation
};
```

#### React Guidelines

- One component per file
- Use `'use client'` directive for client components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for new components

Example component structure:
```jsx
'use client';

import { useState } from 'react';
import { Button } from '@mui/material';

export default function MyComponent({ initialValue }) {
  const [value, setValue] = useState(initialValue);
  
  const handleClick = () => {
    setValue(value + 1);
  };
  
  return (
    <Button onClick={handleClick}>
      Count: {value}
    </Button>
  );
}
```

#### Styling Guidelines

- Use Material-UI components when possible
- Use `makeStyles` from tss-react for custom styles
- Follow theme tokens for consistency
- Ensure responsive design (mobile-first)

```javascript
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  },
}));
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Write tests for new features
- Update tests when modifying existing code
- Aim for meaningful test coverage
- Use descriptive test names

Example:
```javascript
describe('formatSpeed', () => {
  it('should convert knots to km/h', () => {
    expect(formatSpeed(10, 'kmh')).toBe('18.52 km/h');
  });
  
  it('should handle zero speed', () => {
    expect(formatSpeed(0, 'kmh')).toBe('0 km/h');
  });
});
```

## Pull Request Process

### Before Submitting

1. **Update documentation** - If you changed APIs or added features
2. **Run linting** - `npm run lint:fix`
3. **Test thoroughly** - Test your changes in different scenarios
4. **Update CHANGELOG** - Add entry for your changes
5. **Rebase on main** - Ensure your branch is up to date

### Submitting PR

1. Push your branch to your fork
2. Open a Pull Request against `main` branch
3. Fill out the PR template completely
4. Link related issues
5. Request review from maintainers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

### Review Process

- Maintainers will review your PR
- Address feedback and requested changes
- Once approved, maintainers will merge

## Project Structure

When adding new features, follow the existing structure:

```
src/
├── common/           # Shared utilities
│   ├── components/   # Reusable UI components
│   ├── util/         # Helper functions
│   └── theme/        # Theme configuration
├── map/              # Map-related features
├── reports/          # Reporting features
├── settings/         # Settings pages
└── store/            # Redux state
```

## Adding New Features

### 1. Plan Your Feature

- Discuss in GitHub Issues first
- Get feedback from maintainers
- Consider impact on existing features

### 2. Implement

- Follow existing patterns
- Keep changes focused
- Write clean, readable code

### 3. Document

- Add JSDoc comments
- Update relevant documentation
- Add usage examples

### 4. Test

- Test in different browsers
- Test on mobile devices
- Test with different user roles

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 6.11.1]

## Screenshots
If applicable

## Additional Context
Any other relevant information
```

## Feature Requests

### Feature Request Template

```markdown
## Problem
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Mockups, examples, etc.
```

## Documentation

### Updating Documentation

- Keep documentation in sync with code
- Use clear, concise language
- Include code examples
- Add screenshots when helpful

### Documentation Structure

- `README.md` - Project overview
- `docs/ARCHITECTURE.md` - System architecture
- `docs/API.md` - API integration guide
- `docs/MIGRATION.md` - Migration guides
- `docs/CONTRIBUTING.md` - This file

## Community

### Getting Help

- GitHub Discussions - General questions
- GitHub Issues - Bug reports and feature requests
- Pull Requests - Code contributions

### Recognition

Contributors will be recognized in:
- CHANGELOG.md
- GitHub contributors page
- Release notes

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

## Questions?

Feel free to ask questions in GitHub Discussions or open an issue.

Thank you for contributing! 🎉
