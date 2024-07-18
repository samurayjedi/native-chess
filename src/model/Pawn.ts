import _ from 'lodash';
import invariant from 'tiny-invariant';
import Piece from './Piece';
import Chessboard, { Coord } from './Chessboard';

export const moveValidator = (piece: Piece, destination: Coord) => {
  const [, colDist] = piece.getDist(destination);
  const firstMove = piece.getMoves() === 0;
  // if is the first time in move the pawn, i can move 2 boxes, depending the axis, 2 or -2
  const canMove2 = firstMove
    ? piece.coord[0] - destination[0] === (piece.variant === 'white' ? 2 : -2)
    : false;

  // the move is valid as long as the advance be one box in front or the first time two
  return (
    colDist === 0 &&
    (canMove2 ||
      piece.coord[0] - destination[0] === (piece.variant === 'white' ? 1 : -1))
  );
};

export default class Pawn extends Piece {
  public constructor(
    board: Chessboard,
    coord: Coord,
    variant: 'black' | 'white' = 'black',
  ) {
    super(board, 'pawn', coord, variant);
  }

  public canMoveTo(destination: Coord): boolean {
    const firstChecks = super.canMoveTo(destination);
    if (!firstChecks) {
      return false;
    }

    const [rowDist, colDist] = this.getDist(destination);
    // if the box has a piece
    if (this.board.pieces.find((piece) => piece.isEqualLocation(destination))) {
      /* i can move one box in / or \ if there is the oportunity of eat a piece !== variant */
      const piece = this.board.getPieceAt(destination[0], destination[1]);
      invariant(piece);
      const validAxis =
        this.variant === 'black'
          ? this.coord[0] < destination[0]
          : this.coord[0] > destination[0];

      return rowDist === colDist && validAxis && this.variant !== piece.variant;
    }

    return moveValidator(this, destination);
  }
}
