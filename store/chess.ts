import _ from 'lodash';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from '../App';
import { Coord, FactionColor } from '../src/model/Chessboard';

const initialState: State = {
  turn: 'white',
  history: [],
};

export const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    redo: (state) => {
      const piwi = state.history.pop();
      if (piwi) {
        const { from, to } = piwi;
        const piece = api.getPieceAt(to[0], to[1]);
        if (!piece) {
          console.error(
            `Cannot undo the last movement, the piece in ${to} not found!!`,
          );
        } else {
          console.log('i love reed!!!');
          piece.coord = from;
          piece.moves--;
          api.turn();
          api.listeners.onChange.forEach((listener) => _.attempt(listener));
        }
      }
    },
    changeTurn: (state, action: PayloadAction<FactionColor>) => {
      state.turn = action.payload;
    },
    recordMove: (state, action: PayloadAction<State['history'][number]>) => {
      state.history.push(action.payload);
    },
  },
});

export const { redo, changeTurn, recordMove } = chessSlice.actions;
export default chessSlice.reducer;

interface State {
  turn: FactionColor;
  history: { from: Coord; to: Coord }[];
}
