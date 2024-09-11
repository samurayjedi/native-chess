import React, { useContext } from 'react';
import Chessboard, { FactionColor } from '../../src/model/Chessboard';

export const GameContext = React.createContext<FactionColor | undefined>(
  undefined,
);
export const APIContext = React.createContext<Chessboard | undefined>(
  undefined,
);

export function useApi() {
  const api = useContext(APIContext);
  if (!api) {
    throw new Error('api is undefined!!!!');
  }

  return api;
}

export function useGameContext() {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    throw new Error('api is undefined!!!!');
  }

  return gameContext;
}
