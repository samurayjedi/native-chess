import { SvgProps } from 'react-native-svg';
import { FactionColor } from '../model/Chessboard';

export interface PieceProps extends SvgProps {
  variant?: FactionColor;
}
