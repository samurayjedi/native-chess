/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import type { GameData, FactionColor } from './types';
import Piece, { PieceArray } from './Piece';
import Bishop from './types/Bishop';
import Queen from './types/Queen';
import Knight from './types/Knight';
import Rook from './types/Rook';
import King from './types/King';
import Pawn from './types/Pawn';

export default class Engine {
  public static rows = [1, 2, 3, 4, 5, 6, 7, 8] as const;
  public static cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

  public constructor(private gameData: GameData) {}

  public isWhiteTurn() {
    return this.gameData.turn === 'white' ? true : false;
  }

  public pieces() {
    return this.gameData.pieces;
  }

  public threat() {
    return this.gameData.threat;
  }

  public cementery() {
    return this.gameData.cementery;
  }

  public turn() {
    return this.gameData.turn;
  }

  public find(fn: (v: Piece, i: number, o: PieceArray[]) => boolean) {
    const p = this.pieces().find((rawPiece, index, arr) => {
      const piece = this.createPieceEngine(rawPiece);
      const result = _.attempt(fn, piece, index, arr);
      if (_.isError(result)) {
        throw result;
      }

      return result;
    });

    if (!p) {
      return undefined;
    }

    return this.createPieceEngine(p);
  }

  public getPieceIndex(row: number, col: number) {
    if (
      row > Engine.rows.length - 1 ||
      row < 0 ||
      col > Engine.cols.length - 1 ||
      col < 0
    ) {
      throw new Error('Invalid range!!');
    }

    for (let i = 0; i < this.pieces().length; i++) {
      const p = this.pieces()[i];
      if (p.coord[0] === row && p.coord[1] === col) {
        return i;
      }
    }

    throw new Error(`Piece ${[row, col]} not found!!!`);
  }

  public getPieceAt(row: number, col: number) {
    return this.pieces()[this.getPieceIndex(row, col)];
  }

  public getPieceEngineAt(row: number, col: number) {
    const rawPiece = this.getPieceAt(row, col);

    return this.createPieceEngine(rawPiece);
  }

  public getKing(variant: FactionColor) {
    for (let i = 0; i < this.pieces().length; i++) {
      const piece = this.pieces()[i];
      if (piece.type === 'king' && piece.variant === variant) {
        return piece;
      }
    }

    throw new Error(`Oooops, the ${variant} king not found!!!!!`);
  }

  public cloneData() {
    return _.cloneDeep(this.gameData);
  }

  public createPieceEngine(p: PieceArray): Piece {
    switch (p.type) {
      case 'bishop':
        return new Bishop(this, p.coord, p.variant, p.moves);
      case 'rook':
        return new Rook(this, p.coord, p.variant, p.moves);
      case 'knight':
        return new Knight(this, p.coord, p.variant, p.moves);
      case 'queen':
        return new Queen(this, p.coord, p.variant, p.moves);
      case 'king':
        return new King(this, p.coord, p.variant, p.moves);
      case 'pawn':
        return new Pawn(this, p.coord, p.variant, p.moves);
    }

    throw new Error(
      `Cannot create a piece engine instance of ${p.type} with the data: ${p}`,
    );
  }
}
