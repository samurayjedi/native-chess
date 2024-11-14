import React, { useCallback } from 'react';
import styled from '@emotion/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeMenu } from '../store/app';
import AppBar from './AppBar';
import { Drawer } from '@samurayjedi/piwi-material';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector((state) => state.app.menuOpen);
  const onClose = useCallback(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <>
      <Root>
        <Background source={require('../assets/background.png')} />
        <AppBar />
        <Glue />
        {children}
        <Glue />
      </Root>
      <Drawer
        items={[
          ['solo', 'Single Player'],
          ['vs', '2 Players'],
          ['online', 'Find oponent'],
          ['settings', 'Settings'],
        ]}
        effect={4}
        colors={['#1d1d1f', '#413f46', '#cccccc', '#ff0000']}
        open={drawerOpen}
        onClose={onClose}
      />
    </>
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
