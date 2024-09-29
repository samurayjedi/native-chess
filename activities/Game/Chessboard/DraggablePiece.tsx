import React, { useRef, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { Animated } from 'react-native';
import { PieceWrapper } from '../StyledComponents';
import { usePanResponder } from './hooks';
import { Coord } from '../../../Engine/types';
import king from '../../../src/pieces/king';
import queen from '../../../src/pieces/queen';
import bishop from '../../../src/pieces/bishop';
import knight from '../../../src/pieces/knight';
import rook from '../../../src/pieces/rook';
import pawn from '../../../src/pieces/pawn';
import { useAppSelector } from '../../../store/hooks';
import Engine from '../../../Engine';
import { PieceArray } from '../../../Engine/Piece';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const assets = {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn,
} as const;

export default function DraggablePiece(props: DraggablePieceProps) {
  const { coord } = props;
  const havePiece = useAppSelector((state) => {
    const engine = new Engine(state.chess.board);
    try {
      engine.getPieceAt(coord[0], coord[1]);

      return true;
    } catch {
      return false;
    }
  });

  if (havePiece) {
    return <PollitoDraggablePiece {...props} />;
  }

  return <PieceWrapper />;
}

function makePieceSelector() {
  return createSelector(
    (state: RootState) => state.chess.board,
    (state: RootState, coord: Coord) => coord,
    (board, coord) => {
      const engine = new Engine(board);

      return engine.getPieceEngineAt(coord[0], coord[1]);
    },
  );
}

function PollitoDraggablePiece({ coord }: DraggablePieceProps) {
  const dragXY = useRef(new Animated.ValueXY()).current;
  const selectPiece = makePieceSelector();
  const piece = useAppSelector((state) => selectPiece(state, coord));
  const ref = useRef(piece);
  const [dragging, panResponder] = usePanResponder(ref, dragXY);
  const Component = assets[piece.type];

  useEffect(() => {
    ref.current = piece;
  }, [piece]);

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
        <Component variant={piece.variant} />
      </Animated.View>
    </PieceWrapper>
  );
}

export interface DraggablePieceProps {
  coord: Coord;
}

export interface PieceData {
  x: number;
  y: number;
  width: number;
  height: number;
}
