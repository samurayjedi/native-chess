import styled from '@emotion/native';

export default function Hamburger() {
  return (
    <Circle>
      <Line />
      <Gap />
      <Line />
      <Gap />
      <Line />
    </Circle>
  );
}

const SIZE = 32;
const Circle = styled.View({
  width: SIZE,
  height: SIZE,
  borderRadius: SIZE / 2,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
});

const Line = styled.View({
  backgroundColor: '#222',
  width: SIZE / 2,
  height: 2,
});

const Gap = styled.View({
  height: 3,
});
