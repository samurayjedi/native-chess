import React from 'react';
import { Svg, Path, G, Circle, Polygon, Rect } from 'react-native-svg';
import { PieceProps } from './types';

export default function Queen({ variant = 'black', ...props }) {
  return (
    <Svg {...props} viewBox="0 0 57 57">
      <G>
        <Circle
          fill={variant === 'black' ? '#000' : '#F9C97D'}
          cx="28.5"
          cy="4"
          r="4"
        />
        <Polygon
          fill={variant === 'black' ? '#333' : '#E5B55B'}
          points="37.501,46 19.5,46 21.5,24 35.501,24 	"
        />
        <Path
          fill={variant === 'black' ? '#000' : '#BE8400'}
          d="M38.5,24h-20c-1.381,0-2.5-1.119-2.5-2.5v0c0-1.381,1.119-2.5,2.5-2.5h20c1.381,0,2.5,1.119,2.5,2.5
v0C41,22.881,39.881,24,38.5,24z"
        />
        <Rect
          fill={variant === 'black' ? '#444' : '#BA8100'}
          x="13.5"
          y="52"
          width="30"
          height="5"
        />
        <Path
          fill={variant === 'black' ? '#666' : '#D9A72E'}
          d="M41.5,52h-26v-2.843c0-1.743,1.413-3.157,3.157-3.157h19.686c1.743,0,3.157,1.413,3.157,3.157V52z"
        />
        <Polygon
          fill={variant === 'black' ? '#333' : '#E5B55B'}
          points="34.505,12.99 31.5,10 31.5,10 28.5,15 25.5,10 25.5,10 22.495,12.99 18.5,11.995 21.5,19 
35.5,19 38.5,11.995 	"
        />
        <Polygon
          fill={variant === 'black' ? '#111' : '#BE8400'}
          points="19.955,41 37.046,41 36.591,36 20.409,36 	"
        />
      </G>
    </Svg>
  );
}
