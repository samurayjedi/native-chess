import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { useSpring, animated } from '@react-spring/native';

const IMAGE_W = 252;
const IMAGE_H = 251;
export default function Menu() {
  /** resize image maintaining the aspect ratio */
  const w = Dimensions.get('window').width - 80;
  const h = (IMAGE_H * w) / IMAGE_W;
  // slideup effect
  const { y } = useSpring({
    from: {
      y: 2000,
    },
    to: {
      y: 0,
    },
  });

  return (
    <animated.View
      style={{
        position: 'relative',
        alignItems: 'center',
        transform: [
          {
            translateY: y.to((piwi) => piwi),
          },
        ],
      }}
    >
      <MenuContainer width={w} height={h}>
        <MenuImage
          width={w}
          height={h}
          source={require('../../../assets/menu.png')}
        />
      </MenuContainer>
    </animated.View>
  );
}

const MenuImage = styled.Image<Props>(({ width, height }) => ({
  width,
  height,
  objectFit: 'scale-down',
  alignSelf: 'center',
  position: 'absolute',
}));

const MenuContainer = styled.View<Props>(({ width, height }) => ({
  width,
  height,
  backgroundColor: 'red',
}));

interface Props {
  width: number;
  height: number;
}
