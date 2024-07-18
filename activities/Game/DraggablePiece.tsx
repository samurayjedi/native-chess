import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import { Animated } from 'react-native';
import { PieceWrapper } from './StyledComponents';
import { PieceProps } from '../../src/pieces/types';
import { usePanResponder } from './hooks';
import { Coord } from '../../src/model/Chessboard';

function DraggablePiece({ Component, variant, coord }: DraggablePieceProps) {
  const dragXY = useRef(new Animated.ValueXY()).current;
  const currentCoord = useRef(coord);
  const [dragging, panResponder] = usePanResponder(currentCoord, dragXY);

  useEffect(() => {
    currentCoord.current = coord;
  }, [coord]);

  return (
    <PieceWrapper>
      <Animated.View
        style={{
          ...(dragging ? { transform: dragXY.getTranslateTransform() } : {}),
          opacity: dragging ? 0.4 : 1,
          flex: 0.9,
        }}
        {...panResponder.panHandlers}
      >
        <Component variant={variant} />
      </Animated.View>
    </PieceWrapper>
  );
}

export default React.memo(DraggablePiece, _.isEqual);

export interface DraggablePieceProps {
  Component: (props: PieceProps) => React.ReactNode;
  variant: 'black' | 'white';
  coord: Coord;
}

export interface PieceData {
  x: number;
  y: number;
  width: number;
  height: number;
}
