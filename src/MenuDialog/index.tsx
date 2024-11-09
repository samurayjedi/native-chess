import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import styled from '@emotion/native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { closeMenu } from '../../store/app';
import Menu from './Menu';

export default function MenuDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.app.menuOpen);

  return (
    <Modal visible={open} transparent={true} animationType="fade">
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(closeMenu());
        }}
      >
        <Backdrop />
      </TouchableWithoutFeedback>
      <Glue />
      <Menu />
      <Glue />
    </Modal>
  );
}

const Backdrop = styled.View(({ theme }) => ({
  position: 'absolute',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  backgroundColor: 'rgba(0,0,0,.8)',
}));

const Glue = styled.View({
  flex: 1,
});
