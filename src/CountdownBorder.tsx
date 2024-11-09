import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/native';
import Svg, { Path } from 'react-native-svg';

const w = 34;
const h = 24;
export default function CountdownBorder({
  elapsedColor,
  strokeColor,
  time,
  children,
  size,
}: CountdownBorderProps) {
  /** Aspect 17:12 (MCD of 34 and 24 is 2, (34 / 2):(24 / 2) === 17:12) */
  const height = (12 * size) / 17;
  // to switch colors when elapsed === time
  const [switchColors, setSwitchColors] = useState(false);
  /** timer related */
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedPercent = (time - elapsed) / time;

  // to mount the interval
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // reset when elapsed reach time
  useEffect(() => {
    if (elapsed >= time) {
      setElapsed(0);
      setSwitchColors((prev) => !prev);
    }
  }, [elapsed]);

  return (
    <Container width={size} height={height}>
      {children}
      <Border
        width={size}
        height={height}
        color={!switchColors ? strokeColor : elapsedColor}
      />
      <Svg
        width={size}
        height={height}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        style={{ position: 'absolute', width: size, height }}
      >
        <Path
          d={`M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`}
          stroke={!switchColors ? elapsedColor : strokeColor}
          strokeWidth="6"
          strokeDasharray="120 120"
          strokeDashoffset={120 * elapsedPercent}
        />
      </Svg>
    </Container>
  );
}

export interface CountdownBorderProps {
  elapsedColor: string;
  strokeColor: string;
  time: number;
  children: React.ReactNode;
  size: number;
}

const Container = styled.View<{ width: number; height: number }>(
  ({ width, height }) => ({
    width,
    height,
    overflow: 'hidden',
    borderRadius: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

const Border = styled.View<{ color: string; width: number; height: number }>(
  ({ color, width, height }) => ({
    width,
    height,
    position: 'absolute',
    borderColor: color,
    borderWidth: 5,
  }),
);
