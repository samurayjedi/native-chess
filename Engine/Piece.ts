import _ from 'lodash';
import Engine from '.';
import type { Coord, FactionColor, GameData } from './types';

export default abstract class Piece {
  public static types = [
    'king',
    'pawn',
    'queen',
    'bishop',
    'rook',
    'knight',
  ] as const;

  public constructor(
    public board: Engine,
    public type: PieceType,
    public coord: Coord,
    public variant: FactionColor,
    public moves: number,
  ) {}

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
        (this.variant === 'white' && this.board.isWhiteTurn()) ||
        (this.variant === 'black' && !this.board.isWhiteTurn())
      )
    ) {
      // restraint moves if it'nt the white/black turn`
      console.error(`Is ${this.board.isWhiteTurn() ? 'white' : 'black'} turn`);

      return false;
    } else {
      const sourceThreat = this.board.threat();
      const threat = sourceThreat
        ? this.board.createPieceEngine(sourceThreat)
        : undefined;
      if (threat) {
        const kingInCheck = this.board.getKing(
          threat.variant === 'black' ? 'white' : 'black', // this is equal to this.variant, change it!!
        );
        /** I backup the original coord, and move to x pos, if the piece threatening the king
         * is eated or cant move anymore towards the king, consider the move as valid, in
         * any case, always restores the backup because this is only for check.
         */
        const temp = this.coord;
        this.coord = destination;
        if (
          this.isEqualLocation(threat.coord) ||
          !threat.canMoveTo(kingInCheck.coord)
        ) {
          this.coord = temp;

          return true;
        }

        this.coord = temp;
        console.log(
          `The ${this.variant} king is threatened by ${threat.variant} ${threat.type} in ${threat.coord}`,
        );

        return false;
      }
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

  public moveTo(coord: Coord): GameData | null {
    if (!this.canMove(coord) || !this.canMoveTo(coord)) {
      return null;
    }

    const gameData = this.board.cloneData();
    // if the position have a piece
    _.remove(gameData.pieces, (pSource) => {
      const p = this.board.createPieceEngine(pSource);
      if (p.isEqualLocation(coord)) {
        if (p.type === 'king') {
          throw new Error('Cannot eat the king!!!!');
        }

        gameData.cementery[gameData.turn][p.type]++;

        if (_.isEqual(pSource, gameData.threat)) {
          gameData.threat = undefined;
        }

        return true;
      }

      return false;
    });
    // perform the move
    const index = this.board.getPieceIndex(this.coord[0], this.coord[1]);
    gameData.pieces[index].coord = coord;
    gameData.pieces[index].moves++;
    // change turn
    gameData.turn = gameData.turn === 'white' ? 'black' : 'white';
    // check if the opposite king is in check
    const king = this.board.getKing(
      this.variant === 'black' ? 'white' : 'black',
    );
    if (this.canAttack(king.coord)) {
      console.log(`check!!!`);
      gameData.threat = gameData.pieces[index];
    }

    return gameData;
  }

  public toArray(): PieceArray {
    return {
      moves: this.moves,
      coord: this.coord,
      variant: this.variant,
      type: this.type,
    };
  }
}

export type PieceType = (typeof Piece.types)[number];

export interface PieceArray {
  moves: number;
  coord: Coord;
  variant: FactionColor;
  type: Piece['type'];
}
