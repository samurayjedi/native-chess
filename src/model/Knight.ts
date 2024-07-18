import Piece from './Piece';
import Chessboard, { Coord } from './Chessboard';

export const moveValidator = (p: Piece, destination: Coord) => {
  const [rowDist, colDist] = p.getDist(destination);
  if ((rowDist === 2 && colDist === 1) || (rowDist === 1 && colDist === 2)) {
    return true;
  }

  return false;
};

export default class Knight extends Piece {
  public constructor(
    board: Chessboard,
    coord: Coord,
    variant: 'white' | 'black' = 'black',
  ) {
    super(board, 'knight', coord, variant);
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

        return false;
      })
    ) {
      // if any piece is retrieve, restraint move
      return false;
    }

    return moveValidator(this, destination);
  }
}
