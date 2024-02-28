import { ColorPalette } from './../../const/ColorPalette';
import { ColorPaletteType } from './../../types/palette';
import { ThemeType } from './../../types/theme';

export const themeMode = (mode: ThemeType) => {
  return (dark: ColorPaletteType, light?: ColorPaletteType) => {
    if (mode === 'light' && light) {
      if (light.includes('.')) {
        const [parent, child] = light.split('.') as [
          keyof typeof ColorPalette,
          keyof (typeof ColorPalette)[keyof typeof ColorPalette],
        ];
        return ColorPalette[parent]?.[child];
      } else {
        return (ColorPalette as Record<string, any>)[light];
      }
    } else {
      if (dark.includes('.')) {
        const [parent, child] = dark.split('.') as [
          keyof typeof ColorPalette,
          keyof (typeof ColorPalette)[keyof typeof ColorPalette],
        ];
        return ColorPalette[parent]?.[child];
      } else {
        return (ColorPalette as Record<string, any>)[dark];
      }
    }
  };
};
