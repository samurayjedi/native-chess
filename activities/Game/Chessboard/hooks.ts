import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, LayoutRectangle, PanResponder } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Coord } from '../../../Engine/types';
import { SquareRef } from './Square';
import Piece from '../../../Engine/Piece';

export function usePanResponder(
  ref: React.MutableRefObject<Piece>,
  position: Animated.ValueXY,
) {
  const { parentRectRef, squaresCoord, squaresRef } =
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
              const piece = ref.current;
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
        // move the piece
        if (lastCoord.current) {
          const piece = ref.current;
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
  parentRectRef: React.MutableRefObject<LayoutRectangle>;
  squaresRef: SquareRef[][];
  squaresCoord: LayoutRectangle[][];
}
