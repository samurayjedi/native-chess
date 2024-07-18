import React, { useMemo, useState, useRef } from 'react';
import _ from 'lodash';
import { LayoutRectangle } from 'react-native';
import { PieceProps } from '../../src/pieces/types';
import ChessboardModel, { Coord } from '../../src/model/Chessboard';
import PieceModel, { PieceType } from '../../src/model/Piece';
import { Chessboard, PieceWrapper, PiecesContainer } from './StyledComponents';
import Square, { SquareRef } from './Square';
import DraggablePiece from './DraggablePiece';
import king from '../../src/pieces/king';
import queen from '../../src/pieces/queen';
import bishop from '../../src/pieces/bishop';
import knight from '../../src/pieces/knight';
import rook from '../../src/pieces/rook';
import pawn from '../../src/pieces/pawn';

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

const api = new ChessboardModel();
export const BoardContext = React.createContext<TheBoardContext>(
  {} as unknown as any,
);
export default function FormBuilder() {
  const boardRectRef = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const squaresRef = useRef<SquareRef[][]>([[]]);
  const squaresCoord = useRef<LayoutRectangle[][]>([[]]);
  const [, setPieces] = useState(api.toArray());
  const ctxValue = useMemo<TheBoardContext>(
    () => ({
      api,
      boardRectRef,
      squaresRef: squaresRef.current,
      squaresCoord: squaresCoord.current,
      setPieces,
    }),
    [],
  );

  return (
    <Chessboard onLayout={(e) => (boardRectRef.current = e.nativeEvent.layout)}>
      <BoardContext.Provider value={ctxValue}>
        {api.rows.map((rowNumber, row) =>
          api.cols.map((colLetter, col) => {
            const piece = api.getPieceAt(row, col);

            return (
              <>
                <Square
                  key={`square-${rowNumber}-${colLetter}`}
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
              </>
            );
          }),
        )}
        <PiecesContainer>
          {api.rows.map((rowNumber, row) =>
            api.cols.map((colLetter, col) => {
              const piece = api.getPieceAt(row, col);

              if (piece) {
                return (
                  <DraggablePiece
                    Component={assets[piece.type]}
                    variant={piece.variant}
                    coord={[row, col] as Coord}
                  />
                );
              }

              return <PieceWrapper />;
            }),
          )}
        </PiecesContainer>
      </BoardContext.Provider>
    </Chessboard>
  );
}

export interface TheBoardContext {
  api: ChessboardModel;
  boardRectRef: React.MutableRefObject<LayoutRectangle>;
  squaresRef: SquareRef[][];
  squaresCoord: LayoutRectangle[][];
  setPieces: React.Dispatch<
    React.SetStateAction<
      {
        type: PieceType;
        coord: Coord;
      }[]
    >
  >;
}

export interface DraggingCoord {
  x: number;
  y: number;
}
