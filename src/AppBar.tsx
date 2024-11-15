import { useCallback } from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import {
  AppBar as PollitoAppbar,
  Toolbar,
  IconButton,
} from '@samurayjedi/piwi-material';
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
    <PollitoAppbar color="transparent">
      <Toolbar>
        <View style={{ width: 123 }} />
        <Hamburger onPress={() => console.log('I love astesia!!!')} />
        {/** 
         *         <Menu />
        <Glue />
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
  return (
    <IconButton
      onPress={() => {
        dispatch(openMenu());
      }}
    >
      <FontAwesomeIcons name="bars" color="white" />
    </IconButton>
  );
}
