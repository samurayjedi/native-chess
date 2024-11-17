import { useCallback, useState } from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AppBar as PollitoAppbar, Toolbar } from '@samurayjedi/piwi-material';
import { useAppDispatch } from '../store/hooks';
import { openMenu } from '../store/app';
import { redo } from '../store/chess';
import Hamburger from './Hamburger';

export default function AppBar() {
  const dispatch = useAppDispatch();

  const onRedo = useCallback(() => {
    dispatch(redo());
  }, []);

  return (
    <PollitoAppbar
      color="transparent"
      style={{ position: 'absolute', zIndex: 998, elevation: 998 }}
    >
      <Toolbar>
        <Glue />
        <Menu />

        {/** 
         *         
        
        <IconButton onPress={onRedo}>
          <EvilIcons name="redo" color="white" />
        </IconButton>
        */}
      </Toolbar>
    </PollitoAppbar>
  );
}

const Glue = styled.View({
  flex: 1,
});

function Menu() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Hamburger
      key={`hamburger-${open ? 'open' : 'close'}`}
      open={open}
      onPress={() => {
        setOpen((prev) => !prev);
        dispatch(openMenu());
      }}
    />
  );
}
