/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import Piece from './Piece';
import Pawn from './Pawn';
import King from './King';
import Queen from './Queen';
import Bishop from './Bishop';
import Knight from './Knight';
import Rook from './Rook';

export default class Chessboard {
  public rows = [1, 2, 3, 4, 5, 6, 7, 8] as const;

  public cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

  public pieces = [
    new King(this, [0, 4]),
    new Queen(this, [0, 3]),
    new Bishop(this, [0, 5]),
    new Bishop(this, [0, 2]),
    new Knight(this, [0, 1]),
    new Knight(this, [0, 6]),
    new Rook(this, [0, 0]),
    new Rook(this, [0, 7]),
    new Pawn(this, [1, 0]),
    new Pawn(this, [1, 1]),
    new Pawn(this, [1, 2]),
    new Pawn(this, [1, 3]),
    new Pawn(this, [1, 4]),
    new Pawn(this, [1, 5]),
    new Pawn(this, [1, 6]),
    new Pawn(this, [1, 7]),
    // white
    new King(this, [7, 4], 'white'),
    new Queen(this, [7, 3], 'white'),
    new Bishop(this, [7, 5], 'white'),
    new Bishop(this, [7, 2], 'white'),
    new Knight(this, [7, 1], 'white'),
    new Knight(this, [7, 6], 'white'),
    new Rook(this, [7, 0], 'white'),
    new Rook(this, [7, 7], 'white'),
    new Pawn(this, [6, 0], 'white'),
    new Pawn(this, [6, 1], 'white'),
    new Pawn(this, [6, 2], 'white'),
    new Pawn(this, [6, 3], 'white'),
    new Pawn(this, [6, 4], 'white'),
    new Pawn(this, [6, 5], 'white'),
    new Pawn(this, [6, 6], 'white'),
    new Pawn(this, [6, 7], 'white'),
  ];

  public whiteTurn: boolean = true;

  public threat: Piece | undefined = undefined;

  public cementery = {
    white: {
      bishop: 0,
      knight: 0,
      queen: 0,
      rook: 0,
      pawn: 0,
    },
    black: {
      bishop: 0,
      knight: 0,
      queen: 0,
      rook: 0,
      pawn: 0,
    },
  };

  public listeners: {
    onChange: (() => void)[];
    onPieceMoved: ((to: Coord, from: Coord) => void)[];
  } = {
    onChange: [],
    onPieceMoved: [],
  };

  public getPieceAt(row: number, col: number): Piece | undefined {
    if (
      row > this.rows.length - 1 ||
      row < 0 ||
      col > this.cols.length - 1 ||
      col < 0
    ) {
      throw new Error('Invalid range!!');
    }

    return this.pieces.find(
      (piwi) => piwi.coord[0] === row && piwi.coord[1] === col,
    );
  }

  public getKing(variant: FactionColor) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.type === 'king' && piece.variant === variant) {
        return piece;
      }
    }

    throw new Error(`Oooops, the ${variant} king not found!!!!!`);
  }

  public isCoord(token: unknown): token is Coord {
    return (
      Array.isArray(token) &&
      token.length === 2 &&
      token.every((val) => typeof val === 'number')
    );
  }

  public toArray() {
    return this.pieces.map((p) => ({ type: p.type, coord: p.coord }));
  }

  public addListener<T extends keyof Chessboard['listeners']>(
    type: T,
    listener: Chessboard['listeners'][T][number],
  ) {
    /** fix later this 'as any' */
    this.listeners[type].push(listener as any);
  }

  public turn(): FactionColor {
    return this.whiteTurn ? 'white' : 'black';
  }
}

export type BoardProps = {
  children: (location: Coord, api: Piece | undefined) => React.ReactNode;
};

export type Coord = [number, number];

export type FactionColor = 'white' | 'black';
