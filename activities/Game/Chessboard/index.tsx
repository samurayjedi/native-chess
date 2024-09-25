import React, { useState, useMemo, useRef, useEffect } from 'react';
import _ from 'lodash';
import { LayoutRectangle } from 'react-native';
import { Coord } from '../../../Engine/types';
import { ChessboardContext, ChessboardContextType } from './hooks';
import Engine from '../../../Engine';
import {
  Chessboard as StyledChessboard,
  PiecesContainer,
} from '../StyledComponents';
import Square, { SquareRef } from './Square';
import DraggablePiece from './DraggablePiece';

export default function Chessboard({ parentRectRef }: ChessboardProps) {
  const squaresRef = useRef<SquareRef[][]>([[]]);
  const squaresCoord = useRef<LayoutRectangle[][]>([[]]);
  const ctxValue = useMemo<ChessboardContextType>(
    () => ({
      parentRectRef, // later, refactor boardRectRef to parentRectRef!
      squaresRef: squaresRef.current,
      squaresCoord: squaresCoord.current,
    }),
    [],
  );

  return (
    <ChessboardContext.Provider value={ctxValue}>
      <StyledChessboard>
        {Engine.rows.map((rowNumber, row) =>
          Engine.cols.map((colLetter, col) => (
            <React.Fragment key={`square-${rowNumber}-${colLetter}`}>
              <Square
                row={row}
                col={col}
                ref={(ref) => {
                  if (ref) {
                    if (!squaresRef.current[row]) {
                      squaresRef.current.push([]);
                    }
                    if (!squaresRef.current[row][col]) {
                      squaresRef.current[row].push({ state: ref.state });
                    } else {
                      squaresRef.current[row][col] = { state: ref.state };
                    }
                  }
                }}
                onLayout={(e) => {
                  if (!squaresCoord.current[row]) {
                    squaresCoord.current.push([]);
                  }
                  if (!squaresCoord.current[row][col]) {
                    squaresCoord.current[row].push(e.nativeEvent.layout);
                  } else {
                    squaresCoord.current[row][col] = e.nativeEvent.layout;
                  }
                }}
              />
            </React.Fragment>
          )),
        )}
        <PiecesContainer>
          {Engine.rows.map((rowNumber, row) =>
            Engine.cols.map((colLetter, col) => {
              const key = `piece-in-${rowNumber}-${colLetter}`;

              return <DraggablePiece key={key} coord={[row, col] as Coord} />;
            }),
          )}
        </PiecesContainer>
      </StyledChessboard>
    </ChessboardContext.Provider>
  );
}

export interface ChessboardProps {
  parentRectRef: React.MutableRefObject<LayoutRectangle>;
}
