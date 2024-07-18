import React from 'react';
import { Svg, Path, G, Circle, Polygon, Rect } from 'react-native-svg';
import { PieceProps } from './types';

export default function Pawn({ variant = 'black', ...props }: PieceProps) {
  return (
    <Svg {...props} viewBox="0 0 58 58">
      <G>
        <Circle
          fill={variant === 'black' ? '#000' : '#E5B55B'}
          cx="29"
          cy="9"
          r="9"
        />
        <Polygon
          fill={variant === 'black' ? '#333' : '#E5B55B'}
          points="38.001,47 20,47 22,29 36.001,29 	"
        />
        <Rect
          fill={variant === 'black' ? '#444' : '#BA8100'}
          x="14"
          y="53"
          width="30"
          height="5"
        />
        <Path
          fill={variant === 'black' ? '#666' : '#D9A72E'}
          d="M42,53H16v-2.843C16,48.413,17.413,47,19.157,47h19.686C40.587,47,42,48.413,42,50.157V53z"
        />
        <Path
          fill={variant === 'black' ? '#666' : '#F9C97D'}
          d="M25,9c-0.552,0-1-0.447-1-1c0-2.206,1.794-4,4-4c0.552,0,1,0.447,1,1s-0.448,1-1,1
      c-1.103,0-2,0.897-2,2C26,8.553,25.552,9,25,9z"
        />
        <Polygon
          fill={variant === 'black' ? '#111' : '#BE8400'}
          points="20.556,42 37.445,42 36.89,37 21.111,37 	"
        />
        <Path
          fill={variant === 'black' ? '#000' : '#BE8400'}
          d="M38.5,29h-19c-1.925,0-3.5-1.575-3.5-3.5v0c0-1.925,1.575-3.5,3.5-3.5h19c1.925,0,3.5,1.575,3.5,3.5
      v0C42,27.425,40.425,29,38.5,29z"
        />
        <Path
          fill={variant === 'black' ? '#222' : '#D9A72E'}
          d="M29,18c-1.439,0-2.794-0.346-4-0.947V22h8v-4.947C31.794,17.654,30.439,18,29,18z"
        />
      </G>
    </Svg>
  );
}
