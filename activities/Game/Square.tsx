import React, { useState, useImperativeHandle, useRef, useMemo } from 'react';
import _ from 'lodash';
import { Square as StyledSquare } from './StyledComponents';
import { ViewProps } from 'react-native';

export default React.forwardRef<SquareRef, SquareProps>(
  ({ children, row, col, ...props }, ref) => {
    const state = useState<SquareState>('iddle');

    useImperativeHandle(ref, () => ({
      state,
    }));

    return (
      <StyledSquare isDark={(row + col) % 2 === 1} state={state[0]} {...props}>
        {children}
      </StyledSquare>
    );
  },
);

export interface SquareProps extends ViewProps {
  row: number;
  col: number;
}

export type SquareState = 'iddle' | 'validMove' | 'invalidMove';

export interface SquareRef {
  state: [SquareState, React.Dispatch<React.SetStateAction<SquareState>>];
}
