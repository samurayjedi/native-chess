import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/native';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

const SIZE = 32;
export default function Hamburger({ open, onPress, ...props }: HamburgerProps) {
  const [trigger, setTrigger] = useState(false);

  const { o, scale } = useSpring({
    o: !trigger ? 1 : 0,
    scale: !trigger ? 1 : 1.6,
    onRest: () => setTrigger(false),
    immediate: !trigger,
  });

  useEffect(() => {
    setTrigger(true);
  }, [open]);

  return (
    <TouchableWithoutFeedback
      onPress={(x) => {
        if (onPress) {
          onPress(x);
        }
      }}
      {...props}
    >
      <Container>
        <Circle>
          {!open ? (
            <FontAwesome name="bars" color="#222" size={SIZE / 2} />
          ) : (
            <AntDesign name="close" color="#222" size={SIZE / 2} />
          )}
        </Circle>
        <AnimatedCircleBorder
          style={{
            opacity: o.to((x) => x),
            transform: [{ scale: scale.to((x) => x) }],
            display: trigger ? 'flex' : 'none',
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}

const CircleBorderFowardRef = React.forwardRef<any, ViewProps>((props, ref) => {
  return <CircleBorder {...props} ref={ref} />;
});

const AnimatedCircleBorder = animated(CircleBorderFowardRef);

const Container = styled.View({
  position: 'relative',
  marginRight: 5,
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

export interface HamburgerProps extends TouchableWithoutFeedbackProps {
  open: boolean;
}
