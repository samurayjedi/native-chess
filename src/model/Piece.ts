import _ from 'lodash';
import Chessboard, { Coord } from './Chessboard';

export default abstract class Piece {
  public static types = [
    'king',
    'pawn',
    'queen',
    'bishop',
    'rook',
    'knight',
  ] as const;

  protected moves: number;

  public constructor(
    public board: Chessboard,
    public type: PieceType,
    public coord: Coord,
    public variant: 'black' | 'white' = 'black',
  ) {
    this.moves = 0;
  }

  public getMoves() {
    return this.moves;
  }

  public isEqualLocation(coord: Coord): boolean {
    return this.coord[0] === coord[0] && this.coord[1] === coord[1];
  }

  public getDist(destination: Coord) {
    const rowDist = Math.abs(this.coord[0] - destination[0]);
    const colDist = Math.abs(this.coord[1] - destination[1]);

    return [rowDist, colDist];
  }

  public canMove(destination: Coord) {
    if (
      !(
        (this.variant === 'white' && this.board.whiteTurn) ||
        (this.variant === 'black' && !this.board.whiteTurn)
      )
    ) {
      // restraint moves if it'nt the white/black turn
      return false;
    } else if (this.board.threat) {
      const temp = this.coord;
      this.coord = destination;
      const kingInCheck = this.board.getKing(
        this.board.threat.variant === 'black' ? 'white' : 'black',
      );
      if (
        this.isEqualLocation(this.board.threat.coord) ||
        !this.board.threat.canMoveTo(kingInCheck.coord)
      ) {
        this.coord = temp;

        return true;
      }

      this.coord = temp;
      return false;
    }

    return true;
  }

  public canMoveTo(destination: Coord): boolean {
    return true;
  }

  public moveTo(coord: Coord) {
    if (!this.canMove(coord) || !this.canMoveTo(coord)) {
      return;
    }

    this.coord = coord;
    this.moves++;
    this.board.whiteTurn = !this.board.whiteTurn;
    // if the position have a piece
    _.remove(this.board.pieces, (p) => {
      if (this.isEqualLocation(p.coord)) {
        return p.variant !== this.variant;
      }

      return false;
    });
    // check if the opposite king is in check
    const king = this.board.getKing(
      this.variant === 'black' ? 'white' : 'black',
    );
    if (this.canMoveTo(king.coord)) {
      this.board.threat = this;
    }
  }
}

export type PieceType = (typeof Piece.types)[number];
