/**
 * Design Tokens - Aligned with Figma UIDesign
 * Google Maps inspired, modern & minimal design system
 * Source: UIDesign/src/styles/globals.css
 * 
 * Color Palette:
 * - Primary: #1a73e8 (Google Blue) - Primary actions, links
 * - Accent: #34a853 (Google Green) - Online status, success states
 * - Destructive: #ea4335 (Google Red) - Errors, offline states
 * - Muted: #f8f9fa - Subtle backgrounds
 * - Border: #dadce0 - Standard borders
 */

const tokens = {
  // Spacing: 4px base unit (Tailwind compatible)
  spacing: (factor) => `${4 * factor}px`,
  
  // Border radius: Figma standard 8px base
  borderRadius: {
    none: 0,
    sm: 4,      // 8px - 4px
    md: 6,      // 8px - 2px
    lg: 8,      // base 8px (standard)
    xl: 12,     // 8px + 4px
    full: 9999,
  },
  
  // Shadow system: Subtle, Google Maps style
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  
  // Layout dimensions
  drawer: {
    widthDesktop: '360px',
    widthTablet: '320px',
    miniVariantWidth: '64px',
  },
  
  // Typography hierarchy - matching Figma specs
  typography: {
    fontSize: {
      xs: 12,     // caption
      sm: 14,     // body/label
      base: 16,   // body base
      lg: 18,     // h4
      xl: 20,     // h2
      '2xl': 24,  // h1
    },
    lineHeight: {
      tight: 1.3,    // headings
      normal: 1.5,   // body, labels
      relaxed: 1.75,
    },
    weight: {
      normal: 400,
      medium: 500,   // labels, buttons
      semibold: 600, // headings
    },
  },
  
  // Component heights
  toolbar: 64,
  bottomBar: 56,
  buttonHeight: 40,
  inputHeight: 40,
  iconButton: 40,
  
  // Loading spinner
  spinnerSize: 48,
  
  // Transitions - smooth, standard (150ms from Tailwind)
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  
  // Map-specific tokens
  map: {
    controlSize: 40,
    controlSpacing: 8,
    controlBorder: 1,
  },
};

export default tokens;
