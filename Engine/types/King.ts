import _ from 'lodash';
import Engine from '../';
import Piece from '../Piece';
import { Coord, FactionColor } from '../types';

// easy, the king can move 1 box to everywere
export const moveValidator = (piece: Piece, destination: Coord) => {
  const [rowDist, colDist] = piece.getDist(destination);

  return [0, 1].includes(rowDist) && [0, 1].includes(colDist);
};

export default class King extends Piece {
  public constructor(
    board: Engine,
    coord: Coord,
    variant: FactionColor = 'black',
    moves: number = 0,
  ) {
    super(board, 'king', coord, variant, moves);
  }

  public canMove(destination: Coord): boolean {
    /* verify if the king can eat a piece whithout fall in check, first remove the piece from the square
     * if any is there and variant !== king variant. */
    const fakePieces = _.cloneDeep(this.board.pieces());
    _.remove(fakePieces, (sourcePiece) => {
      const p = this.board.createPieceEngine(sourcePiece);

      return p.isEqualLocation(destination) && p.variant !== this.variant;
    });

    /** Now i can perform a check of all enemy pieces, if any of them is a threat for the king,
     * restraint the movement.
     */
    for (let i = 0; i < fakePieces.length; i++) {
      const sourcePiece = fakePieces[i];
      const p = this.board.createPieceEngine(sourcePiece);

      if (p.variant !== this.variant && p.canAttack(destination)) {
        // the square is threatened, can't move
        return false;
      }
    }

    return super.canMove(destination);
  }

  public canMoveTo(destination: Coord): boolean {
    const firstChecks = super.canMoveTo(destination);
    if (!firstChecks) {
      return false;
    }

    if (
      this.board.find((piece) => {
        if (piece.isEqualLocation(destination)) {
          // restraint move if the destination contains a piece of the same color
          return this.variant === piece.variant;
        }

        // if the square is threatened, restraint the move
        return false;
      })
    ) {
      // if any piece is retrieve, restraint move
      return false;
    }

    return moveValidator(this, destination);
  }
}
