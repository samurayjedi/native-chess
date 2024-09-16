import type { PiwiTheme } from './src/theme';

declare module '@emotion/react' {
  export interface Theme extends PiwiTheme {}
}
