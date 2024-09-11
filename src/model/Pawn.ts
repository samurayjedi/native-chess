import _ from 'lodash';
import invariant from 'tiny-invariant';
import Piece from './Piece';
import Chessboard, { Coord, FactionColor } from './Chessboard';

export const moveValidator = (piece: Piece, destination: Coord) => {
  const [, colDist] = piece.getDist(destination);
  const firstMove = piece.getMoves() === 0;
  // if is the first time in move the pawn, i can move 2 boxes, depending the axis, 2 or -2
  const canMove2 = firstMove
    ? piece.coord[0] - destination[0] === (piece.variant === 'white' ? 2 : -2)
    : false;

  // the move is valid as long as the advance be one box in front or the first time two
  const validMove =
    colDist === 0 &&
    (canMove2 ||
      piece.coord[0] - destination[0] === (piece.variant === 'white' ? 1 : -1));
  const notAnyPiece = !piece.board.pieces.find((p) =>
    p.isEqualLocation(destination),
  );

  console.log(`validMove: ${validMove} && notAnyPiece: ${notAnyPiece}`);

  return validMove && notAnyPiece;
};

export default class Pawn extends Piece {
  public constructor(
    board: Chessboard,
    coord: Coord,
    variant: FactionColor = 'black',
  ) {
    super(board, 'pawn', coord, variant);
  }

  private isMovingDiagonal(destination: Coord) {
    /** moving /\, forward */
    const [rowDist, colDist] = this.getDist(destination);
    if (rowDist === colDist && rowDist === 1) {
      console.log(`${rowDist} === ${colDist} && ${rowDist} === 1`);

      const validAxis =
        this.variant === 'black'
          ? this.coord[0] < destination[0]
          : this.coord[0] > destination[0];

      return validAxis;
    }

    return false;
  }

  public canMoveTo(destination: Coord): boolean {
    const firstChecks = super.canMoveTo(destination);
    if (!firstChecks) {
      return false;
    }

    if (this.isMovingDiagonal(destination)) {

      return Boolean(this.board.pieces.find((piwi) =>
        piwi.isEqualLocation(destination) && this.variant !== piwi.variant,
      ));
    }

    return moveValidator(this, destination);
  }

  public canAttack(destination: Coord): boolean {
    if (this.isMovingDiagonal)
  }
}
