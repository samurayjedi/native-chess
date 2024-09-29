import { useContext } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import styled from '@emotion/native';
import { useAppSelector } from '../../../store/hooks';
import { PlayerHubContext } from '.';
import Queen from '../../../src/pieces/queen';
import Bishop from '../../../src/pieces/bishop';
import Rook from '../../../src/pieces/rook';
import Knight from '../../../src/pieces/knight';
import Pawn from '../../../src/pieces/pawn';
import { FactionColor } from '../../../Engine/types';
import { RootState } from '../../../store';

function makeCementerySelector() {
  return createSelector(
    [
      (state: RootState) => state.chess.board.cementery,
      (state: RootState, variant: FactionColor) => variant,
    ],
    (cementery, variant) => cementery[variant],
  );
}

export default function PlayerEats() {
  const { variant } = useContext(PlayerHubContext);
  const selector = makeCementerySelector();
  const { queen, knight, bishop, rook, pawn } = useAppSelector((state) =>
    selector(state, variant),
  );

  return (
    <Cementery variant={variant}>
      <Eated piece="Queen" variant={variant} count={queen} />
      <Eated piece="Knight" variant={variant} count={knight} />
      <Eated piece="Bishop" variant={variant} count={bishop} />
      <Eated piece="Rook" variant={variant} count={rook} />
      <Eated piece="Pawn" variant={variant} count={pawn} />
    </Cementery>
  );
}

const Vectors = {
  Queen,
  Bishop,
  Rook,
  Knight,
  Pawn,
} as const;

function Eated({ piece, variant, count }: EatedProps) {
  const PieceVector = Vectors[piece];

  return (
    <PiecesEated>
      <Eats>
        <Count>x{count}</Count>
      </Eats>
      <Piece>
        <PieceVector variant={variant === 'black' ? 'white' : 'black'} />
      </Piece>
    </PiecesEated>
  );
}

interface EatedProps {
  piece: keyof typeof Vectors;
  variant: FactionColor;
  count: number;
}

const PiecesEated = styled.View({
  alignItems: 'center',
});

const Eats = styled.View({
  flexDirection: 'column',
});

const Count = styled.Text({
  color: 'white',
  paddingBottom: 1,
  fontSize: 9,
  fontWeight: 'bold',
});

const Piece = styled.View({
  width: 25,
  height: 25,
});

const Cementery = styled.View<{ variant: FactionColor }>(({ variant }) => ({
  flexDirection: variant === 'black' ? 'row' : 'row-reverse',
}));
