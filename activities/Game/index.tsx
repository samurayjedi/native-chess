import React, { useRef, useEffect } from 'react';
import { LayoutRectangle } from 'react-native';
import _ from 'lodash';
import Engine from '../../Engine';
import { useAppDispatch } from '../../store/hooks';
import PlayerHub from './PlayerHub';
import Chessboard from './Chessboard';
import { Wrapper, Letters, Letter, Numbers, Number } from './StyledComponents';

export default function Game() {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  return (
    <>
      <PlayerHub variant="black" />
      <Letters>
        {Engine.cols.map((colLetter) => (
          <Letter key={`letter-${colLetter}`}>{colLetter}</Letter>
        ))}
      </Letters>
      <Wrapper onLayout={(e) => (wrapperRef.current = e.nativeEvent.layout)}>
        <Chessboard parentRectRef={wrapperRef} />
        <Numbers>
          {Engine.rows.map((rowNumber) => (
            <Number key={`row-number-${rowNumber}`}>{rowNumber}</Number>
          ))}
        </Numbers>
      </Wrapper>
      <PlayerHub variant="white" />
    </>
  );
}
