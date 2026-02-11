/**
 * MUI Component Overrides - Figma UIDesign aligned
 * Google Maps-inspired design system
 * Standard border-radius: 8px (lg), shadows are subtle
 */
export default {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
  
  // AppBar: flat, borderless, subtle shadow
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: theme.tokens?.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }),
    },
  },
  
  // Toolbar: proper spacing
  MuiToolbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: theme.tokens?.toolbar || 64,
        padding: `0 ${theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2)}`,
      }),
    },
  },
  
  // Buttons: modern, rounded 8px, clear hierarchy
  MuiButton: {
    defaultProps: {
      disableElevation: false,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '14px',
        height: theme.tokens?.buttonHeight || 40,
        padding: `${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)} ${theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2)}`,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:hover': {
          boxShadow: theme.tokens?.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      }),
      contained: ({ theme }) => ({
        boxShadow: 'none',
        '&:hover': {
          boxShadow: theme.tokens?.shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: 1,
        '&:hover': {
          borderWidth: 1,
          background: theme.palette.action.hover,
        },
      }),
    },
  },
  
  // Input fields: modern, clean, 8px radius
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        backgroundColor: theme.palette.background.paper,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      }),
      input: {
        padding: '12px 14px',
        fontSize: '14px',
      },
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'medium',
    },
  },
  
  // Select
  MuiSelect: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
      }),
    },
  },
  
  // Form control
  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        width: '100%',
      },
    },
  },
  
  // Accordion: modern, clean, 8px radius
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        border: `1px solid ${theme.palette.divider}`,
        margin: `${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)} 0`,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:before': {
          display: 'none',
        },
        '&:hover': {
          boxShadow: theme.tokens?.shadows?.xs || 'none',
        },
      }),
    },
  },
  
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-expanded': {
          backgroundColor: theme.palette.action.selected,
        },
      }),
    },
  },
  
  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
      }),
    },
  },
  
  // Cards: minimal, clean shadows, 8px radius
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        boxShadow: theme.tokens?.shadows?.xs || '0 1px 2px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${theme.palette.divider}`,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:hover': {
          boxShadow: theme.tokens?.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
  },
  
  // Paper
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        backgroundImage: 'none', // No gradient
      }),
      elevation1: ({ theme }) => ({
        boxShadow: theme.tokens?.shadows?.xs || '0 1px 2px rgba(0, 0, 0, 0.05)',
      }),
      elevation2: ({ theme }) => ({
        boxShadow: theme.tokens?.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.1)',
      }),
    },
  },
  
  // Dialog: modern backdrop, 8px radius
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        boxShadow: theme.tokens?.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }),
    },
  },
  
  // Drawer: clean, minimal border
  MuiDrawer: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRight: `1px solid ${theme.palette.divider}`,
      }),
      paper: ({ theme }) => ({
        borderRight: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.default,
      }),
    },
  },
  
  // List items: clean hover states, 8px radius
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        margin: `${theme.tokens?.spacing ? theme.tokens.spacing(0.5) : theme.spacing(0.5)} ${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)}`,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          },
        },
      }),
    },
  },
  
  // Menu: modern dropdown with subtle shadow
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        boxShadow: theme.tokens?.shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${theme.palette.divider}`,
        marginTop: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
      }),
    },
  },
  
  // Snackbar: modern position and style
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        marginBottom: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
      }),
    },
  },
  
  // Tooltip: subtle, 8px radius
  MuiTooltip: {
    defaultProps: {
      enterDelay: 500,
      enterNextDelay: 500,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        fontSize: '12px',
        padding: `${theme.tokens?.spacing ? theme.tokens.spacing(0.5) : theme.spacing(0.5)} ${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)}`,
      }),
    },
  },
  
  // Table
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.divider,
        '@media print': {
          color: theme.palette.alwaysDark.main,
        },
      }),
      head: ({ theme }) => ({
        fontWeight: 600,
        backgroundColor: theme.palette.action.hover,
      }),
    },
  },
  
  // Chip: modern style, full radius
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.full || 9999,
        fontWeight: 500,
      }),
    },
  },
  
  // IconButton: better hover states, 8px radius
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.tokens?.borderRadius?.lg || 8,
        transition: theme.tokens?.transition?.base || 'all 200ms',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }),
    },
  },
  
  // Badge
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontSize: '11px',
        fontWeight: 600,
      },
    },
  },
};
