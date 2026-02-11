import { grey, green, indigo, blue, orange, red } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

/**
 * Figma UIDesign Palette - Google Maps inspired
 * Source: UIDesign/src/styles/globals.css
 * 
 * Light Mode:
 * - Primary: #1a73e8 (Google Blue)
 * - Accent: #34a853 (Google Green) - online status
 * - Destructive: #ea4335 (Google Red) - errors, offline
 * 
 * Dark Mode:
 * - Primary: #8ab4f8 (Light Blue)
 * - Accent: #81c995 (Light Green)
 * - Destructive: #f28b82 (Light Red)
 */
export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? '#1a1a1a' : '#f5f5f5',
    paper: darkMode ? '#292929' : '#ffffff',
  },
  
  // Primary: Google Blue - used for primary actions
  primary: {
    main: validatedColor(server?.attributes?.colorPrimary) || (darkMode ? '#8ab4f8' : '#1a73e8'),
    light: darkMode ? '#aecbfa' : '#4285f4',
    dark: darkMode ? '#5f9ff1' : '#1557b0',
    contrastText: darkMode ? '#202124' : '#ffffff',
  },
  
  // Secondary: Neutral grays
  secondary: {
    main: darkMode ? '#2d2d2d' : '#f1f3f4',
    light: darkMode ? '#3c4043' : '#f8f9fa',
    dark: darkMode ? '#1a1a1a' : '#e8eaed',
    contrastText: darkMode ? '#e8eaed' : '#202124',
  },
  
  // Neutral greys (Google style)
  neutral: {
    main: grey[500],
  },
  
  // Text colors (matching Figma)
  text: {
    primary: darkMode ? '#e8eaed' : '#202124',
    secondary: darkMode ? '#9aa0a6' : '#5f6368',
    disabled: darkMode ? '#5f6368' : '#9aa0a6',
  },
  
  // Divider (matching Figma border)
  divider: darkMode ? '#3c4043' : '#dadce0',
  
  // Status colors (from Figma)
  success: {
    main: darkMode ? '#81c995' : '#34a853',      // online
    light: darkMode ? '#9dd4a9' : '#57bb76',
    dark: darkMode ? '#5fa374' : '#2d9149',
  },
  warning: {
    main: darkMode ? '#fdd663' : '#fbbc04',      // idle
    light: darkMode ? '#ffe088' : '#fce181',
    dark: darkMode ? '#f9b233' : '#f9ab00',
  },
  error: {
    main: darkMode ? '#f28b82' : '#ea4335',      // offline
    light: darkMode ? '#f5ada9' : '#f4817f',
    dark: darkMode ? '#e56b5f' : '#d33827',
  },
  info: {
    main: darkMode ? '#8ab4f8' : '#1a73e8',      // primary/online
    light: darkMode ? '#aecbfa' : '#4285f4',
    dark: darkMode ? '#5f9ff1' : '#1557b0',
  },
  
  // Map-specific
  geometry: {
    main: '#1a73e8',  // Primary blue for geofences
  },
  
  // Always dark (for print)
  alwaysDark: {
    main: grey[900],
  },
  
  // Action colors (hover, focus, selected states)
  action: {
    hover: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    selected: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    focus: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    disabled: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
});
