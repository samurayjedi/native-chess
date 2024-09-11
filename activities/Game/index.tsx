import React, { useState, useRef, useEffect } from 'react';
import { LayoutRectangle } from 'react-native';
import _ from 'lodash';
import { APIContext, GameContext } from './hooks';
import ChessboardModel, { FactionColor } from '../../src/model/Chessboard';
import PlayerHub from './PlayerHub';
import Chessboard from './Chessboard';
import { Wrapper, Letters, Letter, Numbers, Number } from './StyledComponents';

export default function Game() {
  const api = useRef(new ChessboardModel()).current;
  const [turn, setTurn] = useState<FactionColor>(api.turn());
  const wrapperRef = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    api.addListener('onPieceMoved', () => {
      setTurn(api.turn());
    });
  }, []);

  return (
    <APIContext.Provider value={api}>
      <GameContext.Provider value={turn}>
        <PlayerHub variant="black" />
        <Letters>
          {api.cols.map((colLetter) => (
            <Letter key={`letter-${colLetter}`}>{colLetter}</Letter>
          ))}
        </Letters>
        <Wrapper onLayout={(e) => (wrapperRef.current = e.nativeEvent.layout)}>
          <Chessboard parentRectRef={wrapperRef} />
          <Numbers>
            {api.rows.map((rowNumber) => (
              <Number key={`row-number-${rowNumber}`}>{rowNumber}</Number>
            ))}
          </Numbers>
        </Wrapper>
        <PlayerHub variant="white" />
      </GameContext.Provider>
    </APIContext.Provider>
  );
}
