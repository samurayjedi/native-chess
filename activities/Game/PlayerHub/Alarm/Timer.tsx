import React, { useContext, useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import styled from '@emotion/native';
import { useGameContext } from '../../hooks';
import { PlayerHubContext } from '..';

const init = 0;
function Timer() {
  const turn = useGameContext();
  const { variant } = useContext(PlayerHubContext);
  const [time, setTime] = useState(init);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTime(init);

    if (turn === variant) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [turn]);

  return <StyledTimer>{formatTimer(time)}</StyledTimer>;
}

export default React.memo(Timer, _.isEqual);

function formatTimer(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const StyledTimer = styled.Text({
  color: '#787878',
  fontWeight: 'bold',
  fontSize: 16,
});
