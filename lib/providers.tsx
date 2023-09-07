'use client'

/* Core */
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';


/* Instruments */
import { reduxStore } from '@/lib/redux';
import { theme } from '@/lib/mui'

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </Provider>
  )
}
