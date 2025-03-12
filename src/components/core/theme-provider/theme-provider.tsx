'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme } from '@/styles/theme/create-theme';
import darkScrollbar from '@mui/material/darkScrollbar';
import { components } from '@/styles/theme/components/components';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {

  const theme = createTheme();
  theme.components = {
    ...theme.components,
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
        fontFamily: themeParam.typography.fontFamily,
      }),
    },
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline
      />
      {children}
    </CssVarsProvider>
  );
}
