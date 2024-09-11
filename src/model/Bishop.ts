import _ from 'lodash';
import Piece from './Piece';
import Chessboard, { Coord, FactionColor } from './Chessboard';

export const moveValidator = (p: Piece, destination: Coord) => {
  const [rowDist, colDist] = p.getDist(destination);
  if (rowDist === colDist) {
    // if are moving like a bishop
    const whithoutObstacles = (i: number, j: number) => {
      let coordToCheck: Coord = [p.coord[0] + i, p.coord[1] + j];
      while (!_.isEqual(coordToCheck, destination)) {
        if (
          p.board.pieces.find((piece) => piece.isEqualLocation(coordToCheck))
        ) {
          return false;
        }

        coordToCheck = [coordToCheck[0] + i, coordToCheck[1] + j];
      }

      return true;
    };
    /** i don't known how explaint it in short :p, but in summary, i, j is the starting coords to check
     * depending the form/axis of the move.
     */
    const [i, j] = (() => {
      const inBackslash =
        (destination[0] > p.coord[0] && destination[1] > p.coord[1]) ||
        (destination[0] < p.coord[0] && destination[1] < p.coord[1]);
      if (inBackslash) {
        const upwarding = destination[0] < p.coord[0];
        const piwi = upwarding ? -1 : 1;

        return [piwi, piwi];
      } else {
        const upwarding =
          p.coord[0] > destination[0] && p.coord[1] < destination[1];
        if (upwarding) {
          const i = -1;
          const j = 1;

          return [i, j];
        } else {
          const i = 1;
          const j = -1;

          return [i, j];
        }
      }
    })();

    // check along the way if there are any obstracles, starting in i + 1, j + 1
    return whithoutObstacles(i, j);
  }

  return false;
};

export default class Bishop extends Piece {
  public constructor(
    board: Chessboard,
    coord: Coord,
    variant: FactionColor = 'black',
  ) {
    super(board, 'bishop', coord, variant);
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
