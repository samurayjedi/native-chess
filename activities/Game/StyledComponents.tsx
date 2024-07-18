import styled from '@emotion/native';
import type { SquareState } from './Square';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const boardSize = SCREEN_WIDTH - 16;
export const squareSize = boardSize / 8 - 0.8;

export const Chessboard = styled.View({
  position: 'relative',
  width: boardSize,
  height: boardSize,
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: '#d3d3d3',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const Square = styled.View<{ isDark: boolean; state: SquareState }>(
  ({ isDark, state }) => ({
    width: squareSize,
    height: squareSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: (() => {
      if (state === 'validMove') {
        return 'lightgreen';
      }
      if (state === 'invalidMove') {
        return 'pink';
      }

      return isDark ? 'lightgrey' : 'white';
    })(),
  }),
);

const colors = ['red', 'blue', 'yellow', 'magnenta', 'purple'];

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
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
