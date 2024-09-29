import React, { useContext, useMemo } from 'react';
import styled from '@emotion/native';
import Profile from './Profile';
import PlayerEats from './PlayerEats';
import Alarm from './Alarm';
import { FactionColor } from '../../../Engine/types';

export const PlayerHubContext = React.createContext<OpponentProps>({
  variant: 'black',
});
export default function PlayerHub({ variant }: OpponentProps) {
  const ctxValue = useMemo(
    () => ({
      variant,
    }),
    [variant],
  );

  return (
    <PlayerHubContext.Provider value={ctxValue}>
      <Container>
        <Profile />
        <Glue />
        <PlayerEats />
        <Span />
        <Alarm variant={variant} />
      </Container>
    </PlayerHubContext.Provider>
  );
}

export interface OpponentProps {
  variant: FactionColor;
}

const Container = styled.View(() => {
  const { variant } = useContext(PlayerHubContext);

  return {
    width: '100%',
    paddingTop: variant === 'black' ? 20 : 12,
    paddingRight: variant === 'black' ? 5 : 0,
    paddingBottom: variant === 'black' ? 12 : 20,
    paddingLeft: variant === 'black' ? 0 : 5,
    alignItems: variant === 'black' ? 'flex-end' : 'flex-start',
    flexDirection: variant === 'black' ? 'row' : 'row-reverse',
  };
});

const Span = styled.View({
  padding: 5,
});

const Glue = styled.View({
  flex: 1,
});
