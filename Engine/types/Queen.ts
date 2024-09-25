import _ from 'lodash';
import Piece from '../Piece';
import Engine from '../';
import { Coord, FactionColor } from '../types';
import { moveValidator as bishopMoveValidator } from './Bishop';
import { moveValidator as rookMoveValidator } from './Rook';

export default class Queen extends Piece {
  public constructor(
    board: Engine,
    coord: Coord,
    variant: FactionColor = 'black',
    moves: number = 0,
  ) {
    super(board, 'queen', coord, variant, moves);
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

        return false;
      })
    ) {
      // if any piece is retrieve, restraint move
      return false;
    }

    const validators = [bishopMoveValidator, rookMoveValidator];
    const result: boolean[] = validators.map((v) => {
      const r = _.attempt(v, this, destination);

      if (_.isError(r)) {
        throw new Error('Some validator is invalid!!!!');
      }

      return r;
    });

    const atLeastOneTrue = result.find((v) => v);

    return Boolean(atLeastOneTrue);
  }
}
