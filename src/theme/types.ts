import React from 'react';
// Adds new mui date-picker types to the theme to allow theme level overrides
// https://mui.com/x/react-data-grid/migration-v4/#module-augmentation
import type {} from '@mui/x-date-pickers/themeAugmentation';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontWeightSemibold: number;
    caption2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    fontWeightSemibold?: number;
    caption2?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    caption2: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    containedWhite: true;
    secondary: true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    accentGradient: true;
    primaryBackground: true;
  }
}
