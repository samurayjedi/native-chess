import React from 'react';
import { Svg, Path, G, Circle, Polygon, Rect } from 'react-native-svg';
import { PieceProps } from './types';

export default function Rook({ variant = 'black', ...props }: PieceProps) {
  return (
    <Svg {...props} viewBox="0 0 53 53">
      <G>
        <Polygon
          fill={variant === 'black' ? '#333' : '#E5B55B'}
          points="35.501,42 17.5,42 19.5,20 33.501,20 	"
        />
        <Path
          fill={variant === 'black' ? '#000' : '#BE8400'}
          d="M36.5,20h-20c-1.381,0-2.5-1.119-2.5-2.5v0c0-1.381,1.119-2.5,2.5-2.5h20c1.381,0,2.5,1.119,2.5,2.5
		v0C39,18.881,37.881,20,36.5,20z"
        />
        <Rect
          fill={variant === 'black' ? '#444' : '#BA8100'}
          x="11.5"
          y="48"
          width="30"
          height="5"
        />
        <Path
          fill={variant === 'black' ? '#666' : '#D9A72E'}
          d="M39.5,48h-26v-2.843c0-1.743,1.413-3.157,3.157-3.157h19.686c1.743,0,3.157,1.413,3.157,3.157V48z"
        />
        <Polygon
          fill={variant === 'black' ? '#222' : '#E5B55B'}
          points="35.5,0 34.5,5 29.5,5 29.5,0 23.5,0 23.5,5 19.5,5 17.5,0 13.5,0 16.5,15 16.5,15 36.5,15 
		36.5,15 39.5,0 	"
        />
        <Polygon
          fill={variant === 'black' ? '#111' : '#BE8400'}
          points="17.955,37 35.046,37 34.591,32 18.409,32 	"
        />
        <Polygon
          fill={variant === 'black' ? '#444' : '#F9C97D'}
          points="15.9,12 37.1,12 37.9,8 15.1,8 	"
        />
      </G>
    </Svg>
  );
}
