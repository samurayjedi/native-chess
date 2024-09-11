import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, LayoutRectangle, PanResponder } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ChessboardModel, { Coord } from '../../../src/model/Chessboard';
import React from 'react';
import { SquareRef } from './Square';

export function usePanResponder(
  coordRef: React.MutableRefObject<Coord>,
  position: Animated.ValueXY,
) {
  const { api, parentRectRef, squaresCoord, squaresRef } =
    useContext(ChessboardContext);
  const [dragging, setDragging] = useState(false);
  const lastCoord = useRef<Coord | undefined>(undefined);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // When touch gesture starts,
        setDragging(true);
      },
      onPanResponderMove: (e, gs) => {
        const containerRect = parentRectRef.current;
        const squareCoord = coordRef.current;
        /** i must sustract the current x/y board coord because the alignItems: 'center' and justifyContent: 'center'
         * of the Root...
         */
        const px = e.nativeEvent.pageX - containerRect.x;
        const py = e.nativeEvent.pageY - containerRect.y;
        // find in which square the piece are on
        squaresCoord.forEach((rowArray, row) => {
          rowArray.forEach(({ x, y, width, height }, col) => {
            const [, setState] = squaresRef[row][col].state;
            if (px >= x && px < x + width && py >= y && py < y + height) {
              const piece = api.getPieceAt(squareCoord[0], squareCoord[1]);
              if (!piece) {
                throw new Error(
                  `Piece not found in coords ${squareCoord[0]},${squareCoord[1]} when dragging.`,
                );
              }
              const destination = [row, col] as Coord;
              if (piece.isEqualLocation(destination)) {
                lastCoord.current = undefined;

                return;
              }

              if (piece.canMove(destination) && piece.canMoveTo(destination)) {
                lastCoord.current = destination;
                setState('validMove');
              } else {
                lastCoord.current = undefined;
                setState('invalidMove');
              }

              return;
            }

            setState('iddle');
          });
        });
        // dragging animation, setter
        Animated.event(
          [
            null,
            {
              dx: position.x,
              dy: position.y,
            },
          ],
          { useNativeDriver: false },
        )(e, gs);
      },
      onPanResponderRelease: () => {
        const squareCoord = coordRef.current;
        // move the piece
        if (lastCoord.current) {
          const piece = api.getPieceAt(squareCoord[0], squareCoord[1]);
          if (!piece) {
            throw new Error(
              `Piece not found in coords ${squareCoord[0]},${squareCoord[1]} when dropping.`,
            );
          }
          piece.moveTo(lastCoord.current);
        }
        // set all squares to iddle
        squaresRef.forEach((rowArray) => {
          rowArray.forEach((ref) => {
            const [, setState] = ref.state;
            setState('iddle');
          });
        });
        // When touch gesture is released,
        position.resetAnimation();
        setDragging(false);
      },
    }),
  ).current;

  return [dragging, panResponder] as const;
}

export function useOrientation() {
  const [orientation, setOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP,
  );

  useEffect(() => {
    // set orientation when view is mounted
    (async () =>
      setOrientation(await ScreenOrientation.getOrientationAsync()))();
    // set when device change orientation
    const listener = ScreenOrientation.addOrientationChangeListener((o) =>
      setOrientation(o.orientationInfo.orientation),
    );

    return () => ScreenOrientation.removeOrientationChangeListener(listener);
  }, []);

  return orientation;
}

export const ChessboardContext = React.createContext<ChessboardContextType>(
  {} as unknown as any,
);

export interface ChessboardContextType {
  api: ChessboardModel;
  parentRectRef: React.MutableRefObject<LayoutRectangle>;
  squaresRef: SquareRef[][];
  squaresCoord: LayoutRectangle[][];
}
