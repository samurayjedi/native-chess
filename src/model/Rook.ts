import Piece from './Piece';
import Chessboard, { Coord, FactionColor } from './Chessboard';

export const moveValidator = (p: Piece, destination: Coord) => {
  const [rowDist, colDist] = p.getDist(destination);
  const whithoutObstacles = (direction: 'row' | 'col' = 'row') => {
    const c = direction === 'row' ? p.coord[1] : p.coord[0];
    const d = direction === 'row' ? destination[1] : destination[0];
    const backwarding = c - d > 0 ? true : false;
    for (
      let i = backwarding ? c - 1 : c + 1;
      backwarding ? i > d : i < d;
      backwarding ? i-- : i++
    ) {
      if (
        p.board.pieces.find((piece) => {
          const coord: Coord =
            direction === 'row' ? [p.coord[0], i] : [i, p.coord[1]];

          return piece.isEqualLocation(coord);
        })
      ) {
        return false;
      }
    }

    return true;
  };
  if (rowDist === 0 && colDist > 0) {
    // if are moving in a row direction

    return whithoutObstacles();
  } else if (rowDist > 0 && colDist === 0) {
    // if are moving in a col direction

    return whithoutObstacles('col');
  }

  return false;
};

export default class Rook extends Piece {
  public constructor(
    board: Chessboard,
    coord: Coord,
    variant: FactionColor = 'black',
  ) {
    super(board, 'rook', coord, variant);
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
