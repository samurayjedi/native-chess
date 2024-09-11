import _ from 'lodash';
import Piece from './Piece';
import Chessboard, { Coord, FactionColor } from './Chessboard';

// easy, the king can move 1 box to everywere
export const moveValidator = (piece: Piece, destination: Coord) => {
  const [rowDist, colDist] = piece.getDist(destination);

  return [0, 1].includes(rowDist) && [0, 1].includes(colDist);
};

export default class King extends Piece {
  public constructor(
    board: Chessboard,
    coord: Coord,
    variant: FactionColor = 'black',
  ) {
    super(board, 'king', coord, variant);
  }

  public canMove(destination: Coord): boolean {
    let temp: Piece | undefined = undefined;
    /* verify if the king can eat a piece whithout fall in check, first remove the piece from the square
     * if any is there and variant !== king variant. */
    _.remove(this.board.pieces, (p) => {
      const enemyInSquare =
        p.isEqualLocation(destination) && p.variant !== this.variant;
      if (enemyInSquare) {
        temp = p;
      }

      return enemyInSquare;
    });
    /** i only remove the piece for checks, the logic for eat that piece (if posible) is ahead,
     * in canMoveTo method, so, i need restore the piece after finished all tasks. */
    const restoreTemp = () => {
      if (temp) {
        this.board.pieces.push(temp);
      }
    };

    /** Now i can perform a check of all enemy pieces, if any of them is a threat for the king,
     * restraint the movement.
     */
    for (let i = 0; i < this.board.pieces.length; i++) {
      const p = this.board.pieces[i];

      if (p.variant !== this.variant && p.canMoveTo(destination)) {
        // the square is threatened, can't move
        restoreTemp();
        return false;
      }
    }

    restoreTemp();

    return super.canMove(destination);
  }

  public canMoveTo(destination: Coord): boolean {
    const firstChecks = super.canMoveTo(destination);
    if (!firstChecks) {
      return false;
    }

    if (
      this.board.pieces.find((piece) => {
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
