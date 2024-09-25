import type { PieceArray } from './Piece';

export type Coord = [number, number];

export type FactionColor = 'white' | 'black';

export interface GameData {
  turn: FactionColor;
  threat: PieceArray | undefined;
  pieces: PieceArray[];
  cementery: {
    white: {
      bishop: number;
      knight: number;
      queen: number;
      rook: number;
      pawn: number;
    };
    black: {
      bishop: number;
      knight: number;
      queen: number;
      rook: number;
      pawn: number;
    };
  };
}
