import React from 'react';
import styled from '@emotion/native';
import AppBar from './AppBar';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Root>
      <Background source={require('../../assets/background.png')} />
      <AppBar />
      <Glue />
      {children}
      <Glue />
    </Root>
  );
}

const Root = styled.View({
  flex: 1,
  backgroundColor: '#000',
  justifyContent: 'center',
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

const Glue = styled.View({
  flex: 1,
});
