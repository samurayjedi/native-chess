import styled from '@emotion/native';
import Timer from './Timer';
import CountdownBorder from '../../../../src/components/CountdownBorder';
import { useGameContext } from '../../hooks';
import { FactionColor } from '../../../../src/model/Chessboard';

/** In the future, this component mount a timer or chronometer depending the game rules,
 * but meanwhile, only works with timer.
 */
export default function Alarm({ variant }: { variant: FactionColor }) {
  const turn = useGameContext();

  if (turn === variant) {
    return (
      <CountdownBorder
        size={60}
        time={30}
        elapsedColor="#e2a94f"
        strokeColor="#816f51"
      >
        <Timer />
      </CountdownBorder>
    );
  }

  return (
    <RawAlarmStroke>
      <Timer />
    </RawAlarmStroke>
  );
}

const RawAlarmStroke = styled.View({
  borderColor: '#787878',
  borderWidth: 4,
  borderRadius: 5,
  paddingTop: 6,
  paddingRight: 10,
  paddingBottom: 6,
  paddingLeft: 10,
});
