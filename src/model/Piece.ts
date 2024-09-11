import _ from 'lodash';
import Chessboard, { Coord, FactionColor } from './Chessboard';

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
    public variant: FactionColor = 'black',
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
      // restraint moves if it'nt the white/black turn`
      console.error(`Is ${this.board.whiteTurn ? 'white' : 'black'} turn`);

      return false;
    } else if (this.board.threat) {
      const kingInCheck = this.board.getKing(
        this.board.threat.variant === 'black' ? 'white' : 'black', // this is equal to this.variant, change it!!
      );
      /** I backup the original coord, and move to x pos, if the piece threatening the king
       * is eated or cant move anymore towards the king, consider the move as valid, in
       * any case, always restores the backup because this is only for check.
       */
      const temp = this.coord;
      this.coord = destination;
      if (
        this.isEqualLocation(this.board.threat.coord) ||
        !this.board.threat.canMoveTo(kingInCheck.coord)
      ) {
        this.coord = temp;

        return true;
      }

      this.coord = temp;
      console.log(
        `The ${this.variant} king is threatened by ${this.board.threat.variant} ${this.board.threat.type} in ${this.board.threat.coord}`,
      );

      return false;
    }

    return true;
  }

  public canMoveTo(destination: Coord): boolean {
    return true;
  }

  /** all pieces eat in the same mode as move, except the fuck pawn!!!,
   * because it, this method.
   */
  public canAttack(destination: Coord) {
    return this.canMoveTo(destination);
  }

  public moveTo(coord: Coord) {
    if (!this.canMove(coord) || !this.canMoveTo(coord)) {
      return;
    }

    // if the position have a piece
    _.remove(this.board.pieces, (p) => {
      if (p.isEqualLocation(coord)) {
        if (p.type === 'king') {
          throw new Error('Cannot eat the king!!!!');
        }

        this.board.cementery[this.board.turn()][p.type]++;

        if (p === this.board.threat) {
          this.board.threat = undefined;
        }

        return true;
      }

      return false;
    });
    // perform the move
    this.coord = coord;
    this.moves++;
    // change turn
    this.board.whiteTurn = !this.board.whiteTurn;
    // check if the opposite king is in check
    const king = this.board.getKing(
      this.variant === 'black' ? 'white' : 'black',
    );
    if (this.canMoveTo(king.coord)) {
      console.log(`check!!!`);
      this.board.threat = this;
    }
    // call listeners
    this.board.listeners.onPieceMoved.forEach((listener) =>
      _.attempt(listener, [coord]),
    );
  }
}

export type PieceType = (typeof Piece.types)[number];
