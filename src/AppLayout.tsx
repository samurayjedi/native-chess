import React, { useCallback, useRef } from 'react';
import styled from '@emotion/native';
import Constants from 'expo-constants';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleDrawer } from '../store/app';
import Hamburger from './Hamburger';
import { Drawer } from '@samurayjedi/piwi-material';
import type { Ref } from '@samurayjedi/piwi-material/src/Drawer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Root>
      <PiwiStatusBar />
      <Background source={require('../assets/background.png')} />
      <Glue />
      {children}
      <Glue />
      <VacaDrawer />
    </Root>
  );
}

function VacaDrawer() {
  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector((state) => state.app.menuOpen);
  const overlayRef = useRef<Ref | null>(null);

  const onPress = useCallback(() => {
    if (overlayRef.current) {
      const { ref } = overlayRef.current;
      if (ref.current) {
        const o = ref.current;

        if (!o.overlays.isAnimating) {
          dispatch(toggleDrawer());
        }
      }
    }
  }, []);

  return (
    <>
      <Drawer
        open={drawerOpen}
        ref={overlayRef}
        items={[
          ['solo', 'Single Player'],
          ['vs', '2 Players'],
          ['online', 'Find oponent'],
          ['settings', 'Settings'],
        ]}
        effect={5}
        colors={['#1d1d1f', '#413f46', '#cccccc', '#ff0000']}
        onItemSelected={([k, v], index) => {
          dispatch(toggleDrawer());
        }}
      />
      <MenuContainer>
        <Hamburger open={drawerOpen} onPress={onPress} />
      </MenuContainer>
    </>
  );
}

const Root = styled.View({
  backgroundColor: '#000',
  flex: 1,
  flexDirection: 'column',
});

const PiwiStatusBar = styled.View({
  width: '100%',
  height: Constants.statusBarHeight,
  backgroundColor: 'rgba(52, 52, 52, 0)',
});

const Background = styled.Image({
  width: '100%',
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

const MenuContainer = styled.View({
  position: 'absolute',
  top: Constants.statusBarHeight + 10,
  right: 5,
  zIndex: 998,
  elevation: 998,
});
