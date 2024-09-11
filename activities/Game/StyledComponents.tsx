import { useMemo } from 'react';
import styled from '@emotion/native';
import { StyleProp, View, ViewStyle } from 'react-native';
import type { SquareState } from './Chessboard/Square';
import { Dimensions, ViewProps } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ruleSize = 20;
// const borderWidth = 2;
// const borderColor = '#ecdfa8';
const boardSize =
  (SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT) - ruleSize; //  - borderWidth * 2
export const squareSize = boardSize / 8;
const rulesColor = 'transparent';

/* export const Supervaca = styled.View({
  borderWidth,
  borderColor,
}); */

export const Wrapper = styled.View({
  flexDirection: 'row',
});

export const Chessboard = styled.View({
  position: 'relative',
  width: boardSize,
  height: boardSize,
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const Letters = styled.View({
  width: boardSize + ruleSize,
  flexDirection: 'row',
});

export const Letter = styled.Text({
  width: squareSize,
  color: 'white',
  textAlign: 'center',
});

export const Numbers = styled.View({
  width: ruleSize,
  height: boardSize,
});

export const Number = styled.Text({
  width: ruleSize,
  height: squareSize,
  color: 'white',
  textAlign: 'center',
  verticalAlign: 'middle',
});

export function Square({ isDark, state, ...props }: SquareProps) {
  const styles = useMemo(
    () =>
      ({
        width: squareSize,
        height: squareSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }) as StyleProp<ViewStyle>,
    [],
  );

  return (
    <View
      {...props}
      style={[
        styles,
        {
          backgroundColor: (() => {
            if (state === 'validMove') {
              return '#90ee90';
            }
            if (state === 'invalidMove') {
              return '#e0115f';
            }

            return isDark ? '#808080' : '#bababa';
          })(),
        },
      ]}
    />
  );
}

export interface SquareProps extends ViewProps {
  isDark: boolean;
  state: SquareState;
}

export const PieceWrapper = styled.View({
  position: 'relative',
  width: squareSize,
  height: squareSize,
  justifyContent: 'center',
});

export const PiecesContainer = styled.View({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const colors = ['red', 'blue', 'yellow', 'magnenta', 'purple'];

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
