import { ColorPalette } from './../const/ColorPalette';

export type ColorPaletteType =
  | keyof typeof ColorPalette
  | `${keyof typeof ColorPalette}.${keyof (typeof ColorPalette)[keyof typeof ColorPalette]}`;
