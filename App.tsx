import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './store';
import { theme } from '@samurayjedi/piwi-material';
import AppLayout from './src/AppLayout';
import Game from './activities/Game';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppLayout>
          <Game />
        </AppLayout>
        <StatusBar style="light" />
      </ThemeProvider>
    </Provider>
  );
}
