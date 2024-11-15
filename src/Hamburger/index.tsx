import { useState } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const SIZE = 32;
export default function Hamburger(props: TouchableWithoutFeedbackProps) {
  const [open, setOpen] = useState(false);

  return (
    <TouchableWithoutFeedback {...props}>
      <Container>
        <Circle>
          {!open ? (
            <FontAwesome name="bars" color="#222" size={SIZE / 2} />
          ) : (
            <AntDesign name="close" color="#222" size={SIZE / 2} />
          )}
        </Circle>
        <CircleBorder />
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View({
  position: 'relative',
});

const Circle = styled.View({
  width: SIZE,
  height: SIZE,
  borderRadius: SIZE / 2,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
});

const CircleBorder = styled.View({
  position: 'absolute',
  width: SIZE,
  height: SIZE,
  borderRadius: SIZE / 2,
  borderColor: '#6b6b6b',
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
});
