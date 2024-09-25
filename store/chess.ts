import _ from 'lodash';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Engine from '../Engine';
import { GameData, FactionColor, Coord } from '../Engine/types';
import { PieceArray } from '../Engine/Piece';
import { RootState } from '.';

const initialState: State = {
  board: {
    pieces: [
      { type: 'king', coord: [0, 4], variant: 'black', moves: 0 },
      { type: 'queen', coord: [0, 3], variant: 'black', moves: 0 },
      { type: 'bishop', coord: [0, 5], variant: 'black', moves: 0 },
      { type: 'bishop', coord: [0, 2], variant: 'black', moves: 0 },
      { type: 'knight', coord: [0, 1], variant: 'black', moves: 0 },
      { type: 'knight', coord: [0, 6], variant: 'black', moves: 0 },
      { type: 'rook', coord: [0, 0], variant: 'black', moves: 0 },
      { type: 'rook', coord: [0, 7], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 0], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 1], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 2], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 3], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 4], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 5], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 6], variant: 'black', moves: 0 },
      { type: 'pawn', coord: [1, 7], variant: 'black', moves: 0 },
      // white
      { type: 'king', coord: [7, 4], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 3], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 5], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 2], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 1], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 6], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 0], variant: 'white', moves: 0 },
      { type: 'king', coord: [7, 7], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 0], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 1], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 2], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 3], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 4], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 5], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 6], variant: 'white', moves: 0 },
      { type: 'king', coord: [6, 7], variant: 'white', moves: 0 },
    ],
    turn: 'white',
    cementery: {
      white: {
        bishop: 0,
        knight: 0,
        queen: 0,
        rook: 0,
        pawn: 0,
      },
      black: {
        bishop: 0,
        knight: 0,
        queen: 0,
        rook: 0,
        pawn: 0,
      },
    },
    threat: undefined,
  },
  history: [],
};

export const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    redo: (state) => {
      const piwi = state.history.pop();
      if (piwi) {
        // console.log(piwi);
        // api.loadFromArray(piwi);
      }
    },
    record: (state) => {
      // state.history.push(api.toArray());
    },
    movePiece: (
      state,
      action: PayloadAction<{
        piece: PieceArray;
        to: Coord;
      }>,
    ) => {
      const { piece, to } = action.payload;
      const engine = new Engine(state.board);
      const p = engine.createPieceEngine(piece);
      const newData = p.moveTo(to);

      if (newData) {
        state.board = newData;
      }
    },
  },
});

export const { redo, record } = chessSlice.actions;
export default chessSlice.reducer;

interface State {
  board: {
    pieces: PieceArray[];
    turn: FactionColor;
    cementery: GameData['cementery'];
    threat: PieceArray | undefined;
  };
  history: GameData[];
}
