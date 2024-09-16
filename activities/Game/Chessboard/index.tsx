import React, { useState, useMemo, useRef, useEffect } from 'react';
import _ from 'lodash';
import { LayoutRectangle } from 'react-native';
import { api } from '../../../App';
import { ChessboardContext, ChessboardContextType } from './hooks';
import { PieceProps } from '../../../src/pieces/types';
import { Coord } from '../../../src/model/Chessboard';
import PieceModel from '../../../src/model/Piece';
import {
  Chessboard as StyledChessboard,
  PieceWrapper,
  PiecesContainer,
} from '../StyledComponents';
import Square, { SquareRef } from './Square';
import DraggablePiece from './DraggablePiece';
import king from '../../../src/pieces/king';
import queen from '../../../src/pieces/queen';
import bishop from '../../../src/pieces/bishop';
import knight from '../../../src/pieces/knight';
import rook from '../../../src/pieces/rook';
import pawn from '../../../src/pieces/pawn';

const pieces = {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn,
} as const;

const assets = (() => {
  const record: Record<string, (props: PieceProps) => React.JSX.Element> = {};
  PieceModel.types.forEach((type) => {
    record[type] = pieces[type];
  });

  return record;
})();

export default function Chessboard({ parentRectRef }: ChessboardProps) {
  const [, forceRender] = useState(false);
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

  useEffect(() => {
    /** force rerender the chessboard */
    api.addListener('onChange', () => forceRender((prev) => !prev));

    /** remember, later add a function for, when unmount, remove the previous listener */
  }, []);

  return (
    <ChessboardContext.Provider value={ctxValue}>
      <StyledChessboard>
        {api.rows.map((rowNumber, row) =>
          api.cols.map((colLetter, col) => (
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
          {api.rows.map((rowNumber, row) =>
            api.cols.map((colLetter, col) => {
              const piece = api.getPieceAt(row, col);
              const key = `piece-in-${rowNumber}-${colLetter}`;

              if (piece) {
                return (
                  <DraggablePiece
                    key={key}
                    Component={assets[piece.type]}
                    variant={piece.variant}
                    coord={[row, col] as Coord}
                  />
                );
              }

              return <PieceWrapper key={key} />;
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
