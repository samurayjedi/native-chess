import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './store';
import PIWI_THEME from './src/theme';
import Main from './src/components/Main';
import Game from './activities/Game';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={PIWI_THEME}>
        <Main>
          <Game />
        </Main>
        <StatusBar style="light" />
      </ThemeProvider>
    </Provider>
  );
}
