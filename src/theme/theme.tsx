import { FC, ReactNode } from 'react';
import { createTheme, lighten } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { colors } from './colors';

/**
 * See these links for information on ways of using `theme`:
 * - https://mui.com/system/styles/advanced/#accessing-the-theme-in-a-component
 * - https://mui.com/material-ui/customization/theming/#nesting-the-theme
 * - https://mui.com/material-ui/customization/how-to-customize/#2-reusable-component
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.indigo,
      light: lighten(colors.indigo, 0.9),
      contrastText: colors.white,
    },
    secondary: {
      main: colors.green,
    },
    error: {
      main: colors.salmon,
    },
    success: {
      main: colors.green,
      contrastText: colors.white,
    },
    warning: {
      main: colors.yellow,
      light: '#fff7e6',
      contrastText: colors.darkNavy,
    },
    text: {
      primary: colors.darkNavy,
      secondary: colors.stone,
    },
    background: {
      default: lighten(colors.coolGrey, 0.9),
      paper: colors.white,
    },
    divider: '#F1F1F2',
  },
  spacing: 8,
  shape: { borderRadius: 4 },
  breakpoints: {
    // uses all the same defaults, but makes the xl 1920.
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
  zIndex: {
    // TEMPORARY: drawer zIndex must be < 1000 so that TeacherFeedbackDrawer renders
    //            on top of our app navigation. This can be removed after feedback-components gets updated
    speedDial: 850,
    fab: 850,
    appBar: 900,
    drawer: 999,
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ ownerState, theme }) => ({
          // Default autocomplete to 8 elevation in order to match default <Select /> style
          boxShadow:
            typeof ownerState.componentsProps?.paper?.elevation !== 'number'
              ? theme.shadows[8]
              : undefined,
        }),
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'containedWhite' },
          style: {
            backgroundColor: colors.white,
            color: colors.indigoDark,
            '&:hover': {
              backgroundColor: colors.indigoDark,
              color: colors.white,
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: lighten(colors.stone, 0.9),
            '&:hover': {
              backgroundColor: lighten(colors.coolGrey, 0.7),
              boxShadow: `0 3px 6px 0 rgba(0, 0, 0, 0.2)`,
            },
            '&:focus': {
              backgroundColor: lighten(colors.coolGrey, 0.9),
              boxShadow: `0 3px 6px 0 rgba(0, 0, 0, 0.2)`,
            },
            '&.Mui-disabled': {
              backgroundColor: lighten(colors.coolGrey, 0.7),
              color: colors.white,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
        contained: {
          '&:hover': {
            backgroundColor: colors.indigoDark,
            boxShadow: `0 3px 6px 0 rgba(0, 0, 0, 0.2)`,
          },
          '&:focus': {
            boxShadow: `0 0 6px 0 rgba(0, 0, 0, 0.8)`,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.mist,
            color: colors.coolGrey,
          },
        },
        outlined: {
          border: 'none',
          backgroundColor: colors.white,
          // Recreate the border around the button without affecting the button's size.
          '&::after': {
            content: "''",
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            border: `2px solid ${colors.indigo}`,
            borderRadius: 'inherit',
          },
          '&:hover, &:focus': {
            border: 'none',
          },
          '&:hover': {
            boxShadow: `0 3px 6px 0 rgba(0, 0, 0, 0.2)`,
          },
          '&.Mui-disabled': {
            color: colors.coolGrey,
            border: 'none',
          },
          '&.Mui-disabled::after': {
            border: `2px solid ${colors.coolGrey}`,
          },
        },
        sizeSmall: {
          fontSize: '0.8125rem',
          fontWeight: 500,
          padding: '4px 18px',
        },
        sizeMedium: {
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '6px 18px',
        },
        sizeLarge: {
          fontSize: '0.9375rem',
          fontWeight: 700,
          padding: '8px 24px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '&.MuiPopover-root': {
            '& .MuiPaper-root.MuiPaper-rounded ': {
              borderRadius: '0 0 4px 4px',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body2,
          '&.Mui-selected': {
            backgroundColor: lighten(colors.stone, 0.9),
            color: colors.indigo,
            fontWeight: 600,
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: ({ theme }) => ({
          ...theme.typography.body2,
          fontWeight: 700,
        }),
        icon: {
          color: colors.darkNavy,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          /**
           * Essentially, when a radio button within the form control is checked
           * we want to apply a `backgroundColor` and `borderRadius`
           * to the radio button and its label sibling
           * since we can't apply these styles to the parent form control label
           * based on whether the child radio button is checked
           */
          '.MuiRadio-root.Mui-checked, .MuiRadio-root.Mui-checked + .MuiFormControlLabel-label':
            {
              backgroundColor: theme.palette.primary.light,
              fontWeight: theme.typography.fontWeightSemibold,
            },
          '.MuiFormControlLabel-label': {
            display: 'inline-flex',
            alignSelf: 'stretch',
            alignItems: 'center',
            width: '100%',
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
          },
          '.MuiRadio-root': {
            borderRadius: 0,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
          },
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      variants: [
        {
          props: { variant: 'accentGradient' },
          style: {
            backgroundColor: colors.orange,
            backgroundImage: `linear-gradient(to right, ${colors.salmon} 11.5%, ${colors.orange} 85.5%)`,
            color: colors.white,
            p: {
              color: colors.white,
            },
          },
        },
        {
          props: { variant: 'primaryBackground' },
          style: {
            backgroundColor: colors.indigo,
            color: colors.white,
            p: {
              color: colors.white,
            },
          },
        },
      ],
      styleOverrides: {
        rounded: {
          borderRadius: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          boxShadow: ownerState.raised
            ? '0px 4px 15px rgba(0, 0, 0, 0.07)'
            : undefined,
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        avatar: ({ theme }) => ({
          marginRight: theme.spacing(1),
        }),
        title: ({ theme }) => ({
          ...theme.typography.body1,
          fontWeight: theme.typography.fontWeightSemibold,
        }),
        subheader: ({ theme }) => ({
          ...theme.typography.caption,
          fontWeight: theme.typography.fontWeightMedium,
        }),
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          borderRadius: 4,
          '&.Mui-selected': {
            fontWeight: 700,
            '&:hover, &:focus': {
              backgroundColor: colors.indigo,
            },
          },
        },
        today: {
          borderColor: colors.indigo,
          color: colors.indigo,
          '&:not(.Mui-selected)': {
            borderColor: colors.indigo,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // TEMPORARY: Override antd applying `width: 100%` globally to legend tags
        notchedOutline: {
          '& legend': {
            width: 'auto',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: 'rgba(0,0,0,.6)',
          borderRadius: 3,
          ...theme.typography.caption2,
        }),
        arrow: {
          color: 'rgba(0,0,0,.6)',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          caption: 'p',
          caption2: 'span',
        },
      },
      variants: [
        {
          props: { variant: 'body2', color: 'warning' },
          style: {
            color: colors.yellow,
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.33,
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: '"Montserrat", Verdana, Arial, sans-serif',
    allVariants: {
      fontFamily: '"Montserrat", Verdana, Arial, sans-serif',
    },
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '6rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '-0.015625em',
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '-0.008333em',
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '2.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00625em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.009375em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.010714em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
    caption2: {
      fontSize: '0.625rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
      letterSpacing: '0.02857em',
    },
  },
});
