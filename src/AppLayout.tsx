import React, { useCallback, useState } from 'react';
import styled from '@emotion/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { openMenu, closeMenu } from '../store/app';
import Hamburger from './Hamburger';
import { Drawer } from '@samurayjedi/piwi-material';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector((state) => state.app.menuOpen);
  const onClose = useCallback(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <>
      <Background source={require('../assets/background.png')} />
      <Glue />
      {children}
      <Glue />
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
      <Menu />
    </>
  );
}

function Menu() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <MenuContainer>
      <Hamburger
        key={`hamburger-${open ? 'open' : 'close'}`}
        open={open}
        onPress={() => {
          setOpen((prev) => !prev);
          dispatch(openMenu());
        }}
      />
    </MenuContainer>
  );
}

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

const MenuContainer = styled.View({
  position: 'absolute',
});
