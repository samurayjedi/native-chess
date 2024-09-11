import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import styled from '@emotion/native';
import Game from './activities/Game';

export default function App() {
  return (
    <>
      <Root>
        <Background source={require('./assets/background.png')} />
        <Game />
      </Root>
      <StatusBar style="light" />
    </>
  );
}

const Root = styled.View({
  flex: 1,
  backgroundColor: '#000',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: Constants.statusBarHeight,
});

const Background = styled.Image({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flex: 1,
  resizeMode: 'cover',
});

const Piwi = styled.View({
  width: 100,
  height: 100,
  alignSelf: 'center',
});
