import React from 'react';
import { Svg, Path, G, Circle, Polygon, Rect } from 'react-native-svg';
import { PieceProps } from './types';

export default function Bishop({ variant = 'black', ...props }: PieceProps) {
  return (
    <Svg {...props} viewBox="0 0 57 57">
      <G>
        <Path
          fill={variant === 'black' ? '#222' : '#E5B55B'}
          d="M33.5,19c3.875-6.875-5-14-5-14h-0.021c0,0-8.875,7.125-5,14H33.5z"
        />
        <Circle
          fill={variant === 'black' ? '#000' : '#F9C97D'}
          cx="28.479"
          cy="3"
          r="3"
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
          fill={variant === 'black' ? '#111' : '#BE8400'}
          points="19.955,41 37.046,41 36.591,36 20.409,36 	"
        />
      </G>
    </Svg>
  );
}
