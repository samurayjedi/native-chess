import React from 'react';
import { Svg, Path, G, Circle, Polygon, Rect } from 'react-native-svg';
import { PieceProps } from './types';

export default function King({ variant = 'black', ...props }: PieceProps) {
  return (
    <Svg {...props} viewBox="0 0 58 58">
      <G>
        <Path
          fill={variant === 'black' ? '#000' : '#BE8400'}
          d="M33.628,3H32V1.372C32,0.614,31.386,0,30.628,0h-3.255C26.614,0,26,0.614,26,1.372V3h-1.628
C23.614,3,23,3.614,23,4.372v2.255C23,7.386,23.614,8,24.372,8H26v4h6V8h1.628C34.386,8,35,7.386,35,6.628V4.372
C35,3.614,34.386,3,33.628,3z"
        />
        <Path
          fill={variant === 'black' ? '#333' : '#E5B55B'}
          d="M35,21H23l-1.597-7.187C21.196,12.882,21.904,12,22.857,12h12.286c0.953,0,1.661,0.882,1.454,1.813
L35,21z"
        />
        <Polygon
          fill={variant === 'black' ? '#333' : '#E5B55B'}
          points="38.001,47 20,47 22,26 36.001,26 	"
        />
        <Path
          fill={variant === 'black' ? '#000' : '#BE8400'}
          d="M39,26H19c-1.381,0-2.5-1.119-2.5-2.5v0c0-1.381,1.119-2.5,2.5-2.5h20c1.381,0,2.5,1.119,2.5,2.5v0
C41.5,24.881,40.381,26,39,26z"
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
        <Polygon
          fill={variant === 'black' ? '#333' : '#BE8400'}
          points="20.476,42 37.524,42 37.048,37 20.952,37 	"
        />
      </G>
    </Svg>
  );
}
