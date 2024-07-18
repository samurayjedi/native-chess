import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';
import { StyleSheet, Text, View } from 'react-native';
import Game from './activities/Game';

export default function App() {
  return (
    <Root>
      <Game />
      <StatusBar style="auto" />
    </Root>
  );
}

const Root = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
});
