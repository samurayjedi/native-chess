import { useCallback } from 'react';
import styled from '@emotion/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import PollitoAppbar from '../material/AppBar';
import Toolbar from '../material/Toolbar';
import IconButton from '../material/IconButton';
import { useAppDispatch } from '../../store/hooks';
import { redo } from '../../store/chess';

export default function AppBar() {
  const dispatch = useAppDispatch();

  const onRedo = useCallback(() => {
    dispatch(redo());
  }, []);

  return (
    <PollitoAppbar color="transparent">
      <Toolbar>
        <Glue />
        <IconButton onPress={onRedo}>
          <EvilIcons name="redo" color="white" />
        </IconButton>
      </Toolbar>
    </PollitoAppbar>
  );
}

const Glue = styled.View({
  flex: 1,
});
