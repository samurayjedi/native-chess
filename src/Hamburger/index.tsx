import React, { useEffect, useState } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/native';
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
  const [aux, setAux] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={(x) => {
        setAux((prev) => !prev);
        if (onPress) {
          onPress(x);
        }
      }}
      {...props}
    >
      <Container>
        <Circle>
          <Icon open={open} />
        </Circle>
        <BorderAnimation
          key={`border-${aux ? 'expand' : 'shrink'}`}
          aux={aux}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}

function Icon({ open }: { open: boolean }) {
  const [s1, s2] = useSprings(2, [
    {
      x: !open ? 0 : -33,
      o: !open ? 1 : 0,
    },
    {
      x: !open ? 33 : 0,
      o: !open ? 0 : 1,
    },
  ]);

  return (
    <>
      <animated.View
        style={{
          opacity: s1.o.to((o) => o),
          transform: [{ translateX: s1.x.to((x) => x) }],
          position: !open ? 'relative' : 'absolute',
        }}
      >
        <FontAwesome name="bars" color="#222" size={SIZE / 2} />
      </animated.View>
      <animated.View
        style={{
          opacity: s2.o.to((o) => o),
          transform: [{ translateX: s2.x.to((x) => x) }],
          position: !open ? 'absolute' : 'relative',
        }}
      >
        <AntDesign name="close" color="#222" size={SIZE / 2} />
      </animated.View>
    </>
  );
}

function BorderAnimation({ aux }: { aux: boolean }) {
  const [trigger, setTrigger] = useState(false);

  const { o, scale } = useSpring({
    o: !trigger ? 1 : 0,
    scale: !trigger ? 1 : 1.6,
    onRest: () => setTrigger(false),
    immediate: !trigger,
  });

  useEffect(() => {
    setTrigger(true);
  }, [aux]);

  return (
    <AnimatedCircleBorder
      style={{
        opacity: o.to((x) => x),
        transform: [{ scale: scale.to((x) => x) }],
        display: trigger ? 'flex' : 'none',
      }}
    />
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
  overflow: 'hidden',
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
